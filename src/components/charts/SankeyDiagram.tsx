import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ResponsiveSankey } from '@nivo/sankey'
import { useBuildingStore } from '@/store/buildingStore'

type SankeyView = 'heating' | 'cooling'

export function SankeyDiagram() {
  const { t } = useTranslation()
  const results = useBuildingStore((s) => s.results)
  const [view, setView] = useState<SankeyView>('heating')

  if (!results) return null

  const { totals } = results

  const buildSankeyData = () => {
    if (view === 'heating') {
      const nodes = [
        { id: 'transmission', color: '#3b82f6' },
        { id: 'ventilation', color: '#93c5fd' },
        { id: 'totalLosses', color: '#6366f1' },
        { id: 'heating', color: '#ef4444' },
        { id: 'usableGains', color: '#f59e0b' },
        { id: 'solar', color: '#eab308' },
        { id: 'internal', color: '#f472b6' },
      ]

      const usableGains = totals.transmissionLoss + totals.ventilationLoss - totals.heatingDemand
      const links = [
        { source: 'transmission', target: 'totalLosses', value: Math.max(1, totals.transmissionLoss) },
        { source: 'ventilation', target: 'totalLosses', value: Math.max(1, totals.ventilationLoss) },
        { source: 'totalLosses', target: 'heating', value: Math.max(1, totals.heatingDemand) },
        { source: 'usableGains', target: 'totalLosses', value: Math.max(1, usableGains) },
        { source: 'solar', target: 'usableGains', value: Math.max(1, Math.min(totals.solarGain, usableGains * totals.solarGain / (totals.solarGain + totals.internalGain || 1))) },
        { source: 'internal', target: 'usableGains', value: Math.max(1, Math.min(totals.internalGain, usableGains * totals.internalGain / (totals.solarGain + totals.internalGain || 1))) },
      ]

      return { nodes, links }
    } else {
      const nodes = [
        { id: 'solar', color: '#eab308' },
        { id: 'internal', color: '#f472b6' },
        { id: 'totalGains', color: '#f59e0b' },
        { id: 'cooling', color: '#06b6d4' },
        { id: 'usableLosses', color: '#6366f1' },
        { id: 'transmission', color: '#3b82f6' },
        { id: 'ventilation', color: '#93c5fd' },
      ]

      const totalGains = totals.solarGain + totals.internalGain
      const usableLosses = Math.max(0, totalGains - totals.coolingDemand)

      const links = [
        { source: 'solar', target: 'totalGains', value: Math.max(1, totals.solarGain) },
        { source: 'internal', target: 'totalGains', value: Math.max(1, totals.internalGain) },
        { source: 'totalGains', target: 'cooling', value: Math.max(1, totals.coolingDemand) },
        { source: 'totalGains', target: 'usableLosses', value: Math.max(1, usableLosses) },
        { source: 'usableLosses', target: 'transmission', value: Math.max(1, usableLosses * totals.transmissionLoss / (totals.transmissionLoss + totals.ventilationLoss || 1)) },
        { source: 'usableLosses', target: 'ventilation', value: Math.max(1, usableLosses * totals.ventilationLoss / (totals.transmissionLoss + totals.ventilationLoss || 1)) },
      ]

      return { nodes, links }
    }
  }

  const nodeLabels: Record<string, string> = {
    transmission: t('chart.transmission'),
    ventilation: t('chart.ventilationLoss'),
    totalLosses: view === 'heating' ? 'Gesamtverluste' : 'Gesamtgewinne',
    totalGains: 'Gesamtgewinne',
    heating: t('chart.heatingDemand'),
    cooling: t('chart.coolingDemand'),
    usableGains: 'Nutzbare Gewinne',
    usableLosses: 'Nutzbare Verluste',
    solar: t('chart.solarGains'),
    internal: t('chart.internalGains'),
  }

  const data = buildSankeyData()

  return (
    <div>
      <div className="flex gap-1 mb-2">
        <button
          onClick={() => setView('heating')}
          className={`text-xs py-1 px-3 rounded ${view === 'heating' ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'}`}
        >
          {t('chart.heatingDemand')}
        </button>
        <button
          onClick={() => setView('cooling')}
          className={`text-xs py-1 px-3 rounded ${view === 'cooling' ? 'bg-cyan-500 text-white' : 'bg-muted text-muted-foreground'}`}
        >
          {t('chart.coolingDemand')}
        </button>
      </div>
      <div style={{ height: 280 }}>
        <ResponsiveSankey
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          align="justify"
          colors={(node) => {
            const n = data.nodes.find((nd) => nd.id === node.id)
            return n?.color || '#999'
          }}
          nodeOpacity={1}
          nodeThickness={14}
          nodeInnerPadding={3}
          nodeSpacing={20}
          nodeBorderWidth={0}
          linkOpacity={0.4}
          linkHoverOpacity={0.7}
          linkContract={1}
          enableLinkGradient
          labelPosition="outside"
          labelOrientation="horizontal"
          labelPadding={8}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
          label={(node) => nodeLabels[node.id] || node.id}
        />
      </div>
    </div>
  )
}
