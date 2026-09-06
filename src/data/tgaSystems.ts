import type { HeatingSystemData, HeatingSystemType, TGAParams, PrimaryEnergyResult } from '@/calculation/types'

export const heatingSystemsData: HeatingSystemData[] = [
  {
    id: 'gasCondensing',
    nameKeyDe: 'Gas-Brennwertkessel',
    nameKeyEn: 'Gas Condensing Boiler',
    efficiency: 0.95,
    primaryEnergyFactor: 1.1,
    isHeatPump: false,
    isRenewable: false,
    gegCompliant: false,
  },
  {
    id: 'oilCondensing',
    nameKeyDe: 'Öl-Brennwertkessel',
    nameKeyEn: 'Oil Condensing Boiler',
    efficiency: 0.92,
    primaryEnergyFactor: 1.1,
    isHeatPump: false,
    isRenewable: false,
    gegCompliant: false,
  },
  {
    id: 'airSourceHP',
    nameKeyDe: 'Luft-Wasser-Wärmepumpe',
    nameKeyEn: 'Air-Source Heat Pump',
    efficiency: 3.5,
    primaryEnergyFactor: 1.8,
    isHeatPump: true,
    isRenewable: true,
    gegCompliant: true,
  },
  {
    id: 'groundSourceHP',
    nameKeyDe: 'Sole-Wasser-Wärmepumpe',
    nameKeyEn: 'Ground-Source Heat Pump',
    efficiency: 4.5,
    primaryEnergyFactor: 1.8,
    isHeatPump: true,
    isRenewable: true,
    gegCompliant: true,
  },
  {
    id: 'pelletBoiler',
    nameKeyDe: 'Pelletkessel',
    nameKeyEn: 'Pellet Boiler',
    efficiency: 0.90,
    primaryEnergyFactor: 0.2,
    isHeatPump: false,
    isRenewable: true,
    gegCompliant: true,
  },
  {
    id: 'districtHeatingFossil',
    nameKeyDe: 'Fernwärme (fossil KWK)',
    nameKeyEn: 'District Heating (fossil CHP)',
    efficiency: 0.98,
    primaryEnergyFactor: 0.7,
    isHeatPump: false,
    isRenewable: false,
    gegCompliant: true,
  },
  {
    id: 'districtHeatingRenewable',
    nameKeyDe: 'Fernwärme (erneuerbar)',
    nameKeyEn: 'District Heating (renewable)',
    efficiency: 0.98,
    primaryEnergyFactor: 0.0,
    isHeatPump: false,
    isRenewable: true,
    gegCompliant: true,
  },
  {
    id: 'electricDirect',
    nameKeyDe: 'Elektro-Direktheizung',
    nameKeyEn: 'Direct Electric Heating',
    efficiency: 1.0,
    primaryEnergyFactor: 1.8,
    isHeatPump: false,
    isRenewable: false,
    gegCompliant: false,
  },
  {
    id: 'logBoiler',
    nameKeyDe: 'Scheitholzkessel',
    nameKeyEn: 'Log Boiler',
    efficiency: 0.75,
    primaryEnergyFactor: 0.2,
    isHeatPump: false,
    isRenewable: true,
    gegCompliant: true,
  },
]

export function getHeatingSystem(id: HeatingSystemType): HeatingSystemData {
  return heatingSystemsData.find((s) => s.id === id) ?? heatingSystemsData[0]
}

export function calculatePrimaryEnergy(
  tga: TGAParams,
  heatingDemandKwh: number,
  coolingDemandKwh: number,
  netFloorArea: number
): PrimaryEnergyResult {
  const system = getHeatingSystem(tga.heatingSystem)

  const heatingEfficiency = system.isHeatPump ? tga.hpSPF : system.efficiency
  const finalEnergyHeating = heatingDemandKwh / heatingEfficiency

  const dhwTotalDemand = tga.dhwDemand * netFloorArea
  let finalEnergyDHW: number
  let dhwFp: number
  const solarDHWReduction = tga.dhwSystem === 'solarThermalAssist' ? tga.dhwSolarFraction : 0
  const dhwAfterSolar = dhwTotalDemand * (1 - solarDHWReduction)

  if (tga.dhwSystem === 'electricInstantaneous') {
    finalEnergyDHW = dhwAfterSolar / 0.98
    dhwFp = 1.8
  } else {
    finalEnergyDHW = dhwAfterSolar / heatingEfficiency
    dhwFp = system.primaryEnergyFactor
  }

  const coolingEER = 3.0
  const finalEnergyCooling = coolingDemandKwh / coolingEER

  const finalEnergyTotal = finalEnergyHeating + finalEnergyDHW + finalEnergyCooling

  const primaryHeating = finalEnergyHeating * system.primaryEnergyFactor
  const primaryDHW = finalEnergyDHW * dhwFp
  const primaryCooling = finalEnergyCooling * 1.8
  const primaryEnergyTotal = primaryHeating + primaryDHW + primaryCooling

  const pvYield = tga.pvInstalled * tga.pvSpecificYield
  const electricDemand = (system.isHeatPump ? finalEnergyHeating : 0)
    + (tga.dhwSystem === 'electricInstantaneous' ? finalEnergyDHW : 0)
    + finalEnergyCooling
  const pvSelfUsed = Math.min(pvYield * tga.pvSelfConsumption, electricDemand)
  const pvCredit = pvSelfUsed * 1.8

  const primaryEnergyNet = Math.max(0, primaryEnergyTotal - pvCredit)
  const specificPrimaryEnergy = netFloorArea > 0 ? primaryEnergyNet / netFloorArea : 0

  return {
    finalEnergyHeating,
    finalEnergyDHW,
    finalEnergyCooling,
    finalEnergyTotal,
    primaryEnergyTotal,
    pvYield,
    pvCredit,
    primaryEnergyNet,
    specificPrimaryEnergy,
  }
}
