import { useEffect, useRef, useState } from 'react'
import { useBuildingStore } from '@/store/buildingStore'
import { worldClimateLocations, worldZoneColors } from '@/data/climateData/world'

/**
 * Klickbare Weltkarte der thermischen Klimazonen.
 * Hintergrund: public/maps/klimazonen-welt.png
 * Die Zonenzuordnung erfolgt ueber einen Pixel-Farbtest auf einem
 * versteckten Canvas – ein Klick auf eine eingefaerbte Flaeche waehlt
 * den zugehoerigen Referenz-Datensatz aus.
 */

// BASE_URL statt absolutem Pfad, damit die Karte auch aus einem
// Unterverzeichnis geladen wird (sonst 404 -> Farberkennung tot).
const MAP_SRC = `${import.meta.env.BASE_URL}maps/klimazonen-welt.png`
const COLOR_TOLERANCE = 60 // max. euklidischer RGB-Abstand fuer einen Treffer

function matchZone(r: number, g: number, b: number): string | null {
  let bestId: string | null = null
  let bestDist = Number.POSITIVE_INFINITY
  for (const zone of worldZoneColors) {
    const dr = r - zone.rgb[0]
    const dg = g - zone.rgb[1]
    const db = b - zone.rgb[2]
    const dist = Math.sqrt(dr * dr + dg * dg + db * db)
    if (dist < bestDist) {
      bestDist = dist
      bestId = zone.id
    }
  }
  return bestDist <= COLOR_TOLERANCE ? bestId : null
}

function rgbCss(rgb: [number, number, number]) {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

export function WorldClimateMap() {
  const climateLocationId = useBuildingStore((s) => s.params.climateLocationId)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ready, setReady] = useState(false)
  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null)
  const [miss, setMiss] = useState(false)

  // Bild einmalig in ein Offscreen-Canvas zeichnen, um Pixel lesen zu koennen
  useEffect(() => {
    const img = new Image()
    img.src = MAP_SRC
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      canvasRef.current = canvas
      setReady(true)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    const px = Math.floor(relX * canvas.width)
    const py = Math.floor(relY * canvas.height)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const [r, g, b] = ctx.getImageData(px, py, 1, 1).data
    const zoneId = matchZone(r, g, b)
    setMarker({ x: relX * 100, y: relY * 100 })
    if (zoneId) {
      setMiss(false)
      setNestedParam('climateLocationId', zoneId)
    } else {
      setMiss(true)
    }
  }

  const selected = worldClimateLocations.find((l) => l.id === climateLocationId)

  return (
    <div className="space-y-2">
      <div className="relative rounded-md bg-white p-1">
        <img
          src={MAP_SRC}
          alt="Weltkarte der thermischen Klimazonen"
          className={`block w-full h-auto select-none ${ready ? 'cursor-crosshair' : 'cursor-wait'}`}
          draggable={false}
          onClick={handleClick}
        />
        {marker && (
          <span
            className="pointer-events-none absolute block rounded-full"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              width: 14,
              height: 14,
              transform: 'translate(-50%, -50%)',
              border: '2.5px solid #dc2626',
              boxShadow: '0 0 0 2px rgba(255,255,255,0.9)',
            }}
          />
        )}
      </div>

      {/* Legende = zugleich Auswahl */}
      <div className="flex flex-wrap gap-1.5">
        {worldClimateLocations.map((loc) => {
          const color = worldZoneColors.find((z) => z.id === loc.id)
          const isSelected = loc.id === climateLocationId
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => {
                setMiss(false)
                setMarker(null)
                setNestedParam('climateLocationId', loc.id)
              }}
              className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] transition-colors ${
                isSelected
                  ? 'border-primary bg-primary/10 font-semibold'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <span
                className="inline-block h-3 w-3 rounded-sm border border-black/20"
                style={{ background: color ? rgbCss(color.rgb) : undefined }}
              />
              {loc.name}
            </button>
          )
        })}
      </div>

      <div className="text-[10px] text-muted-foreground min-h-[1.4em]">
        {miss
          ? 'Keine Klimazone an dieser Stelle (Ozean / weiße Fläche) – bitte auf eine farbige Landfläche klicken.'
          : selected
            ? `${selected.name} · ${selected.regionName}`
            : 'Klimazone auf der Karte oder in der Legende wählen'}
      </div>

      <div className="text-[9px] text-muted-foreground/70">
        Kartengrundlage:{' '}
        <a
          href="https://jam-school.de/thermische-klimazonen-klimazonen-der-erde-%E2%80%A2-definition-und-ubersicht-%C2%B7-mit-video/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          jam-school.de – Thermische Klimazonen
        </a>
        {' · '}Monatsdaten: repräsentative Referenzdatensätze je Zone (Lehrzweck)
      </div>
    </div>
  )
}
