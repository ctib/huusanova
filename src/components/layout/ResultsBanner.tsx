import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useBuildingStore } from '@/store/buildingStore'
import { MonthlyBalanceChart } from '@/components/charts/MonthlyBalanceChart'

/**
 * Breites Ergebnis-Banner am unteren Rand: bleibt beim Reiterwechsel stehen,
 * damit die Wirkung jeder Parameteraenderung sofort sichtbar ist.
 */
export function ResultsBanner() {
  const { t } = useTranslation()
  const results = useBuildingStore((s) => s.results)
  const [open, setOpen] = useState(true)

  if (!results) return null

  // Mittlere Leistung im jeweils staerksten Monat - direkt aus der Monatsbilanz
  // abgeleitet, ohne eine Norm-Aussentemperatur zu erfinden (DIN EN 12831 waere
  // eine eigene Rechnung auf Tagesbasis).
  let peakHeating = 0
  let peakCooling = 0
  for (const m of results.monthlyResults) {
    const hours = m.days * 24
    peakHeating = Math.max(peakHeating, (m.heatingDemand * 1000) / hours)
    peakCooling = Math.max(peakCooling, (m.coolingDemand * 1000) / hours)
  }
  const area = results.netFloorArea

  return (
    <section className="shrink-0 border-t border-border bg-card">
      <div className="flex items-center gap-4 px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground shrink-0">
          {t('output.monthlyBalance')}
        </h2>

        {/* Kennwerte bleiben auch im eingeklappten Zustand sichtbar */}
        <div className="flex flex-1 flex-wrap items-baseline gap-x-6 gap-y-1 min-w-0">
          <Kpi
            label={t('output.heatingDemand')}
            value={results.specificHeatingDemand.toFixed(1)}
            unit={t('units.kwhm2a')}
            color="text-red-500"
          />
          <Kpi
            label={t('output.coolingDemand')}
            value={results.specificCoolingDemand.toFixed(1)}
            unit={t('units.kwhm2a')}
            color="text-cyan-500"
          />
          <Kpi
            label={t('output.peakHeatingPower')}
            value={(peakHeating / 1000).toFixed(1)}
            unit="kW"
            sub={`${(peakHeating / area).toFixed(1)} ${t('units.wm2')}`}
            color="text-red-400"
          />
          <Kpi
            label={t('output.peakCoolingPower')}
            value={(peakCooling / 1000).toFixed(1)}
            unit="kW"
            sub={`${(peakCooling / area).toFixed(1)} ${t('units.wm2')}`}
            color="text-cyan-400"
          />
          <Kpi
            label={t('output.energyClass')}
            value={results.energyClass}
            unit=""
            color="text-green-600"
          />
          <Kpi
            label={t('output.htValue')}
            value={results.htPrime.toFixed(2)}
            unit={t('units.wm2k')}
            color="text-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          title={open ? t('output.bannerCollapse') : t('output.bannerExpand')}
          aria-label={open ? t('output.bannerCollapse') : t('output.bannerExpand')}
          className="shrink-0 rounded-md border border-input p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {open && (
        <div className="px-2 pb-2">
          <MonthlyBalanceChart height={170} compact />
        </div>
      )}
    </section>
  )
}

function Kpi({ label, value, unit, sub, color }: {
  label: string
  value: string
  unit: string
  sub?: string
  color: string
}) {
  return (
    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className={`text-sm font-bold ${color}`}>{value}</span>
      {unit && <span className="text-[10px] text-muted-foreground">{unit}</span>}
      {sub && <span className="text-[10px] text-muted-foreground opacity-70">({sub})</span>}
    </div>
  )
}
