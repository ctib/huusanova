import type { BuildingGeometry, BuildingParams } from './types'

/**
 * Temperaturkorrekturfaktoren F_x nach DIN V 4108-6 / DIN V 18599-2.
 * Bauteile, die nicht an die Aussenluft grenzen, uebertragen weniger Waerme.
 */
export const TEMPERATURE_CORRECTION = {
  exteriorAir: 1.0,
  ground: 0.6,            // erdberuehrte Bodenplatte / Kellerwand
  unheatedBasement: 0.5,  // Decke gegen unbeheizten Keller
  unheatedAttic: 0.8,     // oberste Geschossdecke gegen unbeheizten Dachraum
} as const

/** Kellerhoehe als Anteil der Regelgeschosshoehe (wie in der Isometrie dargestellt) */
export const BASEMENT_HEIGHT_FACTOR = 0.8

/** Firsthoehe ueber der obersten Geschossdecke (m) */
export function roofHeight(geometry: Pick<BuildingGeometry, 'roofType' | 'roofPitch' | 'width'>): number {
  if (geometry.roofType === 'flat') return 0
  const pitchRad = (geometry.roofPitch * Math.PI) / 180
  if (geometry.roofType === 'shed') return Math.tan(pitchRad) * geometry.width
  return (Math.tan(pitchRad) * geometry.width) / 2
}

export interface BuildingAreas {
  footprint: number           // Grundflaeche eines Geschosses (m²)
  grossFloorArea: number      // BGF ueber alle Vollgeschosse (m²)
  heatedStories: number       // beheizte Vollgeschosse (inkl. beheiztem Keller)
  netFloorArea: number        // A_N, Bezugsflaeche der spezifischen Kennwerte (m²)
  totalHeight: number         // Hoehe der oberirdischen Geschosse (m)
  basementDepth: number       // lichte Hoehe des Kellers (m), 0 ohne Keller
  roofRise: number            // Firsthoehe ueber der obersten Decke (m)
  atticVolume: number         // Dachraumvolumen (m³)
  heatedVolume: number        // V_e - beheiztes Bruttovolumen (m³)

  facadeNorth: number         // m² (oberirdisch)
  facadeEast: number
  facadeSouth: number
  facadeWest: number
  totalFacade: number

  windowNorth: number         // m²
  windowEast: number
  windowSouth: number
  windowWest: number
  totalWindow: number

  opaqueWallNorth: number     // m²
  opaqueWallEast: number
  opaqueWallSouth: number
  opaqueWallWest: number
  totalOpaqueWall: number

  gableWallArea: number       // m² Giebel-/Aufkantungsflaechen des Dachraums
  roofArea: number            // m² geneigte Dachflaeche (nur wenn Dachraum beheizt)
  ceilingArea: number         // m² oberste Geschossdecke (nur wenn Dachraum unbeheizt)
  basementWallArea: number    // m² erdberuehrte Kellerwand (nur wenn Keller beheizt)
  floorSlabArea: number       // m² unterste Bauteilflaeche (Bodenplatte bzw. Kellerdecke)
  envelopeArea: number        // A_E - waermeuebertragende Huellflaeche (m²)
}

/**
 * Geometrische Ableitungen aus den Eingaben. Einzige Quelle fuer Flaechen und
 * Volumina - Rechenkern und alle Reiter greifen hierauf zu.
 */
export function calculateBuildingAreas(params: BuildingParams): BuildingAreas {
  const { length, width, height, stories, roofType, hasBasement, basementHeated, atticHeated } = params.geometry
  const { ratios } = params.windows

  const footprint = length * width
  const grossFloorArea = footprint * stories
  const totalHeight = height * stories
  const basementDepth = hasBasement ? height * BASEMENT_HEIGHT_FACTOR : 0

  const heatedStories = stories + (hasBasement && basementHeated ? 1 : 0)
  const netFloorArea = footprint * heatedStories

  // Dachraum: nur geneigte Daecher bilden einen Dachraum aus
  const hasAttic = roofType !== 'flat'
  const roofRise = roofHeight(params.geometry)
  const atticVolume = !hasAttic
    ? 0
    : roofType === 'hip'
      // Walmdach als Prismatoid: V = h/6 · W · (2L + L_first), L_first = L - W
      ? (roofRise / 6) * width * (2 * length + Math.max(0, length - width))
      // Sattel- und Pultdach: halbes Quader-Volumen
      : (footprint * roofRise) / 2

  const heatedVolume =
    footprint * height * stories +
    (hasBasement && basementHeated ? footprint * basementDepth : 0) +
    (hasAttic && atticHeated ? atticVolume : 0)

  // Fassaden (oberirdisch, ohne Giebel)
  const facadeNorth = length * totalHeight
  const facadeEast = width * totalHeight
  const facadeSouth = length * totalHeight
  const facadeWest = width * totalHeight
  const totalFacade = facadeNorth + facadeEast + facadeSouth + facadeWest

  const windowNorth = facadeNorth * ratios.north
  const windowEast = facadeEast * ratios.east
  const windowSouth = facadeSouth * ratios.south
  const windowWest = facadeWest * ratios.west
  const totalWindow = windowNorth + windowEast + windowSouth + windowWest

  const opaqueWallNorth = facadeNorth - windowNorth
  const opaqueWallEast = facadeEast - windowEast
  const opaqueWallSouth = facadeSouth - windowSouth
  const opaqueWallWest = facadeWest - windowWest
  const totalOpaqueWall = totalFacade - totalWindow

  // Giebelflaechen bzw. Aufkantung beim Pultdach
  const gableWallArea =
    roofType === 'gable' ? width * roofRise
      : roofType === 'shed' ? width * roofRise + length * roofRise
        : 0

  // Beheizter Dachraum -> geneigte Dachflaeche ist Huellflaeche.
  // Unbeheizter Dachraum -> oberste Geschossdecke ist Huellflaeche.
  const pitchedRoofArea = hasAttic
    ? footprint / Math.cos((params.geometry.roofPitch * Math.PI) / 180)
    : footprint
  const atticIsHeated = !hasAttic || atticHeated
  const roofArea = atticIsHeated ? pitchedRoofArea : 0
  const ceilingArea = atticIsHeated ? 0 : footprint

  const basementWallArea = hasBasement && basementHeated
    ? 2 * (length + width) * basementDepth
    : 0
  const floorSlabArea = footprint

  const envelopeArea =
    totalFacade +
    (atticIsHeated ? gableWallArea : 0) +
    roofArea +
    ceilingArea +
    basementWallArea +
    floorSlabArea

  return {
    footprint, grossFloorArea, heatedStories, netFloorArea,
    totalHeight, basementDepth, roofRise, atticVolume, heatedVolume,
    facadeNorth, facadeEast, facadeSouth, facadeWest, totalFacade,
    windowNorth, windowEast, windowSouth, windowWest, totalWindow,
    opaqueWallNorth, opaqueWallEast, opaqueWallSouth, opaqueWallWest, totalOpaqueWall,
    gableWallArea, roofArea, ceilingArea, basementWallArea, floorSlabArea, envelopeArea,
  }
}

export interface HeatLossComponent {
  id: 'wall' | 'window' | 'roof' | 'ceiling' | 'basementWall' | 'floor' | 'thermalBridge'
  area: number                // m²
  uValue: number              // W/(m²K)
  correctionFactor: number    // F_x
  ht: number                  // W/K = A · U · F_x
}

/**
 * Bauteilweise Transmissionswaermeverluste. Der beheizte Bereich haengt davon ab,
 * ob Keller und Dachraum beheizt sind - das verschiebt die Huellflaeche.
 */
export function calculateHeatLossComponents(
  params: BuildingParams,
  areas: BuildingAreas
): HeatLossComponent[] {
  const { envelope } = params
  const { hasBasement, basementHeated, roofType, atticHeated } = params.geometry
  const F = TEMPERATURE_CORRECTION
  const atticIsHeated = roofType === 'flat' || atticHeated

  const components: HeatLossComponent[] = [
    {
      id: 'wall',
      area: areas.totalOpaqueWall + (atticIsHeated ? areas.gableWallArea : 0),
      uValue: envelope.wall,
      correctionFactor: F.exteriorAir,
      ht: 0,
    },
    {
      id: 'window',
      area: areas.totalWindow,
      uValue: envelope.window,
      correctionFactor: F.exteriorAir,
      ht: 0,
    },
  ]

  if (atticIsHeated) {
    components.push({
      id: 'roof', area: areas.roofArea, uValue: envelope.roof,
      correctionFactor: F.exteriorAir, ht: 0,
    })
  } else {
    components.push({
      id: 'ceiling', area: areas.ceilingArea, uValue: envelope.roof,
      correctionFactor: F.unheatedAttic, ht: 0,
    })
  }

  if (hasBasement && basementHeated) {
    components.push({
      id: 'basementWall', area: areas.basementWallArea, uValue: envelope.wall,
      correctionFactor: F.ground, ht: 0,
    })
    components.push({
      id: 'floor', area: areas.floorSlabArea, uValue: envelope.floor,
      correctionFactor: F.ground, ht: 0,
    })
  } else if (hasBasement) {
    // Kellerdecke gegen unbeheizten Keller
    components.push({
      id: 'floor', area: areas.floorSlabArea, uValue: envelope.floor,
      correctionFactor: F.unheatedBasement, ht: 0,
    })
  } else {
    // Bodenplatte direkt auf Erdreich
    components.push({
      id: 'floor', area: areas.floorSlabArea, uValue: envelope.floor,
      correctionFactor: F.ground, ht: 0,
    })
  }

  components.push({
    id: 'thermalBridge', area: areas.envelopeArea, uValue: envelope.thermalBridgeSupplement,
    correctionFactor: F.exteriorAir, ht: 0,
  })

  return components.map((comp) => ({
    ...comp,
    ht: comp.area * comp.uValue * comp.correctionFactor,
  }))
}
