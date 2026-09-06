import type { ClimateLocation } from '@/calculation/types'

// Thermische Klimazonen der Erde (Polar / Subpolar / Gemaeßigt / Subtropen / Tropen)
// Karte: jam-school.de – "Thermische Klimazonen – Klimazonen der Erde"
// Die Monatswerte sind repraesentative Referenzdatensaetze je Zone (Nordhalbkugel),
// gedacht fuer den qualitativen Vergleich in der Lehre – keine Nachweisdaten.

const polar: ClimateLocation = {
  id: 'zonePolar',
  name: 'Polargebiet',
  country: 'WORLD',
  climateZone: 'polar',
  regionName: 'Referenz Longyearbyen (78° N)',
  monthlyData: [
    { temperature: -14.0, solarRadiation: { north: 0, east: 0, south: 0, west: 0, horizontal: 0 }, days: 31 },
    { temperature: -15.0, solarRadiation: { north: 1, east: 1, south: 2, west: 1, horizontal: 1 }, days: 28 },
    { temperature: -14.0, solarRadiation: { north: 6, east: 22, south: 40, west: 21, horizontal: 20 }, days: 31 },
    { temperature: -10.0, solarRadiation: { north: 22, east: 60, south: 88, west: 58, horizontal: 70 }, days: 30 },
    { temperature: -3.0, solarRadiation: { north: 44, east: 84, south: 96, west: 82, horizontal: 110 }, days: 31 },
    { temperature: 3.0, solarRadiation: { north: 52, east: 88, south: 92, west: 86, horizontal: 120 }, days: 30 },
    { temperature: 6.0, solarRadiation: { north: 44, east: 78, south: 84, west: 76, horizontal: 100 }, days: 31 },
    { temperature: 5.0, solarRadiation: { north: 24, east: 52, south: 64, west: 50, horizontal: 60 }, days: 31 },
    { temperature: 1.0, solarRadiation: { north: 8, east: 26, south: 36, west: 25, horizontal: 25 }, days: 30 },
    { temperature: -4.0, solarRadiation: { north: 2, east: 5, south: 9, west: 5, horizontal: 5 }, days: 31 },
    { temperature: -9.0, solarRadiation: { north: 0, east: 0, south: 0, west: 0, horizontal: 0 }, days: 30 },
    { temperature: -12.0, solarRadiation: { north: 0, east: 0, south: 0, west: 0, horizontal: 0 }, days: 31 },
  ],
}

const subpolar: ClimateLocation = {
  id: 'zoneSubpolar',
  name: 'Subpolargebiet',
  country: 'WORLD',
  climateZone: 'subpolar',
  regionName: 'Referenz Rovaniemi (66° N)',
  monthlyData: [
    { temperature: -12.0, solarRadiation: { north: 1, east: 2, south: 5, west: 2, horizontal: 2 }, days: 31 },
    { temperature: -11.0, solarRadiation: { north: 5, east: 12, south: 26, west: 11, horizontal: 10 }, days: 28 },
    { temperature: -6.0, solarRadiation: { north: 14, east: 34, south: 62, west: 32, horizontal: 35 }, days: 31 },
    { temperature: 0.0, solarRadiation: { north: 30, east: 58, south: 78, west: 56, horizontal: 75 }, days: 30 },
    { temperature: 7.0, solarRadiation: { north: 48, east: 84, south: 86, west: 82, horizontal: 120 }, days: 31 },
    { temperature: 13.0, solarRadiation: { north: 58, east: 94, south: 86, west: 92, horizontal: 140 }, days: 30 },
    { temperature: 16.0, solarRadiation: { north: 52, east: 88, south: 86, west: 86, horizontal: 130 }, days: 31 },
    { temperature: 13.0, solarRadiation: { north: 34, east: 64, south: 74, west: 62, horizontal: 90 }, days: 31 },
    { temperature: 7.0, solarRadiation: { north: 16, east: 34, south: 52, west: 33, horizontal: 45 }, days: 30 },
    { temperature: 1.0, solarRadiation: { north: 6, east: 13, south: 24, west: 12, horizontal: 15 }, days: 31 },
    { temperature: -5.0, solarRadiation: { north: 2, east: 4, south: 8, west: 4, horizontal: 3 }, days: 30 },
    { temperature: -10.0, solarRadiation: { north: 0, east: 1, south: 2, west: 1, horizontal: 1 }, days: 31 },
  ],
}

const temperate: ClimateLocation = {
  id: 'zoneTemperate',
  name: 'Gemäßigte Zone',
  country: 'WORLD',
  climateZone: 'temperate',
  regionName: 'Referenz Mitteleuropa (52° N)',
  monthlyData: [
    { temperature: 0.6, solarRadiation: { north: 7, east: 11, south: 21, west: 11, horizontal: 16 }, days: 31 },
    { temperature: 1.4, solarRadiation: { north: 11, east: 19, south: 33, west: 18, horizontal: 27 }, days: 28 },
    { temperature: 5.0, solarRadiation: { north: 20, east: 36, south: 50, west: 34, horizontal: 51 }, days: 31 },
    { temperature: 9.2, solarRadiation: { north: 33, east: 55, south: 58, west: 53, horizontal: 84 }, days: 30 },
    { temperature: 13.8, solarRadiation: { north: 47, east: 72, south: 65, west: 70, horizontal: 118 }, days: 31 },
    { temperature: 17.0, solarRadiation: { north: 54, east: 78, south: 64, west: 76, horizontal: 130 }, days: 30 },
    { temperature: 19.0, solarRadiation: { north: 50, east: 74, south: 64, west: 72, horizontal: 124 }, days: 31 },
    { temperature: 18.4, solarRadiation: { north: 38, east: 62, south: 62, west: 60, horizontal: 104 }, days: 31 },
    { temperature: 14.4, solarRadiation: { north: 23, east: 41, south: 52, west: 39, horizontal: 66 }, days: 30 },
    { temperature: 9.6, solarRadiation: { north: 13, east: 23, south: 36, west: 22, horizontal: 35 }, days: 31 },
    { temperature: 4.6, solarRadiation: { north: 8, east: 12, south: 20, west: 12, horizontal: 16 }, days: 30 },
    { temperature: 1.6, solarRadiation: { north: 5, east: 8, south: 15, west: 8, horizontal: 11 }, days: 31 },
  ],
}

const subtropics: ClimateLocation = {
  id: 'zoneSubtropics',
  name: 'Subtropen',
  country: 'WORLD',
  climateZone: 'subtropics',
  regionName: 'Referenz Sevilla (37° N)',
  monthlyData: [
    { temperature: 11.0, solarRadiation: { north: 18, east: 40, south: 78, west: 40, horizontal: 60 }, days: 31 },
    { temperature: 12.5, solarRadiation: { north: 23, east: 52, south: 88, west: 52, horizontal: 80 }, days: 28 },
    { temperature: 15.5, solarRadiation: { north: 33, east: 74, south: 100, west: 74, horizontal: 120 }, days: 31 },
    { temperature: 17.5, solarRadiation: { north: 46, east: 92, south: 95, west: 92, horizontal: 155 }, days: 30 },
    { temperature: 21.0, solarRadiation: { north: 60, east: 110, south: 92, west: 110, horizontal: 195 }, days: 31 },
    { temperature: 25.5, solarRadiation: { north: 68, east: 120, south: 88, west: 120, horizontal: 215 }, days: 30 },
    { temperature: 28.5, solarRadiation: { north: 65, east: 122, south: 95, west: 122, horizontal: 225 }, days: 31 },
    { temperature: 28.5, solarRadiation: { north: 50, east: 108, south: 108, west: 108, horizontal: 200 }, days: 31 },
    { temperature: 25.0, solarRadiation: { north: 35, east: 84, south: 112, west: 84, horizontal: 150 }, days: 30 },
    { temperature: 20.0, solarRadiation: { north: 24, east: 60, south: 100, west: 60, horizontal: 100 }, days: 31 },
    { temperature: 15.0, solarRadiation: { north: 18, east: 43, south: 82, west: 43, horizontal: 65 }, days: 30 },
    { temperature: 11.5, solarRadiation: { north: 15, east: 35, south: 72, west: 35, horizontal: 52 }, days: 31 },
  ],
}

const tropics: ClimateLocation = {
  id: 'zoneTropics',
  name: 'Tropen',
  country: 'WORLD',
  climateZone: 'tropics',
  regionName: 'Referenz Singapur (1° N)',
  monthlyData: [
    { temperature: 26.5, solarRadiation: { north: 45, east: 78, south: 72, west: 78, horizontal: 140 }, days: 31 },
    { temperature: 27.0, solarRadiation: { north: 45, east: 80, south: 65, west: 80, horizontal: 145 }, days: 28 },
    { temperature: 27.5, solarRadiation: { north: 52, east: 85, south: 56, west: 85, horizontal: 155 }, days: 31 },
    { temperature: 28.0, solarRadiation: { north: 62, east: 86, south: 48, west: 86, horizontal: 155 }, days: 30 },
    { temperature: 28.2, solarRadiation: { north: 70, east: 84, south: 44, west: 84, horizontal: 150 }, days: 31 },
    { temperature: 28.0, solarRadiation: { north: 72, east: 82, south: 42, west: 82, horizontal: 148 }, days: 30 },
    { temperature: 27.7, solarRadiation: { north: 70, east: 84, south: 44, west: 84, horizontal: 152 }, days: 31 },
    { temperature: 27.6, solarRadiation: { north: 62, east: 86, south: 50, west: 86, horizontal: 155 }, days: 31 },
    { temperature: 27.6, solarRadiation: { north: 52, east: 85, south: 58, west: 85, horizontal: 152 }, days: 30 },
    { temperature: 27.5, solarRadiation: { north: 46, east: 80, south: 68, west: 80, horizontal: 145 }, days: 31 },
    { temperature: 27.0, solarRadiation: { north: 43, east: 74, south: 72, west: 74, horizontal: 133 }, days: 30 },
    { temperature: 26.4, solarRadiation: { north: 43, east: 72, south: 74, west: 72, horizontal: 132 }, days: 31 },
  ],
}

export const worldClimateLocations: ClimateLocation[] = [
  polar,
  subpolar,
  temperate,
  subtropics,
  tropics,
]

/** Flaechenfarben der Klimazonenkarte (public/maps/klimazonen-welt.png) */
export const worldZoneColors: { id: string; rgb: [number, number, number] }[] = [
  { id: 'zonePolar', rgb: [0xa5, 0xd8, 0xe0] },
  { id: 'zoneSubpolar', rgb: [0x2d, 0x76, 0x84] },
  { id: 'zoneTemperate', rgb: [0x86, 0xbc, 0x29] },
  { id: 'zoneSubtropics', rgb: [0xfa, 0xe7, 0x1f] },
  { id: 'zoneTropics', rgb: [0xef, 0x7a, 0x1f] },
]
