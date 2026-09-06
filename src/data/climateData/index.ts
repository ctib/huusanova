import type { ClimateLocation } from '@/calculation/types'
import { climateLocations as germanLocations } from './germany'
import { swissClimateLocations } from './switzerland'
import { worldClimateLocations } from './world'

export const allClimateLocations: ClimateLocation[] = [
  ...germanLocations,
  ...swissClimateLocations,
  ...worldClimateLocations,
]

export function getClimateLocationById(id: string): ClimateLocation | undefined {
  return allClimateLocations.find((loc) => loc.id === id)
}

export function getClimateLocationsByCountry(country: string): ClimateLocation[] {
  return allClimateLocations.filter((loc) => loc.country === country)
}

export { climateLocations } from './germany'
export { swissClimateLocations } from './switzerland'
export { worldClimateLocations, worldZoneColors } from './world'
