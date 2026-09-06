import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { ExternalLink } from 'lucide-react'
import {
  developmentSessions,
  developmentTotals,
  linesPerWord,
  imageCredits,
} from '@/data/developmentHistory'

// Validiert gegen helle und dunkle Oberflaeche (Helligkeitsband, Chroma,
// CVD-Abstand, Kontrast). Nicht gegen andere Toene tauschen, ohne neu zu pruefen.
const COLOR_INPUT = '#d97706'
const COLOR_CODE = '#3b82f6'

export function InfoTab() {
  const { t } = useTranslation()

  const data = developmentSessions.map((s) => ({
    label: s.label,
    words: s.words,
    lines: s.linesAdded,
    prompts: s.prompts,
    topic: t(`info.${s.topicKey}`),
  }))

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t('info.title')}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('info.intro')}
        </p>
      </section>

      {/* Kennzahlen: die Aufwand/Nutzen-Aussage in einer Zeile */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat value={String(developmentTotals.prompts)} label={t('info.statPrompts')} />
        <Stat value={`~${developmentTotals.words}`} label={t('info.statWords')} />
        <Stat value={developmentTotals.lines.toLocaleString('de-DE')} label={t('info.statLines')} />
        <Stat value={`1 : ${Math.round(linesPerWord)}`} label={t('info.statRatio')} highlight />
      </section>

      {/* Zwei Panels statt zwei y-Achsen: Woerter und Zeilen unterscheiden
          sich um mehr als Faktor 20, in einem Diagramm waere eine der
          beiden Reihen eine flache Linie am Nullpunkt. */}
      <section className="space-y-4">
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold text-sm">{t('info.chartInputTitle')}</h3>
          <p className="text-xs text-muted-foreground mb-3">{t('info.chartInputSub')}</p>
          {/* Hoehe schliesst das x-Achsenband ein, sonst scrollt die Karte intern. */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 18, right: 8, bottom: 4, left: 0 }}>
              <CartesianGrid vertical={false} stroke="currentColor" className="text-border" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={38} />
              <Tooltip
                cursor={{ fill: 'currentColor', fillOpacity: 0.06 }}
                formatter={(value) => [`~${value}`, t('info.statWords')] as [string, string]}
              />
              <Bar dataKey="words" fill={COLOR_INPUT} radius={[4, 4, 0, 0]} maxBarSize={54}>
                <LabelList
                  dataKey="words"
                  position="top"
                  fontSize={11}
                  formatter={(label) => `~${label}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold text-sm">{t('info.chartCodeTitle')}</h3>
          <p className="text-xs text-muted-foreground mb-3">{t('info.chartCodeSub')}</p>
          {/* Hoehe schliesst das x-Achsenband ein, sonst scrollt die Karte intern. */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 18, right: 8, bottom: 4, left: 0 }}>
              <CartesianGrid vertical={false} stroke="currentColor" className="text-border" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={38} />
              <Tooltip
                cursor={{ fill: 'currentColor', fillOpacity: 0.06 }}
                formatter={(value) =>
                  [Number(value).toLocaleString('de-DE'), t('info.statLines')] as [string, string]
                }
              />
              <Bar dataKey="lines" fill={COLOR_CODE} radius={[4, 4, 0, 0]} maxBarSize={54}>
                <LabelList
                  dataKey="lines"
                  position="top"
                  fontSize={11}
                  // Session 2 hat keinen Code erzeugt - eine "0" auf dem
                  // Nullpunkt sieht nach Messfehler aus, ein Strich nicht.
                  formatter={(label) =>
                    Number(label) > 0 ? Number(label).toLocaleString('de-DE') : '–'
                  }
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Tabellenansicht: dieselben Zahlen ohne Farbe und ohne Diagramm */}
      <section className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-3 py-2">{t('info.colDate')}</th>
                <th className="text-right font-medium px-3 py-2">{t('info.colPrompts')}</th>
                <th className="text-right font-medium px-3 py-2">{t('info.colWords')}</th>
                <th className="text-right font-medium px-3 py-2">{t('info.colLines')}</th>
                <th className="text-left font-medium px-3 py-2">{t('info.colTopic')}</th>
              </tr>
            </thead>
            <tbody>
              {developmentSessions.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-3 py-2 whitespace-nowrap">{s.date}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.prompts}</td>
                  <td className="px-3 py-2 text-right tabular-nums">~{s.words}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {s.linesAdded > 0 ? s.linesAdded.toLocaleString('de-DE') : '–'}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{t(`info.${s.topicKey}`)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-border bg-muted/30 font-medium">
              <tr>
                <td className="px-3 py-2">{t('info.colTotal')}</td>
                <td className="px-3 py-2 text-right tabular-nums">{developmentTotals.prompts}</td>
                <td className="px-3 py-2 text-right tabular-nums">~{developmentTotals.words}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {developmentTotals.lines.toLocaleString('de-DE')}
                </td>
                <td className="px-3 py-2 text-muted-foreground font-normal">
                  {t('info.ratioNote', { ratio: Math.round(linesPerWord) })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold text-sm">{t('info.readingTitle')}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{t('info.reading')}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="rounded-lg border border-border p-4 space-y-2">
          <h3 className="font-semibold text-sm">{t('info.originTitle')}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('info.origin')}</p>
        </section>

        <section className="rounded-lg border border-border p-4 space-y-2">
          <h3 className="font-semibold text-sm">{t('info.creditsTitle')}</h3>
          <ul className="space-y-1.5">
            {imageCredits.map((c) => (
              <li key={c.url} className="text-sm">
                <span className="text-muted-foreground">{t(`info.${c.titleKey}`)}: </span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline hover:text-foreground"
                >
                  {c.source}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground pt-1">{t('info.creditsNote')}</p>
        </section>
      </div>
    </div>
  )
}

function Stat({ value, label, highlight }: {
  value: string
  label: string
  highlight?: boolean
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className={`text-2xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  )
}
