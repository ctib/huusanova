import type { BuildingAreas, HeatLossComponent } from './areas'

export type RoofType = 'flat' | 'gable' | 'hip' | 'shed'

export interface BuildingGeometry {
  length: number       // m
  width: number        // m
  height: number       // m (story height)
  stories: number      // count
  rotation: number     // degrees (0 = North)
  roofType: RoofType
  roofPitch: number    // degrees (0-60)
  hasBasement: boolean
  basementHeated: boolean
  atticHeated: boolean
}

export interface EnvelopeUValues {
  wall: number         // W/(m²K)
  roof: number         // W/(m²K)
  floor: number        // W/(m²K)
  window: number       // W/(m²K)
  thermalBridgeSupplement: number  // W/(m²K) - ΔU_WB
}

export interface WindowRatios {
  north: number        // 0-1
  east: number         // 0-1
  south: number        // 0-1
  west: number         // 0-1
}

export interface ShadingFactors {
  north: number        // 0-1
  east: number         // 0-1
  south: number        // 0-1
  west: number         // 0-1
}

export interface WindowParams {
  ratios: WindowRatios
  gValue: number           // 0-1
  frameFraction: number    // 0-1
  shadingFactors: ShadingFactors
}

export type ThermalMassClass = 'light' | 'medium' | 'heavy'

export interface CoolingParams {
  coolingSetpoint: number         // °C (default 26)
  movableShadingFc: number        // 0-1 (shading reduction factor)
  nightVentilationRate: number    // 1/h
  thermalMassClass: ThermalMassClass
}

export type VentilationType = 'natural' | 'mechanical' | 'heatRecovery'

export interface VentilationParams {
  airChangeRate: number           // 1/h
  n50: number                     // 1/h
  ventilationType: VentilationType
  heatRecoveryEfficiency: number  // 0-1
}

export interface InternalGains {
  specificGains: number           // W/m²
}

export type HeatingSystemType =
  | 'gasCondensing'
  | 'oilCondensing'
  | 'airSourceHP'
  | 'groundSourceHP'
  | 'pelletBoiler'
  | 'districtHeatingFossil'
  | 'districtHeatingRenewable'
  | 'electricDirect'
  | 'logBoiler'

export type DHWSystemType = 'sameAsHeating' | 'electricInstantaneous' | 'solarThermalAssist'

export interface TGAParams {
  heatingSystem: HeatingSystemType
  hpSPF: number                   // seasonal performance factor (JAZ) for heat pumps
  dhwSystem: DHWSystemType
  dhwSolarFraction: number        // 0-1, solar thermal coverage for DHW
  dhwDemand: number               // kWh/(m²a), default 12.5
  pvInstalled: number             // kWp
  pvSpecificYield: number         // kWh/kWp, location-dependent
  pvSelfConsumption: number       // 0-1
}

export interface HeatingSystemData {
  id: HeatingSystemType
  nameKeyDe: string
  nameKeyEn: string
  efficiency: number              // η or COP placeholder
  primaryEnergyFactor: number     // fp
  isHeatPump: boolean
  isRenewable: boolean
  gegCompliant: boolean           // meets GEG §71 (65% renewable)
}

export interface MonthlyClimate {
  temperature: number             // °C monthly mean
  solarRadiation: {
    north: number                 // kWh/(m²·month)
    east: number
    south: number
    west: number
    horizontal: number
  }
  days: number                    // days in month
}

export interface ClimateLocation {
  id: string
  name: string
  country: string
  tryRegion?: number              // DIN V 18599 TRY zone (1-15 for DE)
  regionName?: string             // e.g. "Nordseeküste", "Oberrheingraben"
  climateZone?: string            // thermal climate zone (polar…tropics) for WORLD entries
  monthlyData: MonthlyClimate[]   // 12 months
}

export interface BuildingParams {
  geometry: BuildingGeometry
  envelope: EnvelopeUValues
  windows: WindowParams
  cooling: CoolingParams
  ventilation: VentilationParams
  internalGains: InternalGains
  tga: TGAParams
  heatingSetpoint: number         // °C
  climateLocationId: string
  plotArea: number                // m² Grundstuecksflaeche, 0 = nicht angegeben
}

export interface MonthlyResult {
  month: number                   // 0-11
  days: number                    // days in month
  transmissionLoss: number        // kWh
  ventilationLoss: number         // kWh
  solarGain: number               // kWh
  internalGain: number            // kWh
  gainLossRatio: number           // γ_H
  utilizationFactor: number       // η_H
  heatingDemand: number           // kWh
  coolingDemand: number           // kWh
  lossUtilizationFactor: number   // η_ls for cooling
  coolingGainLossRatio: number    // γ_C
}

export interface PrimaryEnergyResult {
  finalEnergyHeating: number      // kWh/a - Endenergie Heizung
  finalEnergyDHW: number          // kWh/a - Endenergie Warmwasser
  finalEnergyCooling: number      // kWh/a - Endenergie Kühlung
  finalEnergyTotal: number        // kWh/a
  primaryEnergyTotal: number      // kWh/a - Primärenergie gesamt
  pvYield: number                 // kWh/a - PV-Ertrag
  pvCredit: number                // kWh/a - PV-Gutschrift Primärenergie
  primaryEnergyNet: number        // kWh/a - Primärenergie nach PV-Abzug
  specificPrimaryEnergy: number   // kWh/(m²a) - spezifisch
}

export interface AnnualResult {
  monthlyResults: MonthlyResult[]
  totals: {
    transmissionLoss: number      // kWh/a
    ventilationLoss: number       // kWh/a
    solarGain: number             // kWh/a
    internalGain: number          // kWh/a
    heatingDemand: number         // kWh/a
    coolingDemand: number         // kWh/a
  }
  specificHeatingDemand: number   // kWh/(m²a)
  specificCoolingDemand: number   // kWh/(m²a)
  energyClass: string             // A+ to H
  htPrime: number                 // W/(m²K) - specific transmission heat loss
  ht: number                      // W/K - transmission heat transfer coefficient
  hv: number                      // W/K - ventilation heat transfer coefficient
  netFloorArea: number            // m² - ANGF
  envelopeArea: number            // m² - total envelope area
  areas: BuildingAreas
  heatLossComponents: HeatLossComponent[]
  primaryEnergy: PrimaryEnergyResult
}

export interface BuildingPreset {
  id: string
  nameKey: string                 // i18n key
  wall: number
  roof: number
  floor: number
  window: number
  n50: number | null
  gValue: number
  thermalBridgeSupplement: number
}

export interface EnergyClass {
  label: string
  minValue: number
  maxValue: number
  color: string
}
