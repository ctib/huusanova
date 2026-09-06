import { useBuildingStore } from '@/store/buildingStore'
import { ParameterSlider } from './ParameterSlider'

export function GainsInputs() {
  const internalGains = useBuildingStore((s) => s.params.internalGains)
  const heatingSetpoint = useBuildingStore((s) => s.params.heatingSetpoint)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  return (
    <div className="space-y-3">
      <ParameterSlider
        label="gains.internalGains"
        value={internalGains.specificGains}
        onChange={(v) => setNestedParam('internalGains.specificGains', v)}
        min={0} max={15} step={0.5}
        unit="units.wm2" decimals={1}
      />
      <ParameterSlider
        label="gains.heatingSetpoint"
        value={heatingSetpoint}
        onChange={(v) => setNestedParam('heatingSetpoint', v)}
        min={16} max={24} step={0.5}
        unit="units.celsius" decimals={1}
      />
    </div>
  )
}
