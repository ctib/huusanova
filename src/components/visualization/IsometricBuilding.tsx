import { useCallback, useMemo } from 'react'
import { useBuildingStore } from '@/store/buildingStore'
import { useTranslation } from 'react-i18next'
import { roofHeight, BASEMENT_HEIGHT_FACTOR } from '@/calculation/areas'

const COS30 = Math.cos(Math.PI / 6)
const SIN30 = Math.sin(Math.PI / 6)

const VIEW_W = 500
const VIEW_H = 450

const WALL_FRONT = '#d4dce8'
const WALL_SIDE = '#b8c5d6'
const WALL_TOP = '#e2e8f0'
const BASEMENT_FRONT = '#c8cdd5'
const BASEMENT_SIDE = '#a8b0bc'
const ROOF_LEFT = '#c7a882'
const ROOF_RIGHT = '#b8956e'
const ROOF_GABLE = '#a8845a'
// Unbeheizter Dachraum: entsaettigt und kuehler, analog zum unbeheizten Keller
const ROOF_LEFT_COLD = '#b9bcc2'
const ROOF_RIGHT_COLD = '#a6aab1'
const ROOF_GABLE_COLD = '#979ba3'
const DIM_COLOR = '#64748b'
const DIM_BG = '#ffffff'

function iso(x: number, y: number, z: number, cx: number, cy: number, s: number): [number, number] {
  return [cx + (x - y) * COS30 * s, cy - (x + y) * SIN30 * s - z * s]
}

function pt(c: [number, number]) { return `${c[0]},${c[1]}` }

function InlineInput({ x, y, width, value, unit, decimals, min, max, step, onChange, anchor = 'middle' }: {
  x: number; y: number; width: number; value: number; unit: string
  decimals: number; min: number; max: number; step: number
  onChange: (v: number) => void; anchor?: 'start' | 'middle' | 'end'
}) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    if (!isNaN(val)) onChange(Math.min(max, Math.max(min, val)))
  }, [onChange, min, max])

  const foX = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x

  return (
    <foreignObject x={foX} y={y - 10} width={width} height={20}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: anchor === 'middle' ? 'center' : anchor === 'end' ? 'flex-end' : 'flex-start', height: '100%', gap: '1px' }}>
        <input type="number" value={value.toFixed(decimals)} onChange={handleChange}
          min={min} max={max} step={step}
          style={{ width: `${Math.max(30, width - 18)}px`, fontSize: '11px', fontFamily: 'system-ui', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '3px', padding: '0 3px', height: '18px', background: DIM_BG, color: '#334155', outline: 'none' }} />
        <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'system-ui', whiteSpace: 'nowrap' }}>{unit}</span>
      </div>
    </foreignObject>
  )
}

export function IsometricBuilding() {
  const { t } = useTranslation()
  const geometry = useBuildingStore((s) => s.params.geometry)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  const { length, width, height, stories, rotation, roofType, roofPitch, hasBasement, basementHeated, atticHeated } = geometry
  const totalHeight = height * stories
  const basementDepth = hasBasement ? height * BASEMENT_HEIGHT_FACTOR : 0

  // Flachdach bildet keinen Dachraum aus - der Schalter ist dann wirkungslos
  const atticIsHeated = roofType === 'flat' || atticHeated

  const roofH = useMemo(
    () => roofHeight({ roofType, roofPitch, width }),
    [roofType, roofPitch, width]
  )

  const scale = useMemo(() => {
    const totalH = totalHeight + roofH + basementDepth
    const isoW = (length + width) * COS30
    const isoH = (length + width) * SIN30 + totalH
    return Math.min((VIEW_W * 0.50) / isoW, (VIEW_H * 0.45) / isoH, 20)
  }, [length, width, totalHeight, roofH, basementDepth])

  const cx = VIEW_W / 2 + 10
  const cy = VIEW_H * 0.52 + basementDepth * scale * 0.3

  const c = useCallback((x: number, y: number, z: number) => iso(x, y, z, cx, cy, scale), [cx, cy, scale])

  // Building corners
  const corners = useMemo(() => ({
    b_00: c(0, 0, -basementDepth), b_L0: c(length, 0, -basementDepth),
    b_LW: c(length, width, -basementDepth), b_0W: c(0, width, -basementDepth),
    g_00: c(0, 0, 0), g_L0: c(length, 0, 0),
    g_LW: c(length, width, 0), g_0W: c(0, width, 0),
    t_00: c(0, 0, totalHeight), t_L0: c(length, 0, totalHeight),
    t_LW: c(length, width, totalHeight), t_0W: c(0, width, totalHeight),
  }), [c, length, width, totalHeight, basementDepth])

  // Roof vertices depend on type
  const roof = useMemo(() => {
    const base = { t_00: corners.t_00, t_L0: corners.t_L0, t_LW: corners.t_LW, t_0W: corners.t_0W }
    if (roofType === 'flat') return { type: 'flat' as const, ...base }
    if (roofType === 'gable') {
      return {
        type: 'gable' as const, ...base,
        r_0: c(0, width / 2, totalHeight + roofH),
        r_L: c(length, width / 2, totalHeight + roofH),
      }
    }
    if (roofType === 'hip') {
      const inset = Math.min(length / 2, width / 2 * (roofH / (roofH || 1)))
      const ridgeLen = Math.max(0, length - 2 * inset)
      return {
        type: 'hip' as const, ...base,
        r_0: c(inset, width / 2, totalHeight + roofH),
        r_L: c(length - inset, width / 2, totalHeight + roofH),
        ridgeLen,
      }
    }
    // shed
    return {
      type: 'shed' as const, ...base,
      s_00: c(0, 0, totalHeight + roofH),
      s_L0: c(length, 0, totalHeight + roofH),
    }
  }, [c, corners, roofType, roofH, totalHeight, length, width])

  // Story lines
  const storyLines = useMemo(() => {
    const lines: [number, number, number, number][] = []
    const startFloor = hasBasement ? -1 : 1
    for (let i = startFloor; i <= stories; i++) {
      if (i === 0) continue
      const z = i < 0 ? i * height * 0.8 : i === stories ? totalHeight : height * i
      if (i === stories) continue
      const a = c(0, 0, z), b = c(length, 0, z), d = c(length, width, z)
      lines.push([a[0], a[1], b[0], b[1]])
      lines.push([b[0], b[1], d[0], d[1]])
    }
    return lines
  }, [c, hasBasement, height, stories, totalHeight, length, width])

  // Ground line (z=0) when basement exists
  const groundLine = useMemo(() => {
    if (!hasBasement) return null
    const a = c(0, 0, 0), b = c(length, 0, 0), d = c(length, width, 0)
    return { front: [a, b] as [[number, number], [number, number]], side: [b, d] as [[number, number], [number, number]] }
  }, [c, hasBasement, length, width])

  // Dimension points
  const dimPts = useMemo(() => {
    const off = 18
    const ls = c(0, 0, -basementDepth), le = c(length, 0, -basementDepth)
    const ws = c(length, 0, -basementDepth), we = c(length, width, -basementDepth)
    const hs = c(0, 0, -basementDepth), he = c(0, 0, totalHeight)
    return {
      len: { s: [ls[0], ls[1] + off], e: [le[0], le[1] + off], m: [(ls[0] + le[0]) / 2, (ls[1] + le[1]) / 2 + off] },
      wid: { s: [ws[0], ws[1] + off], e: [we[0], we[1] + off], m: [(ws[0] + we[0]) / 2, (we[1] + ws[1]) / 2 + off] },
      hei: { s: [hs[0] - off, hs[1]], e: [he[0] - off, he[1]], m: [(hs[0] + he[0]) / 2 - off, (hs[1] + he[1]) / 2] },
    }
  }, [c, length, width, totalHeight, basementDepth])

  // Compass on ground plane
  const compassR = 1.8
  const compassPos = useMemo(() => {
    const ccx = -3
    const ccy = width + 3
    const center = c(ccx, ccy, 0)
    const radRot = (rotation * Math.PI) / 180
    const nTip = c(ccx + Math.sin(radRot) * compassR, ccy - Math.cos(radRot) * compassR, 0)
    const sTip = c(ccx - Math.sin(radRot) * compassR, ccy + Math.cos(radRot) * compassR, 0)
    const eTip = c(ccx + Math.cos(radRot) * compassR, ccy + Math.sin(radRot) * compassR, 0)
    const wTip = c(ccx - Math.cos(radRot) * compassR, ccy - Math.sin(radRot) * compassR, 0)
    const nLabel = c(ccx + Math.sin(radRot) * (compassR + 1), ccy - Math.cos(radRot) * (compassR + 1), 0)
    return { center, nTip, sTip, eTip, wTip, nLabel }
  }, [c, rotation, width, compassR])

  function renderRoof() {
    // Beheizter Dachraum: Dachhaut ist Huellflaeche -> warme Ziegelfarben.
    // Unbeheizter Dachraum: liegt ausserhalb der beheizten Zone -> ausgegraut.
    const slopeL = atticIsHeated ? ROOF_LEFT : ROOF_LEFT_COLD
    const slopeR = atticIsHeated ? ROOF_RIGHT : ROOF_RIGHT_COLD
    const gableFill = atticIsHeated ? ROOF_GABLE : ROOF_GABLE_COLD
    const frontFill = atticIsHeated ? WALL_FRONT : BASEMENT_FRONT
    const edge = atticIsHeated ? '#8b7355' : '#94a3b8'
    const ridgeColor = atticIsHeated ? '#7c6a4f' : '#8a9099'

    if (roof.type === 'flat') {
      return <polygon points={`${pt(roof.t_00)} ${pt(roof.t_L0)} ${pt(roof.t_LW)} ${pt(roof.t_0W)}`}
        fill={WALL_TOP} stroke="#94a3b8" strokeWidth={0.8} />
    }
    if (roof.type === 'gable') {
      return (<>
        {/* Front slope (y=0 to ridge) */}
        <polygon points={`${pt(roof.t_00)} ${pt(roof.t_L0)} ${pt(roof.r_L)} ${pt(roof.r_0)}`}
          fill={slopeL} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" />
        {/* Back slope (ridge to y=width) */}
        <polygon points={`${pt(roof.t_0W)} ${pt(roof.t_LW)} ${pt(roof.r_L)} ${pt(roof.r_0)}`}
          fill={slopeR} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" />
        {/* Front gable (x=0) */}
        <polygon points={`${pt(roof.t_00)} ${pt(roof.t_0W)} ${pt(roof.r_0)}`}
          fill={frontFill} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" opacity={0.85} />
        {/* Back gable (x=length) */}
        <polygon points={`${pt(roof.t_L0)} ${pt(roof.t_LW)} ${pt(roof.r_L)}`}
          fill={gableFill} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" />
        {/* Ridge */}
        <line x1={roof.r_0[0]} y1={roof.r_0[1]} x2={roof.r_L[0]} y2={roof.r_L[1]}
          stroke={ridgeColor} strokeWidth={1.2} />
      </>)
    }
    if (roof.type === 'hip') {
      return (<>
        {/* Front slope */}
        <polygon points={`${pt(roof.t_00)} ${pt(roof.t_L0)} ${pt(roof.r_L)} ${pt(roof.r_0)}`}
          fill={slopeL} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" />
        {/* Back slope */}
        <polygon points={`${pt(roof.t_0W)} ${pt(roof.t_LW)} ${pt(roof.r_L)} ${pt(roof.r_0)}`}
          fill={slopeR} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" />
        {/* Left hip (x=0) */}
        <polygon points={`${pt(roof.t_00)} ${pt(roof.t_0W)} ${pt(roof.r_0)}`}
          fill={slopeL} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" opacity={0.9} />
        {/* Right hip (x=length) */}
        <polygon points={`${pt(roof.t_L0)} ${pt(roof.t_LW)} ${pt(roof.r_L)}`}
          fill={gableFill} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" />
        {/* Ridge */}
        {roof.ridgeLen > 0 && (
          <line x1={roof.r_0[0]} y1={roof.r_0[1]} x2={roof.r_L[0]} y2={roof.r_L[1]}
            stroke={ridgeColor} strokeWidth={1.2} />
        )}
      </>)
    }
    // shed
    return (<>
      {/* Front face (y=0, higher side) */}
      <polygon points={`${pt(roof.t_00)} ${pt(roof.t_L0)} ${pt(roof.s_L0)} ${pt(roof.s_00)}`}
        fill={frontFill} stroke="#94a3b8" strokeWidth={0.8} strokeLinejoin="round" opacity={0.7} />
      {/* Slope */}
      <polygon points={`${pt(roof.s_00)} ${pt(roof.s_L0)} ${pt(roof.t_LW)} ${pt(roof.t_0W)}`}
        fill={slopeL} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" />
      {/* Right triangle */}
      <polygon points={`${pt(roof.t_L0)} ${pt(roof.s_L0)} ${pt(roof.t_LW)}`}
        fill={gableFill} stroke={edge} strokeWidth={0.8} strokeLinejoin="round" />
    </>)
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} style={{ width: '100%', height: 'auto' }}
        role="img" aria-label="Isometric building visualization">
        <rect x={0} y={0} width={VIEW_W} height={VIEW_H} fill="#f8fafc" rx={6} />

        {/* Ground shadow */}
        <polygon points={`${pt(corners.g_00)} ${pt(corners.g_L0)} ${pt(corners.g_LW)} ${pt(corners.g_0W)}`}
          fill="currentColor" opacity={0.04} />

        {/* === BASEMENT === */}
        {hasBasement && (<>
          <polygon points={`${pt(corners.b_L0)} ${pt(corners.b_LW)} ${pt(corners.g_LW)} ${pt(corners.g_L0)}`}
            fill={basementHeated ? WALL_SIDE : BASEMENT_SIDE} stroke="#94a3b8" strokeWidth={0.8} strokeLinejoin="round" />
          <polygon points={`${pt(corners.b_00)} ${pt(corners.b_L0)} ${pt(corners.g_L0)} ${pt(corners.g_00)}`}
            fill={basementHeated ? WALL_FRONT : BASEMENT_FRONT} stroke="#94a3b8" strokeWidth={0.8} strokeLinejoin="round" />
          {!basementHeated && (<>
            <line x1={corners.b_00[0]} y1={corners.b_00[1]} x2={corners.g_L0[0]} y2={corners.g_L0[1]}
              stroke="#94a3b8" strokeWidth={0.3} strokeDasharray="3 3" opacity={0.4} />
            <line x1={corners.b_L0[0]} y1={corners.b_L0[1]} x2={corners.g_00[0]} y2={corners.g_00[1]}
              stroke="#94a3b8" strokeWidth={0.3} strokeDasharray="3 3" opacity={0.4} />
          </>)}
        </>)}

        {/* === BUILDING BODY === */}
        <polygon points={`${pt(corners.g_L0)} ${pt(corners.g_LW)} ${pt(corners.t_LW)} ${pt(corners.t_L0)}`}
          fill={WALL_SIDE} stroke="#94a3b8" strokeWidth={0.8} strokeLinejoin="round" />
        <polygon points={`${pt(corners.g_00)} ${pt(corners.g_L0)} ${pt(corners.t_L0)} ${pt(corners.t_00)}`}
          fill={WALL_FRONT} stroke="#94a3b8" strokeWidth={0.8} strokeLinejoin="round" />

        {/* Top face (visible for flat roof) */}
        {roofType === 'flat' && (
          <polygon points={`${pt(corners.t_00)} ${pt(corners.t_L0)} ${pt(corners.t_LW)} ${pt(corners.t_0W)}`}
            fill={WALL_TOP} stroke="#94a3b8" strokeWidth={0.5} strokeLinejoin="round" />
        )}

        {/* Ground line when basement */}
        {groundLine && (<>
          <line x1={groundLine.front[0][0]} y1={groundLine.front[0][1]} x2={groundLine.front[1][0]} y2={groundLine.front[1][1]}
            stroke="#64748b" strokeWidth={1.5} />
          <line x1={groundLine.side[0][0]} y1={groundLine.side[0][1]} x2={groundLine.side[1][0]} y2={groundLine.side[1][1]}
            stroke="#64748b" strokeWidth={1.5} />
        </>)}

        {/* Story lines */}
        {storyLines.map((l, i) => (
          <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]}
            stroke="#94a3b8" strokeWidth={0.6} strokeDasharray="4 3" />
        ))}

        {/* === ROOF === */}
        {renderRoof()}

        {/* Zonen-Marker fuer unbeheizte Bereiche */}
        {!atticIsHeated && (() => {
          const p = c(length / 2, width / 2, totalHeight + roofH * 0.45)
          return (
            <text x={p[0]} y={p[1]} textAnchor="middle" fontSize={8.5} fill="#475569"
              fontFamily="system-ui" style={{ pointerEvents: 'none' }}>
              {t('geometry.unheatedZone')}
            </text>
          )
        })()}
        {hasBasement && !basementHeated && (() => {
          const p = c(length / 2, 0, -basementDepth / 2)
          return (
            <text x={p[0]} y={p[1]} textAnchor="middle" fontSize={8.5} fill="#475569"
              fontFamily="system-ui" style={{ pointerEvents: 'none' }}>
              {t('geometry.unheatedZone')}
            </text>
          )
        })()}

        {/* === DIMENSION LINES === */}
        <defs>
          <marker id="arrS" markerWidth={6} markerHeight={6} refX={0} refY={3} orient="auto">
            <path d="M6,0 L0,3 L6,6" fill="none" stroke={DIM_COLOR} strokeWidth={0.8} />
          </marker>
          <marker id="arrE" markerWidth={6} markerHeight={6} refX={6} refY={3} orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke={DIM_COLOR} strokeWidth={0.8} />
          </marker>
        </defs>

        {/* Length */}
        <g>
          <line x1={dimPts.len.s[0]} y1={dimPts.len.s[1]} x2={dimPts.len.e[0]} y2={dimPts.len.e[1]}
            stroke={DIM_COLOR} strokeWidth={0.8} markerStart="url(#arrS)" markerEnd="url(#arrE)" />
          <text x={dimPts.len.m[0]} y={dimPts.len.m[1] - 3} textAnchor="middle" fontSize={9} fill={DIM_COLOR} fontFamily="system-ui">{t('geometry.length')}</text>
          <InlineInput x={dimPts.len.m[0]} y={dimPts.len.m[1] + 10} width={65} value={length} unit="m" decimals={1} min={5} max={30} step={0.5}
            onChange={(v) => setNestedParam('geometry.length', v)} />
        </g>

        {/* Width */}
        <g>
          <line x1={dimPts.wid.s[0]} y1={dimPts.wid.s[1]} x2={dimPts.wid.e[0]} y2={dimPts.wid.e[1]}
            stroke={DIM_COLOR} strokeWidth={0.8} markerStart="url(#arrS)" markerEnd="url(#arrE)" />
          <text x={dimPts.wid.m[0]} y={dimPts.wid.m[1] - 3} textAnchor="middle" fontSize={9} fill={DIM_COLOR} fontFamily="system-ui">{t('geometry.width')}</text>
          <InlineInput x={dimPts.wid.m[0]} y={dimPts.wid.m[1] + 10} width={65} value={width} unit="m" decimals={1} min={5} max={30} step={0.5}
            onChange={(v) => setNestedParam('geometry.width', v)} />
        </g>

        {/* Height */}
        <g>
          <line x1={dimPts.hei.s[0]} y1={dimPts.hei.s[1]} x2={dimPts.hei.e[0]} y2={dimPts.hei.e[1]}
            stroke={DIM_COLOR} strokeWidth={0.8} markerStart="url(#arrS)" markerEnd="url(#arrE)" />
          <text x={dimPts.hei.m[0] - 5} y={dimPts.hei.m[1] - 14} textAnchor="end" fontSize={9} fill={DIM_COLOR} fontFamily="system-ui">{t('geometry.height')}</text>
          <InlineInput x={dimPts.hei.m[0] - 37} y={dimPts.hei.m[1]} width={60} value={height} unit="m" decimals={1} min={2.2} max={4.0} step={0.1}
            onChange={(v) => setNestedParam('geometry.height', v)} anchor="end" />
        </g>

        {/* Stories label */}
        <g>
          <text x={corners.t_LW[0] + 12} y={corners.t_LW[1] + 15} textAnchor="start" fontSize={9} fill={DIM_COLOR} fontFamily="system-ui">{t('geometry.stories')}</text>
          <InlineInput x={corners.t_LW[0] + 12} y={corners.t_LW[1] + 28} width={50} value={stories} unit="" decimals={0} min={1} max={5} step={1}
            onChange={(v) => setNestedParam('geometry.stories', v)} anchor="start" />
        </g>

        {/* === COMPASS ON GROUND === */}
        <g>
          {/* Isometric ellipse approximation via projected points */}
          {(() => {
            const steps = 24
            const pts: string[] = []
            for (let i = 0; i < steps; i++) {
              const a = (i / steps) * Math.PI * 2
              const px = -3 + Math.cos(a) * compassR
              const py = width + 3 + Math.sin(a) * compassR
              const p = c(px, py, 0)
              pts.push(pt(p))
            }
            return <polygon points={pts.join(' ')} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={0.8} opacity={0.8} />
          })()}

          {/* N-S arrow */}
          <line x1={compassPos.sTip[0]} y1={compassPos.sTip[1]} x2={compassPos.nTip[0]} y2={compassPos.nTip[1]}
            stroke="#ef4444" strokeWidth={1.8} />
          <circle cx={compassPos.nTip[0]} cy={compassPos.nTip[1]} r={3} fill="#ef4444" />
          <text x={compassPos.nLabel[0]} y={compassPos.nLabel[1]} textAnchor="middle" fontSize={9} fill="#ef4444" fontWeight="bold" fontFamily="system-ui">N</text>

          {/* Center dot */}
          <circle cx={compassPos.center[0]} cy={compassPos.center[1]} r={1.5} fill="#475569" />
        </g>

        {/* Rotation input below compass */}
        <g>
          <text x={compassPos.center[0]} y={compassPos.center[1] + 22} textAnchor="middle" fontSize={9} fill={DIM_COLOR} fontFamily="system-ui">{t('geometry.rotation')}</text>
          <InlineInput x={compassPos.center[0]} y={compassPos.center[1] + 35} width={55} value={rotation} unit={t('units.degree')} decimals={0} min={0} max={359} step={1}
            onChange={(v) => setNestedParam('geometry.rotation', v)} />
          <foreignObject x={compassPos.center[0] - 30} y={compassPos.center[1] + 47} width={60} height={18}>
            <input type="range" min={0} max={359} step={1} value={rotation}
              onChange={(e) => setNestedParam('geometry.rotation', parseInt(e.target.value, 10))}
              style={{ width: '100%', height: '14px', cursor: 'pointer', accentColor: '#64748b' }} />
          </foreignObject>
        </g>
      </svg>
    </div>
  )
}
