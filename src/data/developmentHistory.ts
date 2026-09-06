/**
 * Entwicklungsverlauf des Projekts fuer den Info-Reiter.
 *
 * Die Zahlen der Sessions 1-4 stammen aus DEVELOPMENT_LOG.md, das waehrend
 * der Entwicklung mitgefuehrt wurde. "Woerter" ist die geschaetzte Laenge der
 * Benutzereingaben (Prompts und ToDo-Eintraege), "linesAdded" die Zahl neu
 * entstandener Zeilen in src/ (*.ts und *.tsx).
 *
 * Beim Fortschreiben: Zeilen zaehlen mit
 *   Get-ChildItem -Recurse src -Include *.ts,*.tsx -File |
 *     Get-Content | Measure-Object -Line
 * und die Differenz zur letzten Session als linesAdded eintragen.
 */

export interface DevelopmentSession {
  id: number
  /** ISO-Datum der Session */
  date: string
  /** Kurzlabel fuer die x-Achse */
  label: string
  /** Anzahl der Benutzereingaben */
  prompts: number
  /** geschaetzte Woerter Benutzereingabe */
  words: number
  /** neu entstandene Zeilen in src/ */
  linesAdded: number
  /** Stichwort, was in dieser Session entstand (i18n-Schluessel-Suffix) */
  topicKey: string
}

export const developmentSessions: DevelopmentSession[] = [
  { id: 1, date: '2026-06-24', label: '24.06.', prompts: 3, words: 160, linesAdded: 3451, topicKey: 's1' },
  { id: 2, date: '2026-07-15', label: '15.07.', prompts: 2, words: 90, linesAdded: 0, topicKey: 's2' },
  { id: 3, date: '2026-08-03', label: '03.08.', prompts: 6, words: 180, linesAdded: 1645, topicKey: 's3' },
  { id: 4, date: '2026-08-04', label: '04.08.', prompts: 1, words: 40, linesAdded: 323, topicKey: 's4' },
  { id: 5, date: '2026-09-06', label: '06.09.', prompts: 9, words: 155, linesAdded: 697, topicKey: 's5' },
]

export const developmentTotals = {
  prompts: developmentSessions.reduce((s, x) => s + x.prompts, 0),
  words: developmentSessions.reduce((s, x) => s + x.words, 0),
  lines: developmentSessions.reduce((s, x) => s + x.linesAdded, 0),
}

/** Zeilen je Wort Benutzereingabe - die "Aufwand/Nutzen"-Kennzahl. */
export const linesPerWord = developmentTotals.lines / developmentTotals.words

/** Kumulierter Codeumfang nach jeder Session. */
export const cumulativeLines = developmentSessions.reduce<number[]>((acc, s, i) => {
  acc.push((i > 0 ? acc[i - 1] : 0) + s.linesAdded)
  return acc
}, [])

/**
 * Fremdgrafiken mit Quelle. Beide werden als Anschauungsmaterial im
 * Lehrkontext verwendet und sind in der App an Ort und Stelle verlinkt -
 * hier noch einmal gesammelt.
 */
export const imageCredits = [
  {
    titleKey: 'creditTryMap',
    source: 'caala.de',
    url: 'https://www.caala.de/lexikon/klimaregion-din-v-18599',
  },
  {
    titleKey: 'creditWorldMap',
    source: 'jam-school.de',
    url: 'https://jam-school.de/thermische-klimazonen-klimazonen-der-erde-%E2%80%A2-definition-und-ubersicht-%C2%B7-mit-video/',
  },
]
