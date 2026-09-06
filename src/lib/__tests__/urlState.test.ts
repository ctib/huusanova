import { describe, it, expect } from 'vitest'
import { encodeState, decodeState } from '../urlState'
import type { SharedState } from '../urlState'
import {
  useBuildingStore,
  defaultParams,
  defaultMethod,
  defaultPresetId,
  defaultSharedState,
} from '../../store/buildingStore'

const defaults: SharedState = {
  params: defaultParams,
  method: defaultMethod,
  presetId: defaultPresetId,
}

/** Tiefe Kopie der Defaults, damit Tests sich nicht gegenseitig beeinflussen. */
function fresh(): SharedState {
  return {
    params: JSON.parse(JSON.stringify(defaultParams)),
    method: defaultMethod,
    presetId: defaultPresetId,
  }
}

describe('urlState', () => {
  it('kodiert den Default-Zustand als leeren String', () => {
    expect(encodeState(fresh(), defaults)).toBe('')
  })

  it('kodiert nur die Abweichungen vom Default', () => {
    const s = fresh()
    s.params.geometry.length = 12
    s.params.envelope.wall = 0.2

    const encoded = encodeState(s, defaults)
    expect(encoded).toContain('geometry.length=12')
    expect(encoded).toContain('envelope.wall=0.2')
    // Unveraenderte Parameter tauchen nicht auf
    expect(encoded).not.toContain('geometry.width')
    expect(encoded).not.toContain('tga.')
  })

  it('ueberlebt eine Runde encode -> decode verlustfrei', () => {
    const s = fresh()
    s.params.geometry.length = 14.5
    s.params.geometry.roofType = 'hip'
    s.params.geometry.hasBasement = true
    s.params.windows.ratios.south = 0.45
    s.params.cooling.thermalMassClass = 'heavy'
    s.params.tga.heatingSystem = 'groundSourceHP'
    s.params.climateLocationId = 'hamburg'
    s.params.heatingSetpoint = 21.5
    s.method = 'SIA380'
    s.presetId = null

    const round = decodeState(encodeState(s, defaults), defaults)
    expect(round).toEqual(s)
  })

  it('kodiert Methode und Preset nur bei Abweichung', () => {
    const s = fresh()
    expect(encodeState(s, defaults)).not.toContain('m=')

    s.method = 'DIN18599'
    expect(encodeState(s, defaults)).toContain('m=DIN18599')
  })

  it('unterscheidet "kein Preset" vom Default-Preset', () => {
    const s = fresh()
    s.presetId = null

    const encoded = encodeState(s, defaults)
    expect(encoded).toContain('preset=')
    expect(decodeState(encoded, defaults).presetId).toBeNull()
  })

  it('vermeidet Gleitkomma-Artefakte in der URL', () => {
    const s = fresh()
    s.params.envelope.wall = 0.1 + 0.2 // 0.30000000000000004
    expect(encodeState(s, defaults)).toContain('envelope.wall=0.3')
  })

  it('liefert bei leerem Hash die Defaults', () => {
    expect(decodeState('', defaults)).toEqual(defaults)
    expect(decodeState('#', defaults)).toEqual(defaults)
  })

  it('akzeptiert einen fuehrenden Hash', () => {
    expect(decodeState('#geometry.length=12', defaults).params.geometry.length).toBe(12)
  })

  // Ab hier: was aus Moodle bzw. aus E-Mail-Clients zurueckkommt.
  it('ignoriert unbekannte Parameter', () => {
    const r = decodeState('gibtsnicht=5&geometry.length=12&utm_source=moodle', defaults)
    expect(r.params.geometry.length).toBe(12)
    expect(r.params).not.toHaveProperty('gibtsnicht')
  })

  it('verwirft Werte mit falschem Typ statt zu uebernehmen', () => {
    const r = decodeState('geometry.length=abc&geometry.hasBasement=vielleicht', defaults)
    expect(r.params.geometry.length).toBe(defaultParams.geometry.length)
    expect(r.params.geometry.hasBasement).toBe(defaultParams.geometry.hasBasement)
  })

  it('verwirft unzulaessige Enum-Werte', () => {
    const r = decodeState('geometry.roofType=zwiebelturm&tga.heatingSystem=kernfusion', defaults)
    expect(r.params.geometry.roofType).toBe(defaultParams.geometry.roofType)
    expect(r.params.tga.heatingSystem).toBe(defaultParams.tga.heatingSystem)
  })

  it('verwirft eine unbekannte Berechnungsmethode', () => {
    expect(decodeState('m=Handrechnung', defaults).method).toBe(defaultMethod)
  })

  it('faellt bei unbekanntem Standort auf den Default zurueck', () => {
    // Sonst steigt recompute() ohne Klimadatensatz stumm aus und die App
    // zeigt dauerhaft keine Ergebnisse.
    const r = decodeState('climateLocationId=atlantis', defaults)
    expect(r.params.climateLocationId).toBe(defaultParams.climateLocationId)
  })

  it('uebersteht kaputtes Prozent-Encoding', () => {
    const r = decodeState('geometry.length=12&envelope.wall=%E0%A4%A', defaults)
    expect(r.params.geometry.length).toBe(12)
    expect(r.params.envelope.wall).toBe(defaultParams.envelope.wall)
  })

  it('uebersteht Muell ohne Gleichheitszeichen', () => {
    const r = decodeState('&&kaputt&geometry.length=12&', defaults)
    expect(r.params.geometry.length).toBe(12)
  })

  it('laesst die Defaults unveraendert (keine geteilte Referenz)', () => {
    const r = decodeState('geometry.length=99', defaults)
    expect(r.params.geometry.length).toBe(99)
    expect(defaultParams.geometry.length).toBe(10)
  })

  it('kann keine neuen Zweige in den Parametern anlegen', () => {
    const r = decodeState('geometry.__proto__.polluted=1&constructor.prototype.x=1', defaults)
    expect((r.params as unknown as Record<string, unknown>).polluted).toBeUndefined()
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })
})

/**
 * Der Store-Vertrag, auf dem useUrlSync aufsetzt. Die React-Verdrahtung selbst
 * laesst sich hier nicht pruefen (Testumgebung ist 'node', kein DOM), aber
 * genau diese beiden Punkte waeren die stillen Fehler: eine Subscription, die
 * nicht feuert, und ein hydrate(), das den Zustand nicht uebernimmt.
 */
describe('urlState + Store', () => {
  it('meldet Parameteraenderungen an Abonnenten', () => {
    const seen: string[] = []
    const unsubscribe = useBuildingStore.subscribe((state, prev) => {
      if (
        state.params === prev.params &&
        state.method === prev.method &&
        state.presetId === prev.presetId
      ) {
        return
      }
      const { params, method, presetId } = state
      seen.push(encodeState({ params, method, presetId }, defaultSharedState))
    })

    useBuildingStore.getState().setNestedParam('geometry.length', 12)
    unsubscribe()

    expect(seen.length).toBeGreaterThan(0)
    expect(seen[seen.length - 1]).toContain('geometry.length=12')
  })

  it('uebernimmt einen dekodierten Zustand vollstaendig', () => {
    const decoded = decodeState('geometry.width=13&m=DIN18599&preset=', defaults)
    useBuildingStore.getState().hydrate(decoded)

    const { params, method, presetId } = useBuildingStore.getState()
    expect(params.geometry.width).toBe(13)
    expect(method).toBe('DIN18599')
    expect(presetId).toBeNull()

    // ...und laesst sich verlustfrei wieder zu genau diesem Link kodieren
    const encoded = encodeState({ params, method, presetId }, defaultSharedState)
    expect(decodeState(encoded, defaults)).toEqual(decoded)
  })
})
