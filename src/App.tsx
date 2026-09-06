import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/layout/Header'
import { ResultsBanner } from '@/components/layout/ResultsBanner'
import { GrundlagenPage } from '@/components/grundlagen/GrundlagenPage'
import { ClimateTab } from '@/components/tabs/ClimateTab'
import { GeometryTab } from '@/components/tabs/GeometryTab'
import { IndoorConditionsTab } from '@/components/tabs/IndoorConditionsTab'
import { WindowsTab } from '@/components/tabs/WindowsTab'
import { OpaqueTab } from '@/components/tabs/OpaqueTab'
import { TGATab } from '@/components/tabs/TGATab'
import { ResultsTab } from '@/components/tabs/ResultsTab'
import { useBuildingStore } from '@/store/buildingStore'
import { useUrlSync } from '@/lib/useUrlSync'

const TABS = [
  'climate',
  'geometry',
  'indoor',
  'windows',
  'opaque',
  'tga',
  'results',
] as const

type TabId = (typeof TABS)[number]

// Reiter, die das Ergebnisbanner NICHT bekommen: der Ergebnisreiter zeigt
// dieselbe Grafik bereits in voller Groesse (spaeter auch der Info-Reiter).
const TABS_WITHOUT_BANNER: TabId[] = ['results']

const TAB_COMPONENTS: Record<TabId, React.FC> = {
  climate: ClimateTab,
  geometry: GeometryTab,
  indoor: IndoorConditionsTab,
  windows: WindowsTab,
  opaque: OpaqueTab,
  tga: TGATab,
  results: ResultsTab,
}

function App() {
  const { t } = useTranslation()
  const recompute = useBuildingStore((s) => s.recompute)
  const [showGrundlagen, setShowGrundlagen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('climate')

  // Konfiguration aus dem Link uebernehmen bzw. in den Link schreiben.
  useUrlSync()

  useEffect(() => {
    recompute()
  }, [recompute])

  if (showGrundlagen) {
    return <GrundlagenPage onClose={() => setShowGrundlagen(false)} />
  }

  const tabLabels: Record<TabId, string> = {
    climate: t('tabs.climate'),
    geometry: t('tabs.geometry'),
    indoor: t('tabs.indoor'),
    windows: t('tabs.windows'),
    opaque: t('tabs.opaque'),
    tga: t('tabs.tga'),
    results: t('tabs.results'),
  }

  const ActiveComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="flex flex-col h-screen">
      <Header onShowGrundlagen={() => setShowGrundlagen(true)} />

      <nav className="flex border-b border-border bg-card px-2 shrink-0 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tabLabels[tab]}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
            )}
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-y-auto bg-background p-6">
        <ActiveComponent />
      </main>

      {!TABS_WITHOUT_BANNER.includes(activeTab) && <ResultsBanner />}
    </div>
  )
}

export default App
