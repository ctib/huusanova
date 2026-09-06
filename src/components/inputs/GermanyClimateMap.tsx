import { useState } from 'react'
import { useBuildingStore } from '@/store/buildingStore'
import { climateLocations } from '@/data/climateData/germany'

/**
 * Klickbare TRY-Klimaregionen-Karte (DIN V 18599 / DWD Testreferenzjahre).
 * Hintergrund: public/maps/try-klimaregionen-de.jpg (656 x 827 px).
 * Die Hotspots liegen auf den gruenen Referenzstations-Markern der Grafik.
 */

const IMG_W = 656
const IMG_H = 827

// Pixelposition der gruenen Stationsmarker in der Originalgrafik
const stationPixels: Record<string, { x: number; y: number }> = {
  bremerhaven: { x: 225, y: 159 },
  rostock: { x: 439, y: 95 },
  hamburg: { x: 308, y: 154 },
  potsdam: { x: 507, y: 269 },
  essen: { x: 109, y: 378 },
  badMarienberg: { x: 176, y: 462 },
  kassel: { x: 277, y: 395 },
  braunlage: { x: 354, y: 345 },
  chemnitz: { x: 506, y: 434 },
  hof: { x: 439, y: 490 },
  fichtelberg: { x: 513, y: 474 },
  mannheim: { x: 217, y: 583 },
  muehldorf: { x: 560, y: 670 },
  stoetten: { x: 314, y: 672 },
  garmisch: { x: 403, y: 795 },
}

export function GermanyClimateMap() {
  const climateLocationId = useBuildingStore((s) => s.params.climateLocationId)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const selected = climateLocations.find((l) => l.id === climateLocationId)
  const hovered = climateLocations.find((l) => l.id === hoveredId)
  const info = hovered ?? selected

  return (
    <div className="space-y-1">
      <div className="relative mx-auto w-full max-w-[430px] rounded-md bg-white p-1">
        <img
          src={`${import.meta.env.BASE_URL}maps/try-klimaregionen-de.jpg`}
          alt="Karte der 15 TRY-Klimaregionen Deutschlands nach DIN V 18599"
          className="block w-full h-auto select-none"
          draggable={false}
        />

        {climateLocations.map((loc) => {
          const px = stationPixels[loc.id]
          if (!px) return null
          const isSelected = loc.id === climateLocationId
          const isHovered = loc.id === hoveredId

          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => setNestedParam('climateLocationId', loc.id)}
              onMouseEnter={() => setHoveredId(loc.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(loc.id)}
              onBlur={() => setHoveredId(null)}
              title={`TRY ${loc.tryRegion} – ${loc.name}`}
              aria-label={`TRY ${loc.tryRegion} – ${loc.name}: ${loc.regionName}`}
              aria-pressed={isSelected}
              className="absolute rounded-full transition-all focus:outline-none"
              style={{
                left: `${(px.x / IMG_W) * 100}%`,
                top: `${(px.y / IMG_H) * 100}%`,
                width: 22,
                height: 22,
                transform: 'translate(-50%, -50%)',
                border: isSelected
                  ? '3px solid #dc2626'
                  : isHovered
                    ? '3px solid #f97316'
                    : '2px solid rgba(0,0,0,0.18)',
                boxShadow: isSelected ? '0 0 0 3px rgba(220,38,38,0.25)' : 'none',
                cursor: 'pointer',
              }}
            />
          )
        })}
      </div>

      <div className="text-[10px] text-center text-muted-foreground min-h-[1.4em]">
        {info?.tryRegion
          ? `TRY ${info.tryRegion} – ${info.name} · ${info.regionName}`
          : 'Referenzstation auf der Karte anklicken'}
      </div>

      <div className="text-[9px] text-center text-muted-foreground/70">
        Kartengrundlage:{' '}
        <a
          href="https://www.caala.de/lexikon/klimaregion-din-v-18599"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          caala.de – Klimaregionen DIN V 18599
        </a>
      </div>
    </div>
  )
}
