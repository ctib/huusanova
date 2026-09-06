import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, BookOpen, Link2, Check } from 'lucide-react'
import { useBuildingStore, defaultSharedState } from '@/store/buildingStore'
import { buildShareUrl } from '@/lib/urlState'

interface HeaderProps {
  onShowGrundlagen?: () => void
}

export function Header({ onShowGrundlagen }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const [copied, setCopied] = useState(false)

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de')
  }

  const copyShareLink = async () => {
    const { params, method, presetId } = useBuildingStore.getState()
    const url = buildShareUrl({ params, method, presetId }, defaultSharedState)

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard-API braucht HTTPS bzw. localhost. Auf einem Uni-Server ohne
      // TLS waere der Button sonst wirkungslos - dann den Link markieren
      // lassen, damit Strg+C weiterhin funktioniert.
      const field = document.createElement('input')
      field.value = url
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      try {
        document.execCommand('copy')
      } finally {
        document.body.removeChild(field)
      }
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
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
          onClick={copyShareLink}
          className="flex items-center gap-1 text-sm px-2 py-1 rounded-md hover:bg-accent"
          title={t('header.shareTitle')}
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">
            {copied ? t('header.shareCopied') : t('header.share')}
          </span>
        </button>

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
