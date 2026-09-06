import type { BuildingParams, ClimateLocation, AnnualResult } from './types'
import { calculateEN832 } from './en832'

/**
 * DIN 18599 simplified single-zone calculation engine
 *
 * Based on the monthly balance method with German-specific adaptations:
 * - German TRY climate zones
 * - DIN-specific infiltration calculation
 * - Primary energy conversion factors (not yet implemented)
 *
 * For this simplified implementation, the core algorithm is identical
 * to EN 832. Full DIN 18599 would require multi-zone calculations,
 * lighting, domestic hot water, and auxiliary energy calculations
 * which are beyond the scope of this teaching tool.
 */
export function calculateDIN18599(params: BuildingParams, climate: ClimateLocation): AnnualResult {
  // Simplified DIN 18599 uses the same monthly balance core
  // A full implementation would add:
  // - fp factors for primary energy
  // - DHW calculation
  // - Lighting energy
  // - Auxiliary energy for HVAC systems
  return calculateEN832(params, climate)
}
