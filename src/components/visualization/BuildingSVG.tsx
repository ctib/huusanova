import { useBuildingStore } from '@/store/buildingStore'

// Map U-value to color (green=good, red=bad)
function uValueColor(u: number): string {
  const ratio = Math.min(u / 2.0, 1)
  const r = Math.round(ratio * 220 + 30)
  const g = Math.round((1 - ratio) * 200 + 30)
  const b = 50
  return `rgb(${r},${g},${b})`
}

export function BuildingSVG() {
  const params = useBuildingStore((s) => s.params)
  const results = useBuildingStore((s) => s.results)
  const seasonView = useBuildingStore((s) => s.seasonView)

  const { geometry, envelope, windows, cooling } = params

  // Scale: 1m = 20px
  const scale = 20
  const buildingW = geometry.length * scale
  const buildingH = geometry.height * geometry.stories * scale
  const roofH = 25
  const floorH = 8

  const svgW = buildingW + 160
  const svgH = buildingH + roofH + floorH + 80

  // Building position
  const bx = 80
  const by = 30 + roofH

  // Window dimensions per facade (front view shows south facade)
  const facadeW = buildingW
  const windowRatio = windows.ratios.south
  const windowW = facadeW * windowRatio * 0.6
  const windowH = buildingH * 0.4
  const windowX = bx + (facadeW - windowW) / 2
  const windowY = by + buildingH * 0.25

  // Heat flow arrow sizes (proportional to U×A)
  const wallLoss = envelope.wall * (geometry.length * geometry.height * geometry.stories)
  const roofLoss = envelope.roof * (geometry.length * geometry.width)
  const floorLoss = envelope.floor * (geometry.length * geometry.width)
  const windowLoss = envelope.window * (geometry.length * geometry.height * geometry.stories * windowRatio)

  const maxLoss = Math.max(wallLoss, roofLoss, floorLoss, windowLoss, 1)
  const arrowScale = (loss: number) => Math.max(3, (loss / maxLoss) * 20)

  // Solar gain for month index (Jan=0 for winter, Jul=6 for summer)
  const monthIdx = seasonView === 'winter' ? 0 : 6

  // Get solar gains from results
  const solarGain = results?.monthlyResults[monthIdx]?.solarGain || 0
  const solarArrowSize = Math.max(3, Math.min(20, solarGain / 200))

  const showShading = seasonView === 'summer' && cooling.movableShadingFc < 1

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full max-w-lg"
      role="img"
      aria-label="Building cross-section visualization"
    >
      {/* Sky background */}
      <rect x={0} y={0} width={svgW} height={svgH} fill={seasonView === 'winter' ? '#e8f0fe' : '#fef9e7'} rx={4} />

      {/* Ground */}
      <rect x={0} y={by + buildingH + floorH} width={svgW} height={svgH - (by + buildingH + floorH)} fill="#8b7355" opacity={0.3} />

      {/* Floor slab */}
      <rect x={bx - 5} y={by + buildingH} width={buildingW + 10} height={floorH} fill={uValueColor(envelope.floor)} stroke="#555" strokeWidth={0.5} />

      {/* Walls */}
      <rect x={bx} y={by} width={buildingW} height={buildingH} fill={uValueColor(envelope.wall)} stroke="#555" strokeWidth={1} />

      {/* Roof */}
      <polygon
        points={`${bx - 5},${by} ${bx + buildingW / 2},${by - roofH} ${bx + buildingW + 5},${by}`}
        fill={uValueColor(envelope.roof)}
        stroke="#555"
        strokeWidth={1}
      />

      {/* Windows */}
      {windowRatio > 0 && (
        <>
          <rect
            x={windowX}
            y={windowY}
            width={windowW}
            height={windowH}
            fill="#b3d9ff"
            stroke="#4a90d9"
            strokeWidth={1.5}
            opacity={0.8}
          />
          {/* Window frame cross */}
          <line x1={windowX + windowW / 2} y1={windowY} x2={windowX + windowW / 2} y2={windowY + windowH} stroke="#4a90d9" strokeWidth={1} />
          <line x1={windowX} y1={windowY + windowH / 2} x2={windowX + windowW} y2={windowY + windowH / 2} stroke="#4a90d9" strokeWidth={1} />

          {/* Movable shading (summer) */}
          {showShading && (
            <>
              {Array.from({ length: Math.ceil(windowH / 6) }).map((_, i) => (
                <line
                  key={i}
                  x1={windowX - 2}
                  y1={windowY + i * 6}
                  x2={windowX + windowW + 2}
                  y2={windowY + i * 6}
                  stroke="#888"
                  strokeWidth={2}
                  opacity={0.5}
                />
              ))}
            </>
          )}
        </>
      )}

      {/* Story lines */}
      {Array.from({ length: geometry.stories - 1 }).map((_, i) => {
        const storyY = by + (i + 1) * geometry.height * scale
        return (
          <line
            key={i}
            x1={bx}
            y1={storyY}
            x2={bx + buildingW}
            y2={storyY}
            stroke="#555"
            strokeWidth={0.5}
            strokeDasharray="4 2"
          />
        )
      })}

      {/* Heat flow arrows */}
      {seasonView === 'winter' ? (
        <>
          {/* Transmission losses - red arrows outward */}
          {/* Left wall */}
          <Arrow
            x={bx} y={by + buildingH / 2}
            dx={-arrowScale(wallLoss)} dy={0}
            color="#ef4444" label={`${envelope.wall.toFixed(2)}`}
          />
          {/* Right wall */}
          <Arrow
            x={bx + buildingW} y={by + buildingH / 2}
            dx={arrowScale(wallLoss)} dy={0}
            color="#ef4444" label={`${envelope.wall.toFixed(2)}`}
          />
          {/* Roof */}
          <Arrow
            x={bx + buildingW / 2} y={by - roofH / 2}
            dx={0} dy={-arrowScale(roofLoss)}
            color="#ef4444" label={`${envelope.roof.toFixed(2)}`}
          />
          {/* Floor */}
          <Arrow
            x={bx + buildingW / 2} y={by + buildingH + floorH}
            dx={0} dy={arrowScale(floorLoss)}
            color="#ef4444" label={`${envelope.floor.toFixed(2)}`}
          />

          {/* Solar gains - yellow arrows inward through windows */}
          {windowRatio > 0 && (
            <Arrow
              x={windowX + windowW / 2} y={windowY - 5}
              dx={0} dy={-solarArrowSize}
              color="#eab308" label=""
              inward
            />
          )}
        </>
      ) : (
        <>
          {/* Summer: Solar loads inward */}
          {windowRatio > 0 && (
            <Arrow
              x={windowX + windowW / 2} y={windowY - 5}
              dx={0} dy={-solarArrowSize * (1 - (1 - cooling.movableShadingFc) * 0.7)}
              color="#f97316" label=""
              inward
            />
          )}

          {/* Heat removal - blue arrows outward */}
          <Arrow
            x={bx} y={by + buildingH / 2}
            dx={-arrowScale(wallLoss) * 0.5} dy={0}
            color="#3b82f6" label=""
          />
          <Arrow
            x={bx + buildingW} y={by + buildingH / 2}
            dx={arrowScale(wallLoss) * 0.5} dy={0}
            color="#3b82f6" label=""
          />
        </>
      )}

      {/* Dimensions */}
      {/* Width */}
      <line x1={bx} y1={by + buildingH + floorH + 20} x2={bx + buildingW} y2={by + buildingH + floorH + 20} stroke="#666" strokeWidth={0.5} />
      <line x1={bx} y1={by + buildingH + floorH + 15} x2={bx} y2={by + buildingH + floorH + 25} stroke="#666" strokeWidth={0.5} />
      <line x1={bx + buildingW} y1={by + buildingH + floorH + 15} x2={bx + buildingW} y2={by + buildingH + floorH + 25} stroke="#666" strokeWidth={0.5} />
      <text x={bx + buildingW / 2} y={by + buildingH + floorH + 32} textAnchor="middle" fontSize={9} fill="#666">
        {geometry.length.toFixed(1)} m
      </text>

      {/* Height */}
      <line x1={bx + buildingW + 25} y1={by} x2={bx + buildingW + 25} y2={by + buildingH} stroke="#666" strokeWidth={0.5} />
      <line x1={bx + buildingW + 20} y1={by} x2={bx + buildingW + 30} y2={by} stroke="#666" strokeWidth={0.5} />
      <line x1={bx + buildingW + 20} y1={by + buildingH} x2={bx + buildingW + 30} y2={by + buildingH} stroke="#666" strokeWidth={0.5} />
      <text x={bx + buildingW + 38} y={by + buildingH / 2 + 3} textAnchor="start" fontSize={9} fill="#666">
        {(geometry.height * geometry.stories).toFixed(1)} m
      </text>

      {/* U-value legend */}
      <text x={5} y={svgH - 5} fontSize={7} fill="#888">
        U-Wert Farbskala: grün = gut, rot = schlecht
      </text>
    </svg>
  )
}

interface ArrowProps {
  x: number
  y: number
  dx: number
  dy: number
  color: string
  label: string
  inward?: boolean
}

function Arrow({ x, y, dx, dy, color, label, inward }: ArrowProps) {
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len < 2) return null

  const endX = inward ? x : x + dx
  const endY = inward ? y : y + dy
  const startX = inward ? x + dx : x
  const startY = inward ? y + dy : y

  // Arrowhead
  const angle = Math.atan2(endY - startY, endX - startX)
  const headLen = 5
  const ax1 = endX - headLen * Math.cos(angle - 0.4)
  const ay1 = endY - headLen * Math.sin(angle - 0.4)
  const ax2 = endX - headLen * Math.cos(angle + 0.4)
  const ay2 = endY - headLen * Math.sin(angle + 0.4)

  return (
    <g>
      <line x1={startX} y1={startY} x2={endX} y2={endY} stroke={color} strokeWidth={Math.max(1.5, len / 5)} opacity={0.7} />
      <polygon points={`${endX},${endY} ${ax1},${ay1} ${ax2},${ay2}`} fill={color} opacity={0.7} />
      {label && (
        <text x={endX + (dx > 0 ? 5 : -5)} y={endY + (dy > 0 ? 12 : -5)} textAnchor={dx > 0 ? 'start' : 'end'} fontSize={7} fill={color} fontWeight="bold">
          {label}
        </text>
      )}
    </g>
  )
}
