import { useTranslation } from 'react-i18next'
import { WindowInputs } from '@/components/inputs/WindowInputs'
import { useBuildingStore } from '@/store/buildingStore'
import { calculateBuildingAreas } from '@/calculation/areas'

export function WindowsTab() {
  const { t } = useTranslation()
  const params = useBuildingStore((s) => s.params)
  const { windows, envelope } = params

  const areas = calculateBuildingAreas(params)
  const {
    facadeNorth: facadeN, facadeEast: facadeE, facadeSouth: facadeS, facadeWest: facadeW,
    windowNorth: windowN, windowEast: windowE, windowSouth: windowS, windowWest: windowW,
    totalWindow,
  } = areas

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Inputs */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-sm mb-4">{t('tabs.windows')}</h3>
            <WindowInputs />
          </div>
        </div>

        {/* Right: Summary */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border p-4 space-y-2">
            <h3 className="font-semibold text-sm">{t('tabs.windowSummary')}</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-1">{t('tabs.facade')}</th>
                  <th className="text-right py-1">A<sub>f</sub> [m²]</th>
                  <th className="text-right py-1">A<sub>w</sub> [m²]</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-1">{t('tabs.north')}</td>
                  <td className="text-right">{facadeN.toFixed(1)}</td>
                  <td className="text-right">{windowN.toFixed(1)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1">{t('tabs.east')}</td>
                  <td className="text-right">{facadeE.toFixed(1)}</td>
                  <td className="text-right">{windowE.toFixed(1)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1">{t('tabs.south')}</td>
                  <td className="text-right">{facadeS.toFixed(1)}</td>
                  <td className="text-right">{windowS.toFixed(1)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1">{t('tabs.west')}</td>
                  <td className="text-right">{facadeW.toFixed(1)}</td>
                  <td className="text-right">{windowW.toFixed(1)}</td>
                </tr>
                <tr className="font-medium">
                  <td className="py-1">{t('tabs.total')}</td>
                  <td className="text-right">{areas.totalFacade.toFixed(1)}</td>
                  <td className="text-right">{totalWindow.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-border p-4 space-y-1">
            <h3 className="font-semibold text-sm">{t('tabs.glazingProperties')}</h3>
            <div className="text-xs space-y-1 text-muted-foreground">
              <div>g-{t('tabs.value')}: {(windows.gValue * 100).toFixed(0)}%</div>
              <div>U<sub>w</sub>: {envelope.window.toFixed(2)} W/(m²K)</div>
              <div>{t('windows.frameFraction')}: {(windows.frameFraction * 100).toFixed(0)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
