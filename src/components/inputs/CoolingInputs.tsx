import { useBuildingStore } from '@/store/buildingStore'
import { ParameterSlider } from './ParameterSlider'

export function CoolingInputs() {
  const cooling = useBuildingStore((s) => s.params.cooling)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  return (
    <div className="space-y-3">
      <ParameterSlider
        label="cooling.shadingFc"
        value={cooling.movableShadingFc}
        onChange={(v) => setNestedParam('cooling.movableShadingFc', v)}
        min={0.10} max={1.00} step={0.01}
        unit=""
      />
      <ParameterSlider
        label="cooling.coolingSetpoint"
        value={cooling.coolingSetpoint}
        onChange={(v) => setNestedParam('cooling.coolingSetpoint', v)}
        min={24} max={28} step={0.5}
        unit="units.celsius" decimals={1}
      />
      <ParameterSlider
        label="cooling.nightVentilation"
        value={cooling.nightVentilationRate}
        onChange={(v) => setNestedParam('cooling.nightVentilationRate', v)}
        min={0} max={6} step={0.5}
        unit="units.perHour" decimals={1}
      />
    </div>
  )
}
