import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import { ParameterSlider } from './ParameterSlider'
import type { ThermalMassClass } from '@/calculation/types'

export function EnvelopeInputs() {
  const { t } = useTranslation()
  const envelope = useBuildingStore((s) => s.params.envelope)
  const thermalMassClass = useBuildingStore((s) => s.params.cooling.thermalMassClass)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  return (
    <div className="space-y-3">
      <ParameterSlider
        label="envelope.uWall"
        value={envelope.wall}
        onChange={(v) => setNestedParam('envelope.wall', v)}
        min={0.10} max={2.00} step={0.01}
        unit="units.wm2k"
      />
      <ParameterSlider
        label="envelope.uRoof"
        value={envelope.roof}
        onChange={(v) => setNestedParam('envelope.roof', v)}
        min={0.10} max={1.00} step={0.01}
        unit="units.wm2k"
      />
      <ParameterSlider
        label="envelope.uFloor"
        value={envelope.floor}
        onChange={(v) => setNestedParam('envelope.floor', v)}
        min={0.10} max={1.50} step={0.01}
        unit="units.wm2k"
      />
      <ParameterSlider
        label="envelope.uWindow"
        value={envelope.window}
        onChange={(v) => setNestedParam('envelope.window', v)}
        min={0.50} max={4.00} step={0.01}
        unit="units.wm2k"
      />
      <ParameterSlider
        label="envelope.thermalBridgeSupplement"
        value={envelope.thermalBridgeSupplement}
        onChange={(v) => setNestedParam('envelope.thermalBridgeSupplement', v)}
        min={0.00} max={0.20} step={0.01}
        unit="units.wm2k"
      />
      <div className="space-y-1.5">
        <label className="text-xs text-foreground">{t('envelope.thermalMass')}</label>
        <div className="flex gap-1">
          {(['light', 'medium', 'heavy'] as ThermalMassClass[]).map((cls) => (
            <button
              key={cls}
              onClick={() => setNestedParam('cooling.thermalMassClass', cls)}
              className={`flex-1 text-xs py-1 px-2 rounded border ${
                thermalMassClass === cls
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-input hover:bg-accent'
              }`}
            >
              {t(`envelope.thermalMass${cls.charAt(0).toUpperCase() + cls.slice(1)}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
