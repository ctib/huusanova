import type { BuildingParams, ClimateLocation, AnnualResult } from './types'
import { calculateEN832 } from './en832'

/**
 * SIA 380/1 calculation engine
 *
 * Based on the same monthly balance method as EN 832/ISO 13790,
 * with Swiss-specific adaptations:
 * - Swiss reference climate locations (Zürich, Bern, Lugano)
 * - SIA-specific thermal bridge supplements
 * - Energy reference area (EBF) according to SIA definition
 * - Standard occupancy gains per SIA usage categories
 *
 * For this simplified implementation, the core algorithm is identical
 * to EN 832. The differences are in the input parameters (presets,
 * climate data) which are handled by the UI layer.
 */
export function calculateSIA380(params: BuildingParams, climate: ClimateLocation): AnnualResult {
  // SIA 380/1 uses the same monthly balance method
  // The main differences are in default values and climate data,
  // which are already handled by the parameter/climate selection
  return calculateEN832(params, climate)
}
