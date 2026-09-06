import { useTranslation } from 'react-i18next'
import { EnvelopeInputs } from '@/components/inputs/EnvelopeInputs'
import { ThermalMassSelector } from '@/components/inputs/ThermalMassSelector'
import { useBuildingStore } from '@/store/buildingStore'
import { calculateBuildingAreas, calculateHeatLossComponents } from '@/calculation/areas'
import type { HeatLossComponent } from '@/calculation/areas'

const COMPONENT_LABEL: Record<HeatLossComponent['id'], string> = {
  wall: 'opaque.compWall',
  window: 'opaque.compWindow',
  roof: 'opaque.compRoof',
  ceiling: 'opaque.compCeiling',
  basementWall: 'opaque.compBasementWall',
  floor: 'opaque.compFloor',
  thermalBridge: 'opaque.compThermalBridge',
}

export function OpaqueTab() {
  const { t } = useTranslation()
  const params = useBuildingStore((s) => s.params)

  const areas = calculateBuildingAreas(params)
  const components = calculateHeatLossComponents(params, areas)
  const htTotal = components.reduce((sum, c) => sum + c.ht, 0)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-sm mb-4">{t('tabs.opaque')}</h3>
            <EnvelopeInputs />
          </div>

          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">{t('envelope.thermalMass')}</h3>
            <ThermalMassSelector />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border p-4 space-y-2">
            <h3 className="font-semibold text-sm">{t('tabs.areaSummary')}</h3>
            <table className="w-full text-xs">
              <tbody>
                {areas.roofArea > 0 && (
                  <tr className="border-b border-border/50">
                    <td className="py-1.5">{t('tabs.roofArea')}</td>
                    <td className="text-right font-medium">{areas.roofArea.toFixed(1)} m²</td>
                  </tr>
                )}
                {areas.ceilingArea > 0 && (
                  <tr className="border-b border-border/50">
                    <td className="py-1.5">{t('opaque.compCeiling')}</td>
                    <td className="text-right font-medium">{areas.ceilingArea.toFixed(1)} m²</td>
                  </tr>
                )}
                <tr className="border-b border-border/50">
                  <td className="py-1.5">{t('tabs.floorArea')}</td>
                  <td className="text-right font-medium">{areas.floorSlabArea.toFixed(1)} m²</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5">{t('tabs.opaqueWall')}</td>
                  <td className="text-right font-medium">{areas.totalOpaqueWall.toFixed(1)} m²</td>
                </tr>
                {areas.basementWallArea > 0 && (
                  <tr className="border-b border-border/50">
                    <td className="py-1.5">{t('opaque.compBasementWall')}</td>
                    <td className="text-right font-medium">{areas.basementWallArea.toFixed(1)} m²</td>
                  </tr>
                )}
                <tr className="border-b border-border/50">
                  <td className="py-1.5">{t('tabs.windowArea')}</td>
                  <td className="text-right font-medium">{areas.totalWindow.toFixed(1)} m²</td>
                </tr>
                <tr className="font-medium">
                  <td className="py-1.5">{t('tabs.envelopeArea')}</td>
                  <td className="text-right">{areas.envelopeArea.toFixed(1)} m²</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-border p-4 space-y-2">
            <h3 className="font-semibold text-sm">{t('tabs.heatLossCoeff')}</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-1 font-normal">{t('opaque.component')}</th>
                  <th className="text-right py-1 font-normal">F<sub>x</sub></th>
                  <th className="text-right py-1 font-normal">H<sub>T</sub></th>
                </tr>
              </thead>
              <tbody>
                {components.map((comp) => (
                  <tr key={comp.id} className="border-b border-border/50">
                    <td className="py-1">{t(COMPONENT_LABEL[comp.id])}</td>
                    <td className="text-right tabular-nums">
                      {comp.correctionFactor === 1
                        ? <span className="opacity-40">1,0</span>
                        : <span className="text-amber-600 dark:text-amber-500 font-medium">
                            {comp.correctionFactor.toFixed(1).replace('.', ',')}
                          </span>}
                    </td>
                    <td className="text-right tabular-nums">{comp.ht.toFixed(1)} W/K</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td className="py-1">H<sub>T</sub></td>
                  <td />
                  <td className="text-right tabular-nums">{htTotal.toFixed(1)} W/K</td>
                </tr>
              </tbody>
            </table>
            <p className="text-[10px] text-muted-foreground leading-snug pt-1">
              {t('opaque.correctionHint')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
