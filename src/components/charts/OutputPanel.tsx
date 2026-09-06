import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MonthlyBalanceChart } from './MonthlyBalanceChart'
import { SankeyDiagram } from './SankeyDiagram'
import { EnergyScaleChart } from './EnergyScaleChart'

export function OutputPanel() {
  const { t } = useTranslation()
  const results = useBuildingStore((s) => s.results)

  if (!results) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Berechnung läuft...
      </div>
    )
  }

  return (
    <div className="p-3 space-y-3">
      {/* Key metrics card */}
      <div className="rounded-lg border border-border p-3 space-y-2 bg-card">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">{t('output.heatingDemand')}</div>
            <div className="text-lg font-bold text-red-500">
              {results.specificHeatingDemand.toFixed(1)}
              <span className="text-xs font-normal ml-1">{t('units.kwhm2a')}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {results.totals.heatingDemand.toFixed(0)} {t('units.kwha')}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">{t('output.coolingDemand')}</div>
            <div className="text-lg font-bold text-cyan-500">
              {results.specificCoolingDemand.toFixed(1)}
              <span className="text-xs font-normal ml-1">{t('units.kwhm2a')}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {results.totals.coolingDemand.toFixed(0)} {t('units.kwha')}
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-1 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">{t('output.energyClass')}: </span>
            <span className="text-sm font-bold">{results.energyClass}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">{t('output.htValue')}: </span>
            <span className="text-sm font-bold">{results.htPrime.toFixed(2)} {t('units.wm2k')}</span>
          </div>
        </div>
      </div>

      {/* Chart tabs */}
      <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="monthly">{t('output.monthlyBalance')}</TabsTrigger>
          <TabsTrigger value="sankey">{t('output.energyFlow')}</TabsTrigger>
          <TabsTrigger value="scale">{t('output.energyScale')}</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <MonthlyBalanceChart />
        </TabsContent>
        <TabsContent value="sankey">
          <SankeyDiagram />
        </TabsContent>
        <TabsContent value="scale">
          <EnergyScaleChart />
        </TabsContent>
      </Tabs>
    </div>
  )
}
