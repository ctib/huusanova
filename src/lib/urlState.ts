import type { BuildingParams } from '@/calculation/types'
import { getClimateLocationById } from '@/data/climateData'

/**
 * Serialisierung des Gebaeudezustands in die URL.
 *
 * Ziel: Studierende koennen eine Konfiguration per Link teilen ("bei mir kommt
 * Bloedsinn raus") und ein Reload wirft die Eingaben nicht weg.
 *
 * Format: lesbare Punkt-Pfade im Hash, z.B.
 *   #geometry.length=12&envelope.wall=0.2&m=SIA380
 *
 * Bewusst nur die Abweichungen vom Default. Das haelt typische Links kurz und
 * macht das Format vorwaerts-/rueckwaertskompatibel: unbekannte Schluessel
 * werden ignoriert, fehlende Schluessel sind der Default. Ein Link aus einer
 * aelteren Version bleibt damit gueltig, auch wenn spaeter Parameter dazukommen.
 *
 * Der Hash (nicht der Query-String) wird verwendet, damit die Konfiguration
 * nicht bei jedem Aufruf an den Webserver mitgeschickt wird und Moodle-Links
 * mit eigenen Query-Parametern nicht kollidieren.
 */

export type CalculationMethod = 'EN832' | 'SIA380' | 'DIN18599'

export interface SharedState {
  params: BuildingParams
  method: CalculationMethod
  presetId: string | null
}

/** Erlaubte Werte fuer String-Parameter - alles andere wird verworfen. */
const ENUMS: Record<string, readonly string[]> = {
  'geometry.roofType': ['flat', 'gable', 'hip', 'shed'],
  'cooling.thermalMassClass': ['light', 'medium', 'heavy'],
  'ventilation.ventilationType': ['natural', 'mechanical', 'heatRecovery'],
  'tga.heatingSystem': [
    'gasCondensing',
    'oilCondensing',
    'airSourceHP',
    'groundSourceHP',
    'pelletBoiler',
    'districtHeatingFossil',
    'districtHeatingRenewable',
    'electricDirect',
    'logBoiler',
  ],
  'tga.dhwSystem': ['sameAsHeating', 'electricInstantaneous', 'solarThermalAssist'],
}

const METHODS: readonly CalculationMethod[] = ['EN832', 'SIA380', 'DIN18599']

const METHOD_KEY = 'm'
const PRESET_KEY = 'preset'

type Primitive = string | number | boolean
type Flat = Record<string, Primitive>

/** Verschachteltes Objekt in flache Punkt-Pfade aufloesen. */
function flatten(obj: unknown, prefix = ''): Flat {
  const out: Flat = {}
  if (obj === null || typeof obj !== 'object') return out

  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object') {
      Object.assign(out, flatten(value, path))
    } else if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      out[path] = value
    }
  }
  return out
}

/** Wert unter einem Punkt-Pfad setzen; legt keine neuen Zweige an. */
function setPath(target: Record<string, unknown>, path: string, value: Primitive): boolean {
  const parts = path.split('.')
  let obj: Record<string, unknown> = target

  for (let i = 0; i < parts.length - 1; i++) {
    const next = obj[parts[i]]
    if (next === null || typeof next !== 'object') return false
    obj = next as Record<string, unknown>
  }
  const leaf = parts[parts.length - 1]
  if (!(leaf in obj)) return false
  obj[leaf] = value
  return true
}

/**
 * Zahlen kurz halten: 0.30000000000000004 soll nicht in der URL landen.
 * 6 Nachkommastellen sind fuer alle Parameter hier mehr als ausreichend.
 */
function formatNumber(n: number): string {
  return String(Math.round(n * 1e6) / 1e6)
}

/** Zustand in einen Hash-String kodieren (ohne fuehrendes '#'). */
export function encodeState(state: SharedState, defaults: SharedState): string {
  const flatNow = flatten(state.params)
  const flatDefault = flatten(defaults.params)
  const parts: string[] = []

  for (const [path, value] of Object.entries(flatNow)) {
    if (flatDefault[path] === value) continue
    const text = typeof value === 'number' ? formatNumber(value) : String(value)
    parts.push(`${path}=${encodeURIComponent(text)}`)
  }

  if (state.method !== defaults.method) {
    parts.push(`${METHOD_KEY}=${state.method}`)
  }
  // Der Preset-Schluessel darf auch leer sein: "kein Preset" (= von Hand
  // verstellt) ist ein bedeutungsvoller Zustand und nicht der Default.
  if (state.presetId !== defaults.presetId) {
    parts.push(`${PRESET_KEY}=${encodeURIComponent(state.presetId ?? '')}`)
  }

  return parts.join('&')
}

/**
 * Hash-String auf die Defaults anwenden. Ungueltige oder unbekannte Eintraege
 * werden still verworfen - ein kaputter Link soll eine benutzbare App zeigen
 * und keinen weissen Bildschirm.
 */
export function decodeState(hash: string, defaults: SharedState): SharedState {
  const params = JSON.parse(JSON.stringify(defaults.params)) as BuildingParams
  let method = defaults.method
  let presetId = defaults.presetId

  const clean = hash.startsWith('#') ? hash.slice(1) : hash
  if (!clean) return { params, method, presetId }

  const flatDefault = flatten(defaults.params)

  for (const pair of clean.split('&')) {
    if (!pair) continue
    const eq = pair.indexOf('=')
    if (eq < 0) continue

    const key = decodeURIComponent(pair.slice(0, eq))
    let raw: string
    try {
      raw = decodeURIComponent(pair.slice(eq + 1))
    } catch {
      continue // kaputtes Prozent-Encoding
    }

    if (key === METHOD_KEY) {
      if ((METHODS as readonly string[]).includes(raw)) method = raw as CalculationMethod
      continue
    }
    if (key === PRESET_KEY) {
      presetId = raw === '' ? null : raw
      continue
    }

    const fallback = flatDefault[key]
    if (fallback === undefined) continue // unbekannter Parameter

    if (typeof fallback === 'number') {
      const n = Number(raw)
      if (!Number.isFinite(n)) continue
      setPath(params as unknown as Record<string, unknown>, key, n)
    } else if (typeof fallback === 'boolean') {
      if (raw !== 'true' && raw !== 'false') continue
      setPath(params as unknown as Record<string, unknown>, key, raw === 'true')
    } else {
      const allowed = ENUMS[key]
      if (allowed && !allowed.includes(raw)) continue
      setPath(params as unknown as Record<string, unknown>, key, raw)
    }
  }

  // Ein unbekannter Standort wuerde die Berechnung stumm blockieren
  // (recompute() steigt ohne Klimadatensatz aus) - lieber zurueckfallen.
  if (!getClimateLocationById(params.climateLocationId)) {
    params.climateLocationId = defaults.params.climateLocationId
  }

  return { params, method, presetId }
}

/** Vollstaendige, teilbare URL zum aktuellen Zustand. */
export function buildShareUrl(state: SharedState, defaults: SharedState): string {
  const encoded = encodeState(state, defaults)
  const { origin, pathname, search } = window.location
  return `${origin}${pathname}${search}${encoded ? `#${encoded}` : ''}`
}
