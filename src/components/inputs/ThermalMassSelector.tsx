import { useTranslation } from 'react-i18next'
import { useBuildingStore } from '@/store/buildingStore'
import type { ThermalMassClass } from '@/calculation/types'

const CAPACITY: Record<ThermalMassClass, number> = { light: 25, medium: 50, heavy: 80 }

/**
 * Auswahl der wirksamen Speichermasse. Wird im Reiter Innenraum und im Reiter
 * Opake Flaechen verwendet - beide schreiben auf denselben Parameter.
 */
export function ThermalMassSelector() {
  const { t } = useTranslation()
  const thermalMassClass = useBuildingStore((s) => s.params.cooling.thermalMassClass)
  const setNestedParam = useBuildingStore((s) => s.setNestedParam)

  return (
    <div className="flex gap-2">
      {(Object.keys(CAPACITY) as ThermalMassClass[]).map((cls) => (
        <button
          key={cls}
          onClick={() => setNestedParam('cooling.thermalMassClass', cls)}
          className={`flex-1 text-xs py-2 px-3 rounded-md border transition-colors ${
            thermalMassClass === cls
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background border-input hover:bg-accent'
          }`}
        >
          <div className="font-medium">
            {t(`envelope.thermalMass${cls.charAt(0).toUpperCase() + cls.slice(1)}`)}
          </div>
          <div className="text-[10px] opacity-70 mt-0.5">{CAPACITY[cls]} Wh/(m²K)</div>
        </button>
      ))}
    </div>
  )
}
