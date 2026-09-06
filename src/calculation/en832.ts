import type {
  BuildingParams,
  ClimateLocation,
  MonthlyResult,
  AnnualResult,
  ThermalMassClass,
} from './types'
import type { BuildingAreas } from './areas'
import { calculateBuildingAreas, calculateHeatLossComponents } from './areas'
import { getEnergyClass } from '@/data/energyClasses'
import { calculatePrimaryEnergy } from '@/data/tgaSystems'

// Thermal mass specific capacity Wh/(m²K) per class
const THERMAL_MASS_CAPACITY: Record<ThermalMassClass, number> = {
  light: 25,
  medium: 50,
  heavy: 80,
}

/**
 * Calculate ventilation heat transfer coefficient HV (W/K)
 */
function calculateHV(params: BuildingParams, areas: BuildingAreas): number {
  const { ventilation } = params
  const volume = areas.heatedVolume

  let effectiveAirChange = ventilation.airChangeRate

  if (ventilation.ventilationType === 'heatRecovery') {
    effectiveAirChange = ventilation.airChangeRate * (1 - ventilation.heatRecoveryEfficiency)
  }

  // HV = 0.34 × n × V
  return 0.34 * effectiveAirChange * volume
}

/**
 * Calculate time constant τ (hours)
 */
function calculateTimeConstant(
  thermalMassClass: ThermalMassClass,
  netFloorArea: number,
  ht: number,
  hv: number
): number {
  const cm = THERMAL_MASS_CAPACITY[thermalMassClass] * netFloorArea // Wh/K
  return cm / (ht + hv) // hours
}

/**
 * Calculate heating utilization factor η_H
 */
function calculateHeatingUtilizationFactor(
  gainLossRatio: number,
  timeConstant: number
): number {
  if (gainLossRatio < 0) return 1 // No gains
  // No losses at all (e.g. tropical climate, monthly mean above setpoint):
  // gains cannot be utilised for heating -> η_H = 0
  if (!Number.isFinite(gainLossRatio)) return 0
  const a = 1 + timeConstant / 15

  if (Math.abs(gainLossRatio - 1) < 0.0001) {
    return a / (a + 1)
  }

  return (1 - Math.pow(gainLossRatio, a)) / (1 - Math.pow(gainLossRatio, a + 1))
}

/**
 * Calculate cooling loss utilization factor η_ls
 */
function calculateCoolingLossUtilizationFactor(
  gainLossRatio: number,
  timeConstant: number
): number {
  // No gains (ratio <= 0): all available losses are usable -> η_ls = 1
  if (gainLossRatio <= 0) return 1
  // No losses at all: nothing to utilise -> η_ls = 0
  if (!Number.isFinite(gainLossRatio)) return 0
  const a = 1 + timeConstant / 15

  if (Math.abs(gainLossRatio - 1) < 0.0001) {
    return a / (a + 1)
  }

  return (1 - Math.pow(gainLossRatio, -a)) / (1 - Math.pow(gainLossRatio, -(a + 1)))
}

/**
 * Calculate monthly heating and cooling demand according to EN 832 / ISO 13790
 */
function calculateMonth(
  params: BuildingParams,
  areas: BuildingAreas,
  monthIndex: number,
  climate: ClimateLocation,
  ht: number,
  hv: number,
  timeConstant: number
): MonthlyResult {
  const monthClimate = climate.monthlyData[monthIndex]
  const hours = monthClimate.days * 24

  // === HEATING CALCULATION ===
  const deltaT_H = params.heatingSetpoint - monthClimate.temperature

  // Transmission losses (heating)
  const transmissionLoss = ht * deltaT_H * hours / 1000 // kWh

  // Ventilation losses (heating)
  const ventilationLoss = hv * deltaT_H * hours / 1000 // kWh

  const totalLosses = Math.max(0, transmissionLoss + ventilationLoss)

  // Solar gains (without movable shading for heating case)
  const { windows } = params
  const g = windows.gValue
  const ff = windows.frameFraction
  const rad = monthClimate.solarRadiation
  const sf = windows.shadingFactors

  const solarGain = (
    areas.windowNorth * g * sf.north * (1 - ff) * rad.north +
    areas.windowEast * g * sf.east * (1 - ff) * rad.east +
    areas.windowSouth * g * sf.south * (1 - ff) * rad.south +
    areas.windowWest * g * sf.west * (1 - ff) * rad.west
  ) // kWh (radiation already in kWh/m²·month)

  // Internal gains
  const internalGain = params.internalGains.specificGains * areas.netFloorArea * hours / 1000 // kWh

  const totalGains = solarGain + internalGain

  // Gain-loss ratio and utilization factor
  const gainLossRatio = totalLosses > 0 ? totalGains / totalLosses : (totalGains > 0 ? Infinity : 0)
  const utilizationFactor = calculateHeatingUtilizationFactor(gainLossRatio, timeConstant)

  // Heating demand
  const heatingDemand = Math.max(0, totalLosses - utilizationFactor * totalGains)

  // === COOLING CALCULATION (ISO 13790 Section 8) ===
  const deltaT_C = params.cooling.coolingSetpoint - monthClimate.temperature

  // Transmission "losses" for cooling (heat removal capacity)
  const transmissionLoss_C = ht * deltaT_C * hours / 1000 // kWh

  // Ventilation for cooling - consider night ventilation
  const nightVentRate = params.cooling.nightVentilationRate
  const normalHV = hv
  // Simplified: night ventilation adds extra air change during night hours (~8h/24h)
  const nightHV = 0.34 * nightVentRate * areas.heatedVolume
  // Weighted: ~16h normal + 8h night ventilation per day
  const effectiveHV_C = (normalHV * 16 + Math.max(normalHV, nightHV) * 8) / 24

  const ventilationLoss_C = effectiveHV_C * deltaT_C * hours / 1000 // kWh

  const totalLosses_C = Math.max(0, transmissionLoss_C + ventilationLoss_C)

  // Solar gains with movable shading for cooling case
  const fc = params.cooling.movableShadingFc

  const solarGain_C = (
    areas.windowNorth * g * fc * sf.north * (1 - ff) * rad.north +
    areas.windowEast * g * fc * sf.east * (1 - ff) * rad.east +
    areas.windowSouth * g * fc * sf.south * (1 - ff) * rad.south +
    areas.windowWest * g * fc * sf.west * (1 - ff) * rad.west
  ) // kWh

  // Internal gains same as heating
  const internalGain_C = internalGain

  const totalGains_C = solarGain_C + internalGain_C

  // Cooling gain-loss ratio and loss utilization factor
  const coolingGainLossRatio = totalLosses_C > 0
    ? totalGains_C / totalLosses_C
    : (totalGains_C > 0 ? Infinity : 0)

  const lossUtilizationFactor = calculateCoolingLossUtilizationFactor(coolingGainLossRatio, timeConstant)

  // Cooling demand
  const coolingDemand = Math.max(0, totalGains_C - lossUtilizationFactor * totalLosses_C)

  return {
    month: monthIndex,
    days: monthClimate.days,
    transmissionLoss: Math.max(0, transmissionLoss),
    ventilationLoss: Math.max(0, ventilationLoss),
    solarGain,
    internalGain,
    gainLossRatio,
    utilizationFactor,
    heatingDemand,
    coolingDemand,
    lossUtilizationFactor,
    coolingGainLossRatio,
  }
}

/**
 * Main EN 832 calculation function
 */
export function calculateEN832(params: BuildingParams, climate: ClimateLocation): AnnualResult {
  const areas = calculateBuildingAreas(params)
  const heatLossComponents = calculateHeatLossComponents(params, areas)
  const ht = heatLossComponents.reduce((sum, comp) => sum + comp.ht, 0)
  const hv = calculateHV(params, areas)
  const timeConstant = calculateTimeConstant(
    params.cooling.thermalMassClass,
    areas.netFloorArea,
    ht,
    hv
  )

  const monthlyResults: MonthlyResult[] = []
  for (let i = 0; i < 12; i++) {
    monthlyResults.push(calculateMonth(params, areas, i, climate, ht, hv, timeConstant))
  }

  const totals = {
    transmissionLoss: monthlyResults.reduce((sum, m) => sum + m.transmissionLoss, 0),
    ventilationLoss: monthlyResults.reduce((sum, m) => sum + m.ventilationLoss, 0),
    solarGain: monthlyResults.reduce((sum, m) => sum + m.solarGain, 0),
    internalGain: monthlyResults.reduce((sum, m) => sum + m.internalGain, 0),
    heatingDemand: monthlyResults.reduce((sum, m) => sum + m.heatingDemand, 0),
    coolingDemand: monthlyResults.reduce((sum, m) => sum + m.coolingDemand, 0),
  }

  const specificHeatingDemand = totals.heatingDemand / areas.netFloorArea
  const specificCoolingDemand = totals.coolingDemand / areas.netFloorArea

  // HT' = HT / A_envelope
  const htPrime = ht / areas.envelopeArea

  const primaryEnergy = calculatePrimaryEnergy(
    params.tga,
    totals.heatingDemand,
    totals.coolingDemand,
    areas.netFloorArea
  )

  return {
    monthlyResults,
    totals,
    specificHeatingDemand,
    specificCoolingDemand,
    energyClass: getEnergyClass(specificHeatingDemand),
    htPrime,
    ht,
    hv,
    netFloorArea: areas.netFloorArea,
    envelopeArea: areas.envelopeArea,
    areas,
    heatLossComponents,
    primaryEnergy,
  }
}
