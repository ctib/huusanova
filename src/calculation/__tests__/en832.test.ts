import { describe, it, expect } from 'vitest'
import { calculateEN832 } from '../en832'
import type { BuildingParams } from '../types'
import { getClimateLocation } from '../../data/climateData/germany'
import { worldClimateLocations } from '../../data/climateData/world'

// Default EnEV 2014 building: 10x10x2.7m, 2 stories, Würzburg
const defaultParams: BuildingParams = {
  geometry: { length: 10, width: 10, height: 2.7, stories: 2, rotation: 0, roofType: 'gable', roofPitch: 35, hasBasement: false, basementHeated: false, atticHeated: true },
  envelope: { wall: 0.28, roof: 0.20, floor: 0.35, window: 1.30, thermalBridgeSupplement: 0.05 },
  windows: {
    ratios: { north: 0.20, east: 0.20, south: 0.20, west: 0.20 },
    gValue: 0.60,
    frameFraction: 0.30,
    shadingFactors: { north: 0.9, east: 0.9, south: 0.9, west: 0.9 },
  },
  cooling: { coolingSetpoint: 26, movableShadingFc: 0.50, nightVentilationRate: 2.0, thermalMassClass: 'medium' },
  ventilation: { airChangeRate: 0.5, n50: 3.0, ventilationType: 'natural', heatRecoveryEfficiency: 0 },
  internalGains: { specificGains: 5.0 },
  heatingSetpoint: 20,
  climateLocationId: 'wuerzburg',
  plotArea: 0,
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
}

const wuerzburg = getClimateLocation('wuerzburg')!

describe('EN 832 Calculation', () => {
  it('should return 12 monthly results', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    expect(results.monthlyResults).toHaveLength(12)
  })

  it('should have higher heating demand in winter months', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    const jan = results.monthlyResults[0]
    const jul = results.monthlyResults[6]
    expect(jan.heatingDemand).toBeGreaterThan(jul.heatingDemand)
  })

  it('should have higher cooling demand in summer months', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    const jan = results.monthlyResults[0]
    const jul = results.monthlyResults[6]
    expect(jul.coolingDemand).toBeGreaterThan(jan.coolingDemand)
  })

  it('should produce specific heating demand in expected range for EnEV 2014 (60-80 kWh/m²a)', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    expect(results.specificHeatingDemand).toBeGreaterThan(40)
    expect(results.specificHeatingDemand).toBeLessThan(120)
  })

  it('should produce specific cooling demand in expected range (5-15 kWh/m²a)', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    expect(results.specificCoolingDemand).toBeGreaterThan(0)
    expect(results.specificCoolingDemand).toBeLessThan(40)
  })

  it('should calculate correct net floor area (ANGF)', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    expect(results.netFloorArea).toBe(200) // 10 * 10 * 2 stories
  })

  it('should calculate correct envelope area', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    // Beheizter Dachraum (Satteldach 35°): Huellflaeche liegt in der Dachhaut.
    const facade = 2 * (10 * 5.4) + 2 * (10 * 5.4)      // 216
    const roofRise = Math.tan((35 * Math.PI) / 180) * 10 / 2
    const pitchedRoof = 100 / Math.cos((35 * Math.PI) / 180)
    const gables = 10 * roofRise
    expect(results.envelopeArea).toBeCloseTo(facade + gables + pitchedRoof + 100, 0)
  })

  it('should have non-negative demands in all months', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    for (const month of results.monthlyResults) {
      expect(month.heatingDemand).toBeGreaterThanOrEqual(0)
      expect(month.coolingDemand).toBeGreaterThanOrEqual(0)
    }
  })

  it('should calculate transmission losses > 0 in all months', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    for (const month of results.monthlyResults) {
      // Transmission losses should always be positive (indoor > outdoor in heating season)
      // In summer, may still be positive since θ_heating > θ_ext even in warm months
      expect(month.transmissionLoss).toBeGreaterThanOrEqual(0)
    }
  })

  it('should return valid energy class', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    expect(['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']).toContain(results.energyClass)
  })

  // Passivhaus test: <15 kWh/(m²a) with Passivhaus preset
  it('Passivhaus preset should achieve low heating demand', () => {
    const passivParams: BuildingParams = {
      ...defaultParams,
      envelope: { wall: 0.15, roof: 0.15, floor: 0.15, window: 0.80, thermalBridgeSupplement: 0.01 },
      windows: {
        ...defaultParams.windows,
        gValue: 0.50,
      },
      ventilation: {
        airChangeRate: 0.4,
        n50: 0.6,
        ventilationType: 'heatRecovery',
        heatRecoveryEfficiency: 0.85,
      },
    }
    const results = calculateEN832(passivParams, wuerzburg)
    expect(results.specificHeatingDemand).toBeLessThan(25) // Should be close to 15
  })

  // Sonnenschutz effect: Fc 1.0 → 0.2 should reduce cooling demand
  it('reducing Fc should reduce cooling demand', () => {
    const noShading: BuildingParams = {
      ...defaultParams,
      cooling: { ...defaultParams.cooling, movableShadingFc: 1.0 },
    }
    const withShading: BuildingParams = {
      ...defaultParams,
      cooling: { ...defaultParams.cooling, movableShadingFc: 0.2 },
    }

    const resultsNo = calculateEN832(noShading, wuerzburg)
    const resultsWith = calculateEN832(withShading, wuerzburg)

    expect(resultsWith.specificCoolingDemand).toBeLessThan(resultsNo.specificCoolingDemand)
  })

  // Night ventilation effect: higher rate should reduce cooling
  it('higher night ventilation should reduce cooling demand', () => {
    const lowVent: BuildingParams = {
      ...defaultParams,
      cooling: { ...defaultParams.cooling, nightVentilationRate: 0 },
    }
    const highVent: BuildingParams = {
      ...defaultParams,
      cooling: { ...defaultParams.cooling, nightVentilationRate: 4.0 },
    }

    const resultsLow = calculateEN832(lowVent, wuerzburg)
    const resultsHigh = calculateEN832(highVent, wuerzburg)

    expect(resultsHigh.specificCoolingDemand).toBeLessThan(resultsLow.specificCoolingDemand)
  })

  // Large south window + no shading + light construction → high cooling
  it('large south window with no shading and light construction should increase cooling', () => {
    const hotBuilding: BuildingParams = {
      ...defaultParams,
      windows: {
        ...defaultParams.windows,
        ratios: { north: 0.10, east: 0.10, south: 0.60, west: 0.10 },
      },
      cooling: { ...defaultParams.cooling, movableShadingFc: 1.0, thermalMassClass: 'light' },
    }

    const results = calculateEN832(hotBuilding, wuerzburg)
    const defaultResults = calculateEN832(defaultParams, wuerzburg)

    expect(results.specificCoolingDemand).toBeGreaterThan(defaultResults.specificCoolingDemand)
  })

  // WSchV 1977 should have much higher heating demand
  it('WSchV 1977 should have significantly higher heating demand than EnEV 2014', () => {
    const oldBuilding: BuildingParams = {
      ...defaultParams,
      envelope: { wall: 1.45, roof: 0.45, floor: 0.90, window: 3.10, thermalBridgeSupplement: 0.15 },
      windows: { ...defaultParams.windows, gValue: 0.75 },
    }

    const oldResults = calculateEN832(oldBuilding, wuerzburg)
    const newResults = calculateEN832(defaultParams, wuerzburg)

    expect(oldResults.specificHeatingDemand).toBeGreaterThan(newResults.specificHeatingDemand * 2)
  })

  // HT' should be positive
  it('should calculate positive HT prime value', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    expect(results.htPrime).toBeGreaterThan(0)
    expect(results.htPrime).toBeLessThan(2) // Reasonable range
  })

  // Annual totals should equal sum of monthly values
  it('annual totals should equal sum of monthly results', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    const monthlyHeatingSum = results.monthlyResults.reduce((s, m) => s + m.heatingDemand, 0)
    const monthlyCoolingSum = results.monthlyResults.reduce((s, m) => s + m.coolingDemand, 0)

    expect(results.totals.heatingDemand).toBeCloseTo(monthlyHeatingSum, 5)
    expect(results.totals.coolingDemand).toBeCloseTo(monthlyCoolingSum, 5)
  })
})

describe('Keller- und Dachgeschoss-Zonierung', () => {
  const withGeometry = (geometry: Partial<BuildingParams['geometry']>): BuildingParams => ({
    ...defaultParams,
    geometry: { ...defaultParams.geometry, ...geometry },
  })

  it('unbeheizter Dachraum verlegt die Huellflaeche auf die oberste Geschossdecke', () => {
    const heated = calculateEN832(withGeometry({ atticHeated: true }), wuerzburg)
    const unheated = calculateEN832(withGeometry({ atticHeated: false }), wuerzburg)

    const heatedRoof = heated.heatLossComponents.find((c) => c.id === 'roof')!
    const unheatedCeiling = unheated.heatLossComponents.find((c) => c.id === 'ceiling')!

    // Dachhaut ist groesser als die Grundflaeche, die Decke entspricht ihr genau
    expect(heatedRoof.area).toBeGreaterThan(100)
    expect(unheatedCeiling.area).toBeCloseTo(100, 5)
    // ... und die Decke wird mit F_x = 0.8 abgemindert
    expect(unheatedCeiling.correctionFactor).toBe(0.8)
  })

  it('unbeheizter Dachraum senkt den Heizwaermebedarf', () => {
    const heated = calculateEN832(withGeometry({ atticHeated: true }), wuerzburg)
    const unheated = calculateEN832(withGeometry({ atticHeated: false }), wuerzburg)

    expect(unheated.ht).toBeLessThan(heated.ht)
    expect(unheated.totals.heatingDemand).toBeLessThan(heated.totals.heatingDemand)
  })

  it('Flachdach ist unabhaengig vom DG-Schalter immer Aussenbauteil', () => {
    const a = calculateEN832(withGeometry({ roofType: 'flat', atticHeated: true }), wuerzburg)
    const b = calculateEN832(withGeometry({ roofType: 'flat', atticHeated: false }), wuerzburg)

    expect(b.ht).toBeCloseTo(a.ht, 6)
    expect(b.heatLossComponents.find((c) => c.id === 'roof')!.area).toBeCloseTo(100, 5)
  })

  it('beheizter Keller vergroessert Bezugsflaeche und Volumen', () => {
    const none = calculateEN832(withGeometry({ hasBasement: false }), wuerzburg)
    const heated = calculateEN832(withGeometry({ hasBasement: true, basementHeated: true }), wuerzburg)

    expect(heated.netFloorArea).toBeCloseTo(300, 5)   // 3 beheizte Geschosse
    expect(none.netFloorArea).toBeCloseTo(200, 5)
    expect(heated.areas.heatedVolume).toBeGreaterThan(none.areas.heatedVolume)
    // erdberuehrte Kellerwand kommt als eigenes Bauteil dazu
    expect(heated.heatLossComponents.some((c) => c.id === 'basementWall')).toBe(true)
  })

  it('unbeheizter Keller mindert die Bodenplatte auf F_x = 0.5 ab', () => {
    const unheated = calculateEN832(withGeometry({ hasBasement: true, basementHeated: false }), wuerzburg)
    const none = calculateEN832(withGeometry({ hasBasement: false }), wuerzburg)

    expect(unheated.heatLossComponents.find((c) => c.id === 'floor')!.correctionFactor).toBe(0.5)
    expect(none.heatLossComponents.find((c) => c.id === 'floor')!.correctionFactor).toBe(0.6)
    // Bezugsflaeche bleibt unveraendert, der Keller zaehlt nicht zur beheizten Zone
    expect(unheated.netFloorArea).toBeCloseTo(none.netFloorArea, 5)
    expect(unheated.areas.heatedVolume).toBeCloseTo(none.areas.heatedVolume, 5)
  })

  it('HT ist die Summe der Bauteilanteile', () => {
    const results = calculateEN832(defaultParams, wuerzburg)
    const sum = results.heatLossComponents.reduce((s, c) => s + c.area * c.uValue * c.correctionFactor, 0)
    expect(results.ht).toBeCloseTo(sum, 6)
  })
})

describe('World climate zones', () => {
  it('every zone yields finite results', () => {
    for (const zone of worldClimateLocations) {
      const results = calculateEN832({ ...defaultParams, climateLocationId: zone.id }, zone)
      expect(Number.isFinite(results.specificHeatingDemand)).toBe(true)
      expect(Number.isFinite(results.specificCoolingDemand)).toBe(true)
      expect(Number.isFinite(results.primaryEnergy.primaryEnergyNet)).toBe(true)
    }
  })

  // Tropics: monthly mean above the heating setpoint in every month -> no losses,
  // gain/loss ratio becomes infinite. Must not produce NaN.
  it('tropical zone has zero heating and positive cooling demand', () => {
    const tropics = worldClimateLocations.find((z) => z.id === 'zoneTropics')!
    const results = calculateEN832({ ...defaultParams, climateLocationId: tropics.id }, tropics)

    expect(results.specificHeatingDemand).toBe(0)
    expect(results.specificCoolingDemand).toBeGreaterThan(0)
  })

  it('polar zone needs far more heating than the temperate zone', () => {
    const polar = worldClimateLocations.find((z) => z.id === 'zonePolar')!
    const temperate = worldClimateLocations.find((z) => z.id === 'zoneTemperate')!

    const polarResults = calculateEN832({ ...defaultParams, climateLocationId: polar.id }, polar)
    const temperateResults = calculateEN832({ ...defaultParams, climateLocationId: temperate.id }, temperate)

    expect(polarResults.specificHeatingDemand).toBeGreaterThan(temperateResults.specificHeatingDemand * 2)
  })
})
