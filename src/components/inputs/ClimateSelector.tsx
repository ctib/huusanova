import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import { allClimateLocations } from '@/data/climateData'

export function ClimateSelector() {
  const { t } = useTranslation()
  const climateLocationId = useBuildingStore((s) => s.params.climateLocationId)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  // Group locations by country
  const byCountry = allClimateLocations.reduce<Record<string, typeof allClimateLocations>>((acc, loc) => {
    if (!acc[loc.country]) acc[loc.country] = []
    acc[loc.country].push(loc)
    return acc
  }, {})

  const countryLabels: Record<string, string> = {
    DE: 'Deutschland',
    CH: 'Schweiz',
    WORLD: 'Klimazonen weltweit',
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs text-foreground">{t('climate.location')}</label>
      <select
        value={climateLocationId}
        onChange={(e) => setNestedParam('climateLocationId', e.target.value)}
        className="w-full text-sm border border-input rounded-md px-2 py-1.5 bg-background"
      >
        {Object.entries(byCountry).map(([country, locations]) => (
          <optgroup key={country} label={countryLabels[country] || country}>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}
