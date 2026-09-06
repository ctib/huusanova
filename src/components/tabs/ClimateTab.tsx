import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import { ClimateSelector } from '@/components/inputs/ClimateSelector'
import { GermanyClimateMap } from '@/components/inputs/GermanyClimateMap'
import { WorldClimateMap } from '@/components/inputs/WorldClimateMap'
import { getClimateLocationById } from '@/data/climateData'
import { PresetSelector } from '@/components/inputs/PresetSelector'

type MapView = 'DE' | 'WORLD'

const countryLabels: Record<string, string> = {
  DE: 'Deutschland',
  CH: 'Schweiz',
  WORLD: 'Klimazonen weltweit',
}

export function ClimateTab() {
  const { t, i18n } = useTranslation()
  const climateId = useBuildingStore((s) => s.params.climateLocationId)
  const method = useBuildingStore((s) => s.method)
  const setMethod = useBuildingStore((s) => s.setMethod)
  const location = getClimateLocationById(climateId)

  const [mapView, setMapView] = useState<MapView>(location?.country === 'WORLD' ? 'WORLD' : 'DE')

  // Kartenansicht folgt der Auswahl (z. B. ueber das Dropdown)
  useEffect(() => {
    if (location?.country === 'WORLD') setMapView('WORLD')
    else if (location?.country === 'DE') setMapView('DE')
  }, [location?.country])

  const monthNames = t('chart.months', { returnObjects: true }) as string[]

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Selections */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">{t('tabs.climate')}</h3>
            <ClimateSelector />
            {location && (
              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
                <div>{t('climate.country')}: {countryLabels[location.country] ?? location.country}</div>
                {location.tryRegion && (
                  <div>TRY {location.tryRegion}: {location.regionName}</div>
                )}
                {location.climateZone && location.regionName && (
                  <div>{location.regionName}</div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">{t('header.method')}</h3>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as 'EN832' | 'SIA380' | 'DIN18599')}
              className="w-full text-sm border border-input rounded-md px-3 py-2 bg-background"
            >
              <option value="EN832">EN 832 / ISO 13790</option>
              <option value="SIA380">SIA 380/1</option>
              <option value="DIN18599">DIN 18599</option>
            </select>
          </div>

          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">{t('sidebar.preset')}</h3>
            <PresetSelector />
          </div>
        </div>

        {/* Right: Climate data table */}
        {location && (
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-sm mb-3">{t('climate.monthlyData')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1 pr-2">{t('climate.month')}</th>
                    <th className="text-right py-1 px-1">θ<sub>e</sub> [°C]</th>
                    <th className="text-right py-1 px-1">I<sub>S</sub></th>
                    <th className="text-right py-1 px-1">I<sub>W</sub></th>
                    <th className="text-right py-1 px-1">I<sub>N</sub></th>
                    <th className="text-right py-1 pl-1">I<sub>E</sub></th>
                  </tr>
                </thead>
                <tbody>
                  {location.monthlyData.map((m, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-1 pr-2 font-medium">{monthNames[i]}</td>
                      <td className="text-right py-1 px-1">{m.temperature.toFixed(1)}</td>
                      <td className="text-right py-1 px-1 text-amber-600">{m.solarRadiation.south.toFixed(0)}</td>
                      <td className="text-right py-1 px-1">{m.solarRadiation.west.toFixed(0)}</td>
                      <td className="text-right py-1 px-1">{m.solarRadiation.north.toFixed(0)}</td>
                      <td className="text-right py-1 pl-1">{m.solarRadiation.east.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-[10px] text-muted-foreground mt-2">
                {i18n.language === 'de'
                  ? 'I = Solarstrahlung [kWh/(m²·Monat)]'
                  : 'I = Solar radiation [kWh/(m²·month)]'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Maps */}
      <div className="rounded-lg border border-border p-4 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="font-semibold text-sm">
            {mapView === 'DE' ? 'TRY-Klimaregionen (DIN V 18599)' : 'Thermische Klimazonen der Erde'}
          </h3>
          <div className="inline-flex rounded-md border border-border overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setMapView('DE')}
              className={`px-3 py-1.5 transition-colors ${
                mapView === 'DE' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              Deutschland
            </button>
            <button
              type="button"
              onClick={() => setMapView('WORLD')}
              className={`px-3 py-1.5 border-l border-border transition-colors ${
                mapView === 'WORLD' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              Welt
            </button>
          </div>
        </div>

        {mapView === 'DE' ? <GermanyClimateMap /> : <WorldClimateMap />}
      </div>
    </div>
  )
}
