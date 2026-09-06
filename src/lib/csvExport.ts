import type { AnnualResult, ClimateLocation } from '@/calculation/types'

/**
 * Monatsbilanz als CSV. Semikolon als Trennzeichen und Komma als Dezimaltrennzeichen,
 * damit die Datei in einem deutsch eingestellten Excel direkt in Spalten faellt.
 */
export function monthlyBalanceToCsv(
  results: AnnualResult,
  climate: ClimateLocation,
  monthNames: string[]
): string {
  const num = (v: number, decimals = 2) => v.toFixed(decimals).replace('.', ',')

  const header = [
    'Monat', 'Tage', 'Aussentemperatur [C]',
    'Transmissionsverluste [kWh]', 'Lueftungsverluste [kWh]',
    'Solare Gewinne [kWh]', 'Interne Gewinne [kWh]',
    'Gewinn-Verlust-Verhaeltnis [-]', 'Ausnutzungsgrad [-]',
    'Heizwaermebedarf [kWh]', 'mittlere Heizleistung [kW]',
    'Kuehlenergiebedarf [kWh]', 'mittlere Kuehlleistung [kW]',
  ]

  const rows = results.monthlyResults.map((m) => {
    const hours = m.days * 24
    return [
      monthNames[m.month] ?? String(m.month + 1),
      String(m.days),
      num(climate.monthlyData[m.month].temperature, 1),
      num(m.transmissionLoss, 1),
      num(m.ventilationLoss, 1),
      num(m.solarGain, 1),
      num(m.internalGain, 1),
      Number.isFinite(m.gainLossRatio) ? num(m.gainLossRatio, 3) : '',
      num(m.utilizationFactor, 3),
      num(m.heatingDemand, 1),
      num(m.heatingDemand / hours, 3),
      num(m.coolingDemand, 1),
      num(m.coolingDemand / hours, 3),
    ].join(';')
  })

  const totalHours = results.monthlyResults.reduce((s, m) => s + m.days * 24, 0)
  const total = [
    'Jahr', String(results.monthlyResults.reduce((s, m) => s + m.days, 0)), '',
    num(results.totals.transmissionLoss, 1),
    num(results.totals.ventilationLoss, 1),
    num(results.totals.solarGain, 1),
    num(results.totals.internalGain, 1),
    '', '',
    num(results.totals.heatingDemand, 1),
    num(results.totals.heatingDemand / totalHours, 3),
    num(results.totals.coolingDemand, 1),
    num(results.totals.coolingDemand / totalHours, 3),
  ].join(';')

  // Der Hinweis gehoert in die Datei, nicht nur auf den Bildschirm: eine
  // exportierte CSV landet spaeter in Tabellen und Berichten, wo der
  // Zusammenhang zum Lehrtool nicht mehr erkennbar waere.
  const meta = [
    `# HUUSanova - Monatsbilanz`,
    `# ACHTUNG: Nur fuer Lehre und Veranschaulichung.`,
    `# Stark vereinfachtes Monatsbilanzverfahren - nicht fuer Energieberatung,`,
    `# Nachweise nach GEG oder Energieausweise geeignet.`,
    `# Standort;${climate.name}${climate.regionName ? ` (${climate.regionName})` : ''}`,
    `# Bezugsflaeche A_N [m2];${num(results.netFloorArea, 1)}`,
    `# Huellflaeche A_E [m2];${num(results.envelopeArea, 1)}`,
    `# H_T [W/K];${num(results.ht, 1)}`,
    `# H_V [W/K];${num(results.hv, 1)}`,
    `# Heizwaermebedarf [kWh/(m2a)];${num(results.specificHeatingDemand, 1)}`,
    `# Kuehlenergiebedarf [kWh/(m2a)];${num(results.specificCoolingDemand, 1)}`,
  ]

  return [...meta, '', header.join(';'), ...rows, total].join('\r\n')
}

/** Loest den Download einer CSV-Datei im Browser aus. */
export function downloadCsv(filename: string, content: string): void {
  // BOM, sonst zerlegt Excel die Umlaute
  const blob = new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
