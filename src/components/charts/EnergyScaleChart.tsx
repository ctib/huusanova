import { useBuildingStore } from '@/store/buildingStore'
import { energyClasses } from '@/data/energyClasses'
import { useTranslation } from 'react-i18next'

export function EnergyScaleChart() {
  const { t } = useTranslation()
  const results = useBuildingStore((s) => s.results)

  if (!results) return null

  const maxScale = 400
  const svgWidth = 360
  const svgHeight = 120
  const barY = 30
  const barHeight = 40
  const labelY = barY + barHeight + 15

  const getX = (value: number) => {
    return Math.min(value / maxScale, 1) * svgWidth
  }

  const heatingX = getX(results.specificHeatingDemand)
  const coolingX = getX(results.specificCoolingDemand)

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full">
        {/* Energy class segments */}
        {energyClasses.map((ec) => {
          const x = getX(ec.minValue)
          const width = getX(ec.maxValue) - x
          return (
            <g key={ec.label}>
              <rect
                x={x}
                y={barY}
                width={width}
                height={barHeight}
                fill={ec.color}
                stroke="#fff"
                strokeWidth={0.5}
              />
              <text
                x={x + width / 2}
                y={barY + barHeight / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fontWeight="bold"
                fill="#fff"
              >
                {ec.label}
              </text>
            </g>
          )
        })}

        {/* Heating demand marker (red triangle) */}
        <polygon
          points={`${heatingX - 6},${barY - 2} ${heatingX + 6},${barY - 2} ${heatingX},${barY + 8}`}
          fill="#ef4444"
          stroke="#fff"
          strokeWidth={0.5}
        />
        <text
          x={heatingX}
          y={barY - 6}
          textAnchor="middle"
          fontSize={8}
          fill="#ef4444"
          fontWeight="bold"
        >
          {results.specificHeatingDemand.toFixed(0)} {t('units.kwhm2a')}
        </text>

        {/* Cooling demand marker (blue triangle) */}
        <polygon
          points={`${coolingX - 6},${barY + barHeight + 2} ${coolingX + 6},${barY + barHeight + 2} ${coolingX},${barY + barHeight - 8}`}
          fill="#06b6d4"
          stroke="#fff"
          strokeWidth={0.5}
        />
        <text
          x={coolingX}
          y={labelY + 5}
          textAnchor="middle"
          fontSize={8}
          fill="#06b6d4"
          fontWeight="bold"
        >
          {results.specificCoolingDemand.toFixed(0)} {t('units.kwhm2a')}
        </text>

        {/* Scale labels */}
        {[0, 50, 100, 150, 200, 250, 300, 400].map((val) => (
          <text
            key={val}
            x={getX(val)}
            y={barY + barHeight + 30}
            textAnchor="middle"
            fontSize={7}
            fill="#666"
          >
            {val}
          </text>
        ))}
      </svg>

      <div className="flex justify-between text-xs mt-1 px-1">
        <span className="text-red-500 font-medium">
          {t('output.heatingDemand')}: {results.specificHeatingDemand.toFixed(1)} {t('units.kwhm2a')}
        </span>
        <span className="text-cyan-500 font-medium">
          {t('output.coolingDemand')}: {results.specificCoolingDemand.toFixed(1)} {t('units.kwhm2a')}
        </span>
      </div>
    </div>
  )
}
