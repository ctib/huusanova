import { useTranslation } from 'react-i18next'
import { Download, AlertTriangle } from 'lucide-react'
import { useBuildingStore } from '@/store/buildingStore'
import { MonthlyBalanceChart } from '@/components/charts/MonthlyBalanceChart'
import { SankeyDiagram } from '@/components/charts/SankeyDiagram'
import { EnergyScaleChart } from '@/components/charts/EnergyScaleChart'
import { BuildingVisualization } from '@/components/visualization/BuildingVisualization'
import { getClimateLocationById } from '@/data/climateData'
import { monthlyBalanceToCsv, downloadCsv } from '@/lib/csvExport'

export function ResultsTab() {
  const { t } = useTranslation()
  const results = useBuildingStore((s) => s.results)
  const climateLocationId = useBuildingStore((s) => s.params.climateLocationId)

  if (!results) return <div className="p-8 text-muted-foreground">Berechnung...</div>

  const pe = results.primaryEnergy

  const handleExport = () => {
    const climate = getClimateLocationById(climateLocationId)
    if (!climate) return
    const months = t('chart.months', { returnObjects: true }) as string[]
    const csv = monthlyBalanceToCsv(results, climate, months)
    downloadCsv(`HUUSanova_Monatsbilanz_${climate.id}.csv`, csv)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Bewusst oberhalb der Kennzahlen: der Hinweis soll gelesen werden,
          bevor jemand die Zahlen weiterverwendet. */}
      <div
        role="note"
        className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/20"
      >
        <AlertTriangle className="mt-0.5 w-4 h-4 shrink-0 text-amber-600 dark:text-amber-500" />
        <p className="text-amber-900 dark:text-amber-200">
          <span className="font-semibold">{t('output.disclaimerTitle')}</span>{' '}
          {t('output.disclaimerBody')}
        </p>
      </div>

      {/* Key metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <MetricCard
          label={t('output.heatingDemand')}
          value={results.specificHeatingDemand.toFixed(1)}
          unit="kWh/(m²a)"
          subValue={`${results.totals.heatingDemand.toFixed(0)} kWh/a`}
          color="text-red-500"
        />
        <MetricCard
          label={t('output.coolingDemand')}
          value={results.specificCoolingDemand.toFixed(1)}
          unit="kWh/(m²a)"
          subValue={`${results.totals.coolingDemand.toFixed(0)} kWh/a`}
          color="text-cyan-500"
        />
        <MetricCard
          label={t('output.primaryEnergy')}
          value={pe.specificPrimaryEnergy.toFixed(1)}
          unit="kWh/(m²a)"
          subValue={`${pe.primaryEnergyNet.toFixed(0)} kWh/a`}
          color="text-purple-500"
        />
        <MetricCard
          label={t('output.finalEnergy')}
          value={(pe.finalEnergyTotal / results.netFloorArea).toFixed(1)}
          unit="kWh/(m²a)"
          subValue={`${pe.finalEnergyTotal.toFixed(0)} kWh/a`}
          color="text-orange-500"
        />
        <MetricCard
          label={t('output.energyClass')}
          value={results.energyClass}
          unit=""
          color="text-green-600"
          large
        />
        <MetricCard
          label={t('output.htValue')}
          value={results.htPrime.toFixed(2)}
          unit="W/(m²K)"
          color="text-blue-500"
        />
      </div>

      {/* PV info if installed */}
      {pe.pvYield > 0 && (
        <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-3 flex items-center gap-4 text-sm">
          <span className="font-medium text-green-700 dark:text-green-400">PV</span>
          <span>{t('output.pvYield')}: {pe.pvYield.toFixed(0)} kWh/a</span>
          <span>{t('output.pvCredit')}: -{pe.pvCredit.toFixed(0)} kWh/a ({t('output.primaryEnergy')})</span>
        </div>
      )}

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Balance */}
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">{t('output.monthlyBalance')}</h3>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md border border-input hover:bg-accent transition-colors"
              title={t('output.exportCsvTitle')}
            >
              <Download className="w-3.5 h-3.5" />
              {t('output.exportCsv')}
            </button>
          </div>
          <MonthlyBalanceChart />
        </div>

        {/* Sankey */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold text-sm mb-3">{t('output.energyFlow')}</h3>
          <SankeyDiagram />
        </div>

        {/* Energy Scale */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold text-sm mb-3">{t('output.energyScale')}</h3>
          <EnergyScaleChart />
          {/* Die Skala sieht einem echten Energieausweis am aehnlichsten und
              wird am ehesten dafuer gehalten - daher hier noch einmal. */}
          <p className="mt-3 text-[11px] text-muted-foreground">
            {t('output.energyScaleNote')}
          </p>
        </div>

        {/* Building Visualization */}
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold text-sm mb-3">{t('tabs.buildingView')}</h3>
          <BuildingVisualization />
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, unit, subValue, color, large }: {
  label: string
  value: string
  unit: string
  subValue?: string
  color: string
  large?: boolean
}) {
  return (
    <div className="rounded-lg border border-border p-3 bg-card">
      <div className="text-xs text-muted-foreground truncate">{label}</div>
      <div className={`${large ? 'text-3xl' : 'text-xl'} font-bold ${color} mt-1`}>
        {value}
        {unit && <span className="text-xs font-normal text-muted-foreground ml-1">{unit}</span>}
      </div>
      {subValue && <div className="text-xs text-muted-foreground mt-0.5">{subValue}</div>}
    </div>
  )
}
