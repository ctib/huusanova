import { useBuildingStore } from '@/store/buildingStore'
import { ParameterSlider } from './ParameterSlider'

export function WindowInputs() {
  const windows = useBuildingStore((s) => s.params.windows)
  const uWindow = useBuildingStore((s) => s.params.envelope.window)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  return (
    <div className="space-y-3">
      <ParameterSlider
        label="windows.ratioNorth"
        value={windows.ratios.north}
        onChange={(v) => setNestedParam('windows.ratios.north', v)}
        min={0} max={0.90} step={0.01}
        unit="units.percent" decimals={0}
      />
      <ParameterSlider
        label="windows.ratioEast"
        value={windows.ratios.east}
        onChange={(v) => setNestedParam('windows.ratios.east', v)}
        min={0} max={0.90} step={0.01}
        unit="units.percent" decimals={0}
      />
      <ParameterSlider
        label="windows.ratioSouth"
        value={windows.ratios.south}
        onChange={(v) => setNestedParam('windows.ratios.south', v)}
        min={0} max={0.90} step={0.01}
        unit="units.percent" decimals={0}
      />
      <ParameterSlider
        label="windows.ratioWest"
        value={windows.ratios.west}
        onChange={(v) => setNestedParam('windows.ratios.west', v)}
        min={0} max={0.90} step={0.01}
        unit="units.percent" decimals={0}
      />
      <ParameterSlider
        label="envelope.uWindow"
        value={uWindow}
        onChange={(v) => setNestedParam('envelope.window', v)}
        min={0.50} max={4.00} step={0.01}
        unit="units.wm2k"
      />
      <ParameterSlider
        label="windows.gValue"
        value={windows.gValue}
        onChange={(v) => setNestedParam('windows.gValue', v)}
        min={0.20} max={0.85} step={0.01}
        unit=""
      />
      <ParameterSlider
        label="windows.frameFraction"
        value={windows.frameFraction}
        onChange={(v) => setNestedParam('windows.frameFraction', v)}
        min={0.10} max={0.50} step={0.01}
        unit=""
      />
      <ParameterSlider
        label="windows.shadingNorth"
        value={windows.shadingFactors.north}
        onChange={(v) => setNestedParam('windows.shadingFactors.north', v)}
        min={0} max={1} step={0.05}
        unit=""
      />
      <ParameterSlider
        label="windows.shadingEast"
        value={windows.shadingFactors.east}
        onChange={(v) => setNestedParam('windows.shadingFactors.east', v)}
        min={0} max={1} step={0.05}
        unit=""
      />
      <ParameterSlider
        label="windows.shadingSouth"
        value={windows.shadingFactors.south}
        onChange={(v) => setNestedParam('windows.shadingFactors.south', v)}
        min={0} max={1} step={0.05}
        unit=""
      />
      <ParameterSlider
        label="windows.shadingWest"
        value={windows.shadingFactors.west}
        onChange={(v) => setNestedParam('windows.shadingFactors.west', v)}
        min={0} max={1} step={0.05}
        unit=""
      />
    </div>
  )
}
