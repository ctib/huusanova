import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import { buildingPresets, getPreset } from '@/data/presets'

export function PresetSelector() {
  const { t } = useTranslation()
  const presetId = useBuildingStore((s) => s.presetId)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)
  const setPreset = useBuildingStore((s) => s.setPreset)

  const applyPreset = (id: string) => {
    const preset = getPreset(id)
    if (!preset) return

    // Temporarily suppress recompute by batching
    setPreset(id)
    setNestedParam('envelope.wall', preset.wall)
    setNestedParam('envelope.roof', preset.roof)
    setNestedParam('envelope.floor', preset.floor)
    setNestedParam('envelope.window', preset.window)
    setNestedParam('envelope.thermalBridgeSupplement', preset.thermalBridgeSupplement)
    setNestedParam('windows.gValue', preset.gValue)
    if (preset.n50 !== null) {
      setNestedParam('ventilation.n50', preset.n50)
    }
    // Re-set presetId since setNestedParam clears it
    setPreset(id)
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground">
        {t('sidebar.preset')}
      </label>
      <select
        value={presetId || 'custom'}
        onChange={(e) => {
          if (e.target.value !== 'custom') {
            applyPreset(e.target.value)
          }
        }}
        className="w-full text-sm border border-input rounded-md px-2 py-1.5 bg-background"
      >
        {!presetId && (
          <option value="custom">{t('sidebar.presetCustom')}</option>
        )}
        {buildingPresets.map((p) => (
          <option key={p.id} value={p.id}>
            {t(p.nameKey)}
          </option>
        ))}
      </select>
    </div>
  )
}
