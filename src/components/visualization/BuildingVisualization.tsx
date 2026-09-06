import { useBuildingStore } from '@/store/buildingStore'
import { useTranslation } from 'react-i18next'
import { BuildingSVG } from './BuildingSVG'

export function BuildingVisualization() {
  const { t } = useTranslation()
  const seasonView = useBuildingStore((s) => s.seasonView)
  const setSeasonView = useBuildingStore((s) => s.setSeasonView)

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xl">
      <div className="flex gap-1">
        <button
          onClick={() => setSeasonView('winter')}
          className={`text-xs py-1 px-3 rounded ${
            seasonView === 'winter'
              ? 'bg-blue-500 text-white'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {t('visualization.winter')}
        </button>
        <button
          onClick={() => setSeasonView('summer')}
          className={`text-xs py-1 px-3 rounded ${
            seasonView === 'summer'
              ? 'bg-orange-500 text-white'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {t('visualization.summer')}
        </button>
      </div>
      <BuildingSVG />
    </div>
  )
}
