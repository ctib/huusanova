import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import { ParameterSlider } from '@/components/inputs/ParameterSlider'
import { VentilationInputs } from '@/components/inputs/VentilationInputs'
import { heatingSystemsData, getHeatingSystem } from '@/data/tgaSystems'
import type { HeatingSystemType, DHWSystemType } from '@/calculation/types'

const dhwOptions: { value: DHWSystemType; labelDe: string; labelEn: string }[] = [
  { value: 'sameAsHeating', labelDe: 'Gleicher Erzeuger', labelEn: 'Same as Heating' },
  { value: 'electricInstantaneous', labelDe: 'Elektro-Durchlauferhitzer', labelEn: 'Electric Instantaneous' },
  { value: 'solarThermalAssist', labelDe: 'Solarthermie-Unterstützung', labelEn: 'Solar Thermal Assisted' },
]

export function TGATab() {
  const { t, i18n } = useTranslation()
  const tga = useBuildingStore((s) => s.params.tga)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  const selectedSystem = getHeatingSystem(tga.heatingSystem)
  const isHeatPump = selectedSystem.isHeatPump
  const lang = i18n.language

  const pvAnnualYield = tga.pvInstalled * tga.pvSpecificYield

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Section 1: Heating System */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">
              {t('tga.heatingSystem', { defaultValue: lang === 'de' ? 'Waermeerzeuger' : 'Heating System' })}
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs text-foreground">
                {t('tga.selectHeatingSystem', { defaultValue: lang === 'de' ? 'System auswaehlen' : 'Select system' })}
              </label>
              <select
                value={tga.heatingSystem}
                onChange={(e) => setNestedParam('tga.heatingSystem', e.target.value as HeatingSystemType)}
                className="w-full text-sm border border-input rounded-md px-3 py-2 bg-background"
              >
                {heatingSystemsData.map((sys) => (
                  <option key={sys.id} value={sys.id}>
                    {lang === 'de' ? sys.nameKeyDe : sys.nameKeyEn}
                  </option>
                ))}
              </select>
            </div>

            {/* GEG compliance badge */}
            <div className="flex items-center gap-2">
              {selectedSystem.gegCompliant ? (
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  GEG &sect;71 &#10003;
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                  GEG &sect;71 &#10007;
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {selectedSystem.gegCompliant
                  ? t('tga.gegCompliant', { defaultValue: lang === 'de' ? 'GEG-konform (65% erneuerbar)' : 'GEG compliant (65% renewable)' })
                  : t('tga.gegNonCompliant', { defaultValue: lang === 'de' ? 'Nicht GEG-konform' : 'Not GEG compliant' })}
              </span>
            </div>

            {/* System info card */}
            <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
              <div className="flex justify-between">
                <span>
                  {isHeatPump
                    ? t('tga.jaz', { defaultValue: 'JAZ (SPF)' })
                    : t('tga.efficiency', { defaultValue: lang === 'de' ? 'Nutzungsgrad' : 'Efficiency' })
                  }
                </span>
                <span className="font-medium text-foreground">
                  {isHeatPump
                    ? tga.hpSPF.toFixed(1)
                    : `${(selectedSystem.efficiency * 100).toFixed(0)}%`
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t('tga.primaryEnergyFactor', { defaultValue: lang === 'de' ? 'Primaerenergiefaktor f_P' : 'Primary energy factor f_P' })}</span>
                <span className="font-medium text-foreground">{selectedSystem.primaryEnergyFactor.toFixed(1)}</span>
              </div>
            </div>

            {/* Heat pump SPF slider */}
            {isHeatPump && (
              <ParameterSlider
                label="tga.hpSPFLabel"
                value={tga.hpSPF}
                onChange={(v) => setNestedParam('tga.hpSPF', v)}
                min={2.0}
                max={6.0}
                step={0.1}
                unit=""
                decimals={1}
              />
            )}
          </div>

          {/* Section 2: DHW */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">
              {t('tga.dhw', { defaultValue: lang === 'de' ? 'Warmwasserbereitung' : 'Domestic Hot Water' })}
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs text-foreground">
                {t('tga.dhwSystem', { defaultValue: lang === 'de' ? 'Warmwassersystem' : 'DHW system' })}
              </label>
              <select
                value={tga.dhwSystem}
                onChange={(e) => setNestedParam('tga.dhwSystem', e.target.value as DHWSystemType)}
                className="w-full text-sm border border-input rounded-md px-3 py-2 bg-background"
              >
                {dhwOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {lang === 'de' ? opt.labelDe : opt.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {tga.dhwSystem === 'solarThermalAssist' && (
              <ParameterSlider
                label="tga.dhwSolarFraction"
                value={tga.dhwSolarFraction * 100}
                onChange={(v) => setNestedParam('tga.dhwSolarFraction', v / 100)}
                min={0}
                max={80}
                step={5}
                unit="units.percent"
                decimals={0}
              />
            )}

            <ParameterSlider
              label="tga.dhwDemand"
              value={tga.dhwDemand}
              onChange={(v) => setNestedParam('tga.dhwDemand', v)}
              min={5}
              max={25}
              step={0.5}
              unit="units.kWhPerM2a"
              decimals={1}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Section 3: Ventilation */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">
              {t('tga.ventilation', { defaultValue: lang === 'de' ? 'Lueftungsanlage' : 'Ventilation System' })}
            </h3>
            <VentilationInputs />
          </div>

          {/* Section 4: PV */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <h3 className="font-semibold text-sm">
              {t('tga.pv', { defaultValue: 'Photovoltaik (PV)' })}
            </h3>

            <ParameterSlider
              label="tga.pvInstalled"
              value={tga.pvInstalled}
              onChange={(v) => setNestedParam('tga.pvInstalled', v)}
              min={0}
              max={30}
              step={0.5}
              unit="units.kWp"
              decimals={1}
            />

            <ParameterSlider
              label="tga.pvSpecificYield"
              value={tga.pvSpecificYield}
              onChange={(v) => setNestedParam('tga.pvSpecificYield', v)}
              min={700}
              max={1200}
              step={10}
              unit="units.kWhPerKWp"
              decimals={0}
            />

            <ParameterSlider
              label="tga.pvSelfConsumption"
              value={tga.pvSelfConsumption * 100}
              onChange={(v) => setNestedParam('tga.pvSelfConsumption', v / 100)}
              min={0}
              max={80}
              step={5}
              unit="units.percent"
              decimals={0}
            />

            {/* Calculated PV yield */}
            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
              <div className="flex justify-between">
                <span>{t('tga.pvAnnualYield', { defaultValue: lang === 'de' ? 'Jahresertrag PV' : 'Annual PV yield' })}</span>
                <span className="font-medium text-foreground">
                  {pvAnnualYield.toFixed(0)} kWh/a
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
