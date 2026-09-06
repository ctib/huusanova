import { useTranslation } from 'react-i18next'
import { GainsInputs } from '@/components/inputs/GainsInputs'
import { CoolingInputs } from '@/components/inputs/CoolingInputs'
import { ThermalMassSelector } from '@/components/inputs/ThermalMassSelector'

export function IndoorConditionsTab() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Heating / Internal Gains */}
        <div className="rounded-lg border border-border p-4 space-y-4">
          <h3 className="font-semibold text-sm">{t('tabs.heatingGains')}</h3>
          <GainsInputs />
        </div>

        {/* Cooling / Shading */}
        <div className="rounded-lg border border-border p-4 space-y-4">
          <h3 className="font-semibold text-sm">{t('tabs.coolingShading')}</h3>
          <CoolingInputs />
        </div>
      </div>

      {/* Thermal Mass */}
      <div className="rounded-lg border border-border p-4 space-y-3">
        <h3 className="font-semibold text-sm">{t('envelope.thermalMass')}</h3>
        <ThermalMassSelector />
      </div>
    </div>
  )
}
