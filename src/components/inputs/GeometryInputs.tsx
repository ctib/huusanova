import { useBuildingStore } from '@/store/buildingStore'
import { ParameterSlider } from './ParameterSlider'

export function GeometryInputs() {
  const geometry = useBuildingStore((s) => s.params.geometry)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  return (
    <div className="space-y-3">
      <ParameterSlider
        label="geometry.length"
        value={geometry.length}
        onChange={(v) => setNestedParam('geometry.length', v)}
        min={5} max={30} step={0.5}
        unit="units.m" decimals={1}
      />
      <ParameterSlider
        label="geometry.width"
        value={geometry.width}
        onChange={(v) => setNestedParam('geometry.width', v)}
        min={5} max={30} step={0.5}
        unit="units.m" decimals={1}
      />
      <ParameterSlider
        label="geometry.height"
        value={geometry.height}
        onChange={(v) => setNestedParam('geometry.height', v)}
        min={2.2} max={4.0} step={0.1}
        unit="units.m" decimals={1}
      />
      <ParameterSlider
        label="geometry.stories"
        value={geometry.stories}
        onChange={(v) => setNestedParam('geometry.stories', v)}
        min={1} max={5} step={1}
        unit="" decimals={0}
      />
      <ParameterSlider
        label="geometry.rotation"
        value={geometry.rotation}
        onChange={(v) => setNestedParam('geometry.rotation', v)}
        min={0} max={359} step={1}
        unit="units.degree" decimals={0}
      />
    </div>
  )
}
