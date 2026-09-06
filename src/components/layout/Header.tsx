import { useTranslation } from 'react-i18next'
import { Globe, BookOpen } from 'lucide-react'

interface HeaderProps {
  onShowGrundlagen?: () => void
}

export function Header({ onShowGrundlagen }: HeaderProps) {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de')
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shrink-0 h-12">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-primary">{t('app.title')}</h1>
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {t('app.subtitle')}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 text-sm px-2 py-1 rounded-md hover:bg-accent"
          title={t('header.language')}
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase">{i18n.language}</span>
        </button>

        <button
          onClick={onShowGrundlagen}
          className="flex items-center gap-1 text-sm px-2 py-1 rounded-md hover:bg-accent"
          title={t('header.info')}
        >
          <BookOpen className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
