import { useTranslation } from 'react-i18next'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { useBuildingStore } from '@/store/buildingStore'

interface MonthlyBalanceChartProps {
  /** Diagrammhoehe in px (Standard 300, Banner nutzt ~170) */
  height?: number
  /** Kompaktmodus fuers Banner: kleinere Schrift, keine Achsenbeschriftung */
  compact?: boolean
}

export function MonthlyBalanceChart({ height = 300, compact = false }: MonthlyBalanceChartProps = {}) {
  const { t } = useTranslation()
  const results = useBuildingStore((s) => s.results)
  const months = t('chart.months', { returnObjects: true }) as string[]

  if (!results) return null

  const data = results.monthlyResults.map((m, i) => ({
    month: months[i],
    transmission: -m.transmissionLoss,
    ventilation: -m.ventilationLoss,
    solar: m.solarGain,
    internal: m.internalGain,
    heating: m.heatingDemand,
    cooling: -m.coolingDemand,
  }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="month" tick={{ fontSize: compact ? 9 : 10 }} />
        <YAxis
          tick={{ fontSize: compact ? 9 : 10 }}
          width={compact ? 44 : undefined}
          label={compact ? undefined : { value: 'kWh', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
        />
        <ReferenceLine y={0} stroke="#666" />
        <Tooltip
          contentStyle={{ fontSize: 11 }}
          formatter={(value, name) => [
            `${Math.abs(Number(value)).toFixed(0)} kWh`,
            String(name),
          ]}
        />
        <Legend wrapperStyle={{ fontSize: compact ? 9 : 10 }} iconSize={compact ? 8 : 14} />

        {/* Losses (negative) */}
        <Bar dataKey="transmission" stackId="losses" fill="#3b82f6" name={t('chart.transmission')} />
        <Bar dataKey="ventilation" stackId="losses" fill="#93c5fd" name={t('chart.ventilationLoss')} />

        {/* Gains (positive) */}
        <Bar dataKey="solar" stackId="gains" fill="#eab308" name={t('chart.solarGains')} />
        <Bar dataKey="internal" stackId="gains" fill="#f472b6" name={t('chart.internalGains')} />

        {/* Demand lines */}
        <Line type="monotone" dataKey="heating" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} name={t('chart.heatingDemand')} />
        <Line type="monotone" dataKey="cooling" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2 }} name={t('chart.coolingDemand')} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
