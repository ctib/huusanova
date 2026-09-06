import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import { IsometricBuilding } from '@/components/visualization/IsometricBuilding'
import { calculateBuildingAreas } from '@/calculation/areas'
import type { RoofType } from '@/calculation/types'

const ROOF_TYPES: { id: RoofType; de: string; en: string }[] = [
  { id: 'gable', de: 'Satteldach', en: 'Gable' },
  { id: 'hip', de: 'Walmdach', en: 'Hip' },
  { id: 'flat', de: 'Flachdach', en: 'Flat' },
  { id: 'shed', de: 'Pultdach', en: 'Shed' },
]

export function GeometryTab() {
  const { t, i18n } = useTranslation()
  const params = useBuildingStore((s) => s.params)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)
  const { geometry, plotArea } = params
  const lang = i18n.language

  const areas = calculateBuildingAreas(params)
  const avRatio = areas.envelopeArea / areas.heatedVolume

  // Referenzwerte fuer die Kompaktheit gleicher Kubatur
  const avSphere = 3 / Math.cbrt((3 * areas.heatedVolume) / (4 * Math.PI))
  const avCube = 6 / Math.cbrt(areas.heatedVolume)

  // Staedtebauliche Kennwerte (BauNVO): GRZ = ueberbaute Flaeche / Grundstueck,
  // GFZ = Geschossflaeche / Grundstueck
  const grz = plotArea > 0 ? areas.footprint / plotArea : null
  const gfz = plotArea > 0 ? areas.grossFloorArea / plotArea : null

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Isometric view - 7 cols */}
        <div className="lg:col-span-7 rounded-lg border border-border p-4 flex items-center justify-center min-h-[420px]">
          <IsometricBuilding />
        </div>

        {/* Right panels - 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          {/* Roof type */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">{t('geometry.roofType')}</h3>
            <div className="grid grid-cols-4 gap-1.5">
              {ROOF_TYPES.map((rt) => (
                <button key={rt.id}
                  onClick={() => setNestedParam('geometry.roofType', rt.id)}
                  className={`text-xs py-1.5 px-2 rounded-md border transition-colors ${
                    geometry.roofType === rt.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-accent'
                  }`}>
                  {lang === 'de' ? rt.de : rt.en}
                </button>
              ))}
            </div>
            {geometry.roofType !== 'flat' && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">{t('geometry.roofPitch')}</span>
                <input type="range" min={10} max={55} step={1} value={geometry.roofPitch}
                  onChange={(e) => setNestedParam('geometry.roofPitch', parseInt(e.target.value))}
                  className="flex-1 h-1.5 accent-primary" />
                <span className="font-medium w-8 text-right">{geometry.roofPitch}°</span>
              </div>
            )}
          </div>

          {/* Basement & zones */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">{t('geometry.zones')}</h3>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input type="checkbox" checked={geometry.hasBasement}
                onChange={(e) => setNestedParam('geometry.hasBasement', e.target.checked)}
                className="rounded border-input" />
              {t('geometry.hasBasement')}
            </label>
            {geometry.hasBasement && (
              <label className="flex items-center gap-2 text-xs cursor-pointer ml-4">
                <input type="checkbox" checked={geometry.basementHeated}
                  onChange={(e) => setNestedParam('geometry.basementHeated', e.target.checked)}
                  className="rounded border-input" />
                {t('geometry.basementHeated')}
              </label>
            )}
            {geometry.roofType !== 'flat' && (
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" checked={geometry.atticHeated}
                  onChange={(e) => setNestedParam('geometry.atticHeated', e.target.checked)}
                  className="rounded border-input" />
                {t('geometry.atticHeated')}
              </label>
            )}
            <p className="text-[10px] text-muted-foreground leading-snug">
              {t('geometry.zonesHint')}
            </p>
          </div>

          {/* A/V ratio thermometer */}
          <div className="rounded-lg border border-border p-4 space-y-2">
            <h3 className="font-semibold text-sm">{t('geometry.avRatio')}</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-between px-2 text-[9px] font-medium text-white mix-blend-difference">
                <span>0.2</span><span>0.5</span><span>0.8</span><span>1.2</span>
              </div>
              <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md"
                style={{ left: `${Math.min(100, Math.max(0, ((avRatio - 0.2) / 1.0) * 100))}%` }}>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                  {avRatio.toFixed(2)} m⁻¹
                </div>
              </div>
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
              <span>⬤ {lang === 'de' ? 'Kugel' : 'Sphere'}: {avSphere.toFixed(2)}</span>
              <span>⬛ {lang === 'de' ? 'Würfel' : 'Cube'}: {avCube.toFixed(2)}</span>
              <span>▬ {lang === 'de' ? 'Ist' : 'Actual'}: {avRatio.toFixed(2)}</span>
            </div>
          </div>

          {/* Derived values */}
          <div className="rounded-lg border border-border p-4 space-y-2">
            <h3 className="font-semibold text-sm">{t('tabs.derivedValues')}</h3>
            <div className="space-y-1 text-xs">
              <Row label={t('geometry.grossFloorArea')} value={`${areas.grossFloorArea.toFixed(1)} m²`} sub="BGF" />
              <Row label={t('tabs.netFloorArea')} value={`${areas.netFloorArea.toFixed(1)} m²`} sub="A_N" />
              <Row label={t('tabs.volume')} value={`${areas.heatedVolume.toFixed(1)} m³`} sub="V_e" />
              <Row label={t('tabs.envelopeArea')} value={`${areas.envelopeArea.toFixed(1)} m²`} sub="A_E" />
              <Row label={t('tabs.totalHeight')} value={`${(areas.totalHeight + areas.roofRise).toFixed(1)} m`} />
            </div>
          </div>

          {/* Plot area / urban density figures */}
          <div className="rounded-lg border border-border p-4 space-y-2">
            <h3 className="font-semibold text-sm">{t('geometry.plot')}</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground flex-1">{t('geometry.plotArea')}</span>
              <input type="number" min={0} max={100000} step={10} value={plotArea || ''}
                placeholder="—"
                onChange={(e) => setNestedParam('plotArea', parseFloat(e.target.value) || 0)}
                className="w-24 text-right rounded border border-input bg-background px-2 py-1" />
              <span className="text-muted-foreground w-6">m²</span>
            </div>
            {grz !== null && gfz !== null ? (
              <div className="space-y-1 text-xs pt-1">
                <Row label="GRZ" value={grz.toFixed(2)} sub={t('geometry.grzHint')} />
                <Row label="GFZ" value={gfz.toFixed(2)} sub={t('geometry.gfzHint')} />
              </div>
            ) : (
              <p className="text-[10px] text-muted-foreground">{t('geometry.plotHint')}</p>
            )}
          </div>

          {/* Facade areas */}
          <div className="rounded-lg border border-border p-4 space-y-2">
            <h3 className="font-semibold text-sm">{t('tabs.facadeAreas')}</h3>
            <div className="space-y-1 text-xs">
              <Row label={`${t('tabs.north')} / ${t('tabs.south')}`} value={`${areas.facadeNorth.toFixed(1)} m²`} />
              <Row label={`${t('tabs.east')} / ${t('tabs.west')}`} value={`${areas.facadeEast.toFixed(1)} m²`} />
              <Row label={t('tabs.total')} value={`${areas.totalFacade.toFixed(1)} m²`} bold />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, bold, sub }: { label: string; value: string; bold?: boolean; sub?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">
        {label}
        {sub && <span className="text-[10px] ml-1 opacity-60">({sub})</span>}
      </span>
      <span className={bold ? 'font-semibold' : 'font-medium'}>{value}</span>
    </div>
  )
}
