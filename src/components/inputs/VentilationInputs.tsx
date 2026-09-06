import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import { ParameterSlider } from './ParameterSlider'
import type { VentilationType } from '@/calculation/types'

export function VentilationInputs() {
  const { t } = useTranslation()
  const ventilation = useBuildingStore((s) => s.params.ventilation)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  return (
    <div className="space-y-3">
      <ParameterSlider
        label="ventilation.airChangeRate"
        value={ventilation.airChangeRate}
        onChange={(v) => setNestedParam('ventilation.airChangeRate', v)}
        min={0.1} max={2.0} step={0.1}
        unit="units.perHour" decimals={1}
      />
      <ParameterSlider
        label="ventilation.n50"
        value={ventilation.n50}
        onChange={(v) => setNestedParam('ventilation.n50', v)}
        min={0.3} max={6.0} step={0.1}
        unit="units.perHour" decimals={1}
      />
      <div className="space-y-1.5">
        <label className="text-xs text-foreground">{t('ventilation.type')}</label>
        <div className="flex flex-col gap-1">
          {([
            { value: 'natural', labelKey: 'ventilation.typeNatural' },
            { value: 'mechanical', labelKey: 'ventilation.typeMechanical' },
            { value: 'heatRecovery', labelKey: 'ventilation.typeHeatRecovery' },
          ] as { value: VentilationType; labelKey: string }[]).map(({ value, labelKey }) => (
            <button
              key={value}
              onClick={() => setNestedParam('ventilation.ventilationType', value)}
              className={`text-xs py-1.5 px-2 rounded border text-left ${
                ventilation.ventilationType === value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-input hover:bg-accent'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>
      {ventilation.ventilationType === 'heatRecovery' && (
        <ParameterSlider
          label="ventilation.heatRecoveryEfficiency"
          value={ventilation.heatRecoveryEfficiency}
          onChange={(v) => setNestedParam('ventilation.heatRecoveryEfficiency', v)}
          min={0} max={0.95} step={0.05}
          unit=""
        />
      )}
    </div>
  )
}
