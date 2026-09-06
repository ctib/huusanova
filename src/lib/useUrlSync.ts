import { useEffect, useLayoutEffect } from 'react'
import { useBuildingStore, defaultSharedState } from '@/store/buildingStore'
import { decodeState, encodeState } from './urlState'

/** Sliderziehen soll nicht bei jedem Pixel die URL neu schreiben. */
const WRITE_DELAY_MS = 300

/**
 * Haelt URL-Hash und Store synchron:
 *  - beim Start wird ein vorhandener Hash uebernommen (geteilter Link, Reload)
 *  - Aenderungen werden verzoegert zurueckgeschrieben
 *  - manuelles Editieren des Hashs wird uebernommen
 *
 * Geschrieben wird mit replaceState statt location.hash: das erzeugt keine
 * History-Eintraege (sonst waere der Zurueck-Button nach ein paar Slidern
 * unbrauchbar) und loest kein hashchange aus, was sonst eine Endlosschleife
 * mit dem Listener weiter unten geben wuerde.
 */
export function useUrlSync() {
  const hydrate = useBuildingStore((s) => s.hydrate)

  // Vor dem ersten Paint, damit die App nicht kurz die Defaults zeigt.
  useLayoutEffect(() => {
    if (window.location.hash.length > 1) {
      hydrate(decodeState(window.location.hash, defaultSharedState))
    }
  }, [hydrate])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    let lastWritten = window.location.hash.replace(/^#/, '')

    const write = () => {
      const { params, method, presetId } = useBuildingStore.getState()
      const encoded = encodeState({ params, method, presetId }, defaultSharedState)
      if (encoded === lastWritten) return
      lastWritten = encoded

      const { origin, pathname, search } = window.location
      window.history.replaceState(
        null,
        '',
        `${origin}${pathname}${search}${encoded ? `#${encoded}` : ''}`,
      )
    }

    const unsubscribe = useBuildingStore.subscribe((state, prev) => {
      if (
        state.params === prev.params &&
        state.method === prev.method &&
        state.presetId === prev.presetId
      ) {
        return // nur Ergebnisse oder reine UI-Umschalter
      }
      if (timer) clearTimeout(timer)
      timer = setTimeout(write, WRITE_DELAY_MS)
    })

    // Von Hand geaenderter Hash (oder ein zweiter Link aus der Zwischenablage).
    const onHashChange = () => {
      const incoming = window.location.hash.replace(/^#/, '')
      if (incoming === lastWritten) return
      lastWritten = incoming
      hydrate(decodeState(incoming, defaultSharedState))
    }
    window.addEventListener('hashchange', onHashChange)

    return () => {
      if (timer) clearTimeout(timer)
      unsubscribe()
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [hydrate])
}
