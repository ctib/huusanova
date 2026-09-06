import { create } from 'zustand'
import type { BuildingParams, AnnualResult } from '@/calculation/types'
import { calculateEN832 } from '@/calculation/en832'
import { calculateSIA380 } from '@/calculation/sia380'
import { calculateDIN18599 } from '@/calculation/din18599'
import { getClimateLocationById } from '@/data/climateData'

export type CalculationMethod = 'EN832' | 'SIA380' | 'DIN18599'

interface BuildingStore {
  params: BuildingParams
  results: AnnualResult | null
  method: CalculationMethod
  presetId: string | null
  seasonView: 'winter' | 'summer'

  setParam: <K extends keyof BuildingParams>(key: K, value: BuildingParams[K]) => void
  setNestedParam: (path: string, value: number | string | boolean) => void
  setMethod: (method: CalculationMethod) => void
  setPreset: (presetId: string) => void
  setSeasonView: (view: 'winter' | 'summer') => void
  recompute: () => void
}

const defaultParams: BuildingParams = {
  geometry: {
    length: 10,
    width: 10,
    height: 2.7,
    stories: 2,
    rotation: 0,
    roofType: 'gable',
    roofPitch: 35,
    hasBasement: false,
    basementHeated: false,
    atticHeated: true,
  },
  envelope: {
    wall: 0.28,
    roof: 0.20,
    floor: 0.35,
    window: 1.30,
    thermalBridgeSupplement: 0.05,
  },
  windows: {
    ratios: { north: 0.20, east: 0.20, south: 0.20, west: 0.20 },
    gValue: 0.60,
    frameFraction: 0.30,
    shadingFactors: { north: 0.9, east: 0.9, south: 0.9, west: 0.9 },
  },
  cooling: {
    coolingSetpoint: 26,
    movableShadingFc: 0.50,
    nightVentilationRate: 2.0,
    thermalMassClass: 'medium',
  },
  ventilation: {
    airChangeRate: 0.5,
    n50: 3.0,
    ventilationType: 'natural',
    heatRecoveryEfficiency: 0,
  },
  internalGains: {
    specificGains: 5.0,
  },
  tga: {
    heatingSystem: 'gasCondensing',
    hpSPF: 3.5,
    dhwSystem: 'sameAsHeating',
    dhwSolarFraction: 0.6,
    dhwDemand: 12.5,
    pvInstalled: 0,
    pvSpecificYield: 950,
    pvSelfConsumption: 0.30,
  },
  heatingSetpoint: 20,
  climateLocationId: 'wuerzburg',
  plotArea: 0,
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

export const useBuildingStore = create<BuildingStore>((set, get) => ({
  params: defaultParams,
  results: null,
  method: 'EN832',
  presetId: 'EnEV2014',
  seasonView: 'winter',

  setParam: (key, value) => {
    set((state) => ({
      params: { ...state.params, [key]: value },
      presetId: null,
    }))
    get().recompute()
  },

  setNestedParam: (path, value) => {
    set((state) => {
      const newParams = JSON.parse(JSON.stringify(state.params)) as BuildingParams
      const parts = path.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = newParams
      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj[parts[i]]
      }
      obj[parts[parts.length - 1]] = value
      return { params: newParams, presetId: null }
    })
    get().recompute()
  },

  setMethod: (method) => {
    set({ method })
    get().recompute()
  },

  setPreset: (presetId) => {
    set({ presetId })
  },

  setSeasonView: (view) => {
    set({ seasonView: view })
  },

  recompute: () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      const { params, method } = get()
      const climate = getClimateLocationById(params.climateLocationId)
      if (!climate) return

      let results: AnnualResult
      switch (method) {
        case 'SIA380':
          results = calculateSIA380(params, climate)
          break
        case 'DIN18599':
          results = calculateDIN18599(params, climate)
          break
        case 'EN832':
        default:
          results = calculateEN832(params, climate)
          break
      }
      set({ results })
    }, 50)
  },
}))
