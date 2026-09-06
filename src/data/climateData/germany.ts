import type { ClimateLocation } from '@/calculation/types'

// Monthly climate data for German reference cities
// Sources: DWD TRY (Testreferenzjahre), DIN 4108-6
// All 15 TRY climate zones

// TRY 01 – Bremerhaven (coastal, North Sea, ~10m a.s.l.)
const bremerhaven: ClimateLocation = {
  id: 'bremerhaven',
  name: 'Bremerhaven',
  country: 'DE',
  tryRegion: 1,
  regionName: 'Nordseeküste',
  monthlyData: [
    { temperature: 1.8, solarRadiation: { north: 6, east: 9, south: 16, west: 9, horizontal: 12 }, days: 31 },
    { temperature: 2.0, solarRadiation: { north: 10, east: 16, south: 27, west: 15, horizontal: 22 }, days: 28 },
    { temperature: 4.5, solarRadiation: { north: 18, east: 32, south: 43, west: 30, horizontal: 44 }, days: 31 },
    { temperature: 8.0, solarRadiation: { north: 32, east: 52, south: 52, west: 50, horizontal: 78 }, days: 30 },
    { temperature: 12.2, solarRadiation: { north: 46, east: 70, south: 62, west: 68, horizontal: 112 }, days: 31 },
    { temperature: 15.0, solarRadiation: { north: 52, east: 74, south: 60, west: 72, horizontal: 122 }, days: 30 },
    { temperature: 17.0, solarRadiation: { north: 48, east: 70, south: 58, west: 68, horizontal: 116 }, days: 31 },
    { temperature: 16.8, solarRadiation: { north: 36, east: 58, south: 56, west: 56, horizontal: 96 }, days: 31 },
    { temperature: 13.8, solarRadiation: { north: 22, east: 38, south: 46, west: 36, horizontal: 60 }, days: 30 },
    { temperature: 10.0, solarRadiation: { north: 12, east: 21, south: 32, west: 20, horizontal: 30 }, days: 31 },
    { temperature: 5.8, solarRadiation: { north: 7, east: 11, south: 18, west: 11, horizontal: 14 }, days: 30 },
    { temperature: 2.8, solarRadiation: { north: 5, east: 7, south: 12, west: 7, horizontal: 9 }, days: 31 },
  ],
}

// TRY 02 – Rostock (coastal, Baltic Sea, ~13m a.s.l.)
const rostock: ClimateLocation = {
  id: 'rostock',
  name: 'Rostock',
  country: 'DE',
  tryRegion: 2,
  regionName: 'Ostseeküste',
  monthlyData: [
    { temperature: 0.8, solarRadiation: { north: 6, east: 10, south: 18, west: 10, horizontal: 13 }, days: 31 },
    { temperature: 1.0, solarRadiation: { north: 10, east: 17, south: 30, west: 16, horizontal: 24 }, days: 28 },
    { temperature: 3.8, solarRadiation: { north: 19, east: 34, south: 46, west: 32, horizontal: 48 }, days: 31 },
    { temperature: 7.5, solarRadiation: { north: 33, east: 55, south: 56, west: 53, horizontal: 82 }, days: 30 },
    { temperature: 12.0, solarRadiation: { north: 48, east: 73, south: 66, west: 71, horizontal: 118 }, days: 31 },
    { temperature: 15.5, solarRadiation: { north: 55, east: 78, south: 64, west: 76, horizontal: 130 }, days: 30 },
    { temperature: 17.5, solarRadiation: { north: 50, east: 74, south: 62, west: 72, horizontal: 124 }, days: 31 },
    { temperature: 17.2, solarRadiation: { north: 38, east: 62, south: 60, west: 60, horizontal: 102 }, days: 31 },
    { temperature: 13.5, solarRadiation: { north: 23, east: 40, south: 50, west: 38, horizontal: 64 }, days: 30 },
    { temperature: 9.2, solarRadiation: { north: 13, east: 23, south: 35, west: 22, horizontal: 33 }, days: 31 },
    { temperature: 4.8, solarRadiation: { north: 7, east: 12, south: 20, west: 12, horizontal: 16 }, days: 30 },
    { temperature: 1.8, solarRadiation: { north: 5, east: 7, south: 14, west: 7, horizontal: 10 }, days: 31 },
  ],
}

// TRY 03 – Hamburg (maritime lowlands, ~14m a.s.l.)
const hamburg: ClimateLocation = {
  id: 'hamburg',
  name: 'Hamburg',
  country: 'DE',
  tryRegion: 3,
  regionName: 'Norddeutsches Tiefland',
  monthlyData: [
    { temperature: 1.2, solarRadiation: { north: 6, east: 10, south: 17, west: 10, horizontal: 13 }, days: 31 },
    { temperature: 1.5, solarRadiation: { north: 10, east: 17, south: 28, west: 16, horizontal: 23 }, days: 28 },
    { temperature: 4.5, solarRadiation: { north: 18, east: 33, south: 45, west: 31, horizontal: 46 }, days: 31 },
    { temperature: 8.2, solarRadiation: { north: 32, east: 53, south: 54, west: 51, horizontal: 80 }, days: 30 },
    { temperature: 12.5, solarRadiation: { north: 46, east: 70, south: 64, west: 68, horizontal: 114 }, days: 31 },
    { temperature: 15.5, solarRadiation: { north: 52, east: 74, south: 62, west: 72, horizontal: 124 }, days: 30 },
    { temperature: 17.5, solarRadiation: { north: 48, east: 70, south: 60, west: 68, horizontal: 118 }, days: 31 },
    { temperature: 17.0, solarRadiation: { north: 36, east: 60, south: 58, west: 58, horizontal: 98 }, days: 31 },
    { temperature: 13.5, solarRadiation: { north: 22, east: 38, south: 47, west: 37, horizontal: 62 }, days: 30 },
    { temperature: 9.5, solarRadiation: { north: 13, east: 22, south: 33, west: 21, horizontal: 32 }, days: 31 },
    { temperature: 5.2, solarRadiation: { north: 7, east: 11, south: 19, west: 11, horizontal: 15 }, days: 30 },
    { temperature: 2.2, solarRadiation: { north: 5, east: 7, south: 13, west: 7, horizontal: 10 }, days: 31 },
  ],
}

// TRY 04 – Potsdam (continental lowlands, ~81m a.s.l.)
const potsdam: ClimateLocation = {
  id: 'potsdam',
  name: 'Potsdam',
  country: 'DE',
  tryRegion: 4,
  regionName: 'Norddeutsches Tiefland (Ost)',
  monthlyData: [
    { temperature: -0.5, solarRadiation: { north: 7, east: 11, south: 22, west: 11, horizontal: 16 }, days: 31 },
    { temperature: 0.5, solarRadiation: { north: 11, east: 19, south: 33, west: 18, horizontal: 27 }, days: 28 },
    { temperature: 4.0, solarRadiation: { north: 20, east: 37, south: 51, west: 35, horizontal: 52 }, days: 31 },
    { temperature: 8.5, solarRadiation: { north: 33, east: 56, south: 60, west: 54, horizontal: 85 }, days: 30 },
    { temperature: 13.5, solarRadiation: { north: 48, east: 74, south: 68, west: 72, horizontal: 120 }, days: 31 },
    { temperature: 16.5, solarRadiation: { north: 55, east: 78, south: 66, west: 77, horizontal: 132 }, days: 30 },
    { temperature: 18.5, solarRadiation: { north: 50, east: 76, south: 67, west: 74, horizontal: 128 }, days: 31 },
    { temperature: 18.0, solarRadiation: { north: 38, east: 64, south: 65, west: 62, horizontal: 108 }, days: 31 },
    { temperature: 14.0, solarRadiation: { north: 23, east: 42, south: 53, west: 41, horizontal: 68 }, days: 30 },
    { temperature: 9.0, solarRadiation: { north: 14, east: 26, south: 39, west: 25, horizontal: 38 }, days: 31 },
    { temperature: 4.5, solarRadiation: { north: 8, east: 13, south: 22, west: 13, horizontal: 18 }, days: 30 },
    { temperature: 1.0, solarRadiation: { north: 5, east: 8, south: 16, west: 8, horizontal: 11 }, days: 31 },
  ],
}

// TRY 05 – Essen (maritime, Ruhr area, ~152m a.s.l.)
const essen: ClimateLocation = {
  id: 'essen',
  name: 'Essen',
  country: 'DE',
  tryRegion: 5,
  regionName: 'Niederrheinisch-Westfälische Bucht',
  monthlyData: [
    { temperature: 1.5, solarRadiation: { north: 7, east: 10, south: 18, west: 10, horizontal: 14 }, days: 31 },
    { temperature: 2.2, solarRadiation: { north: 10, east: 17, south: 29, west: 16, horizontal: 24 }, days: 28 },
    { temperature: 5.2, solarRadiation: { north: 18, east: 33, south: 46, west: 32, horizontal: 47 }, days: 31 },
    { temperature: 8.8, solarRadiation: { north: 31, east: 52, south: 55, west: 50, horizontal: 78 }, days: 30 },
    { temperature: 13.0, solarRadiation: { north: 44, east: 68, south: 62, west: 66, horizontal: 110 }, days: 31 },
    { temperature: 15.8, solarRadiation: { north: 50, east: 72, south: 60, west: 70, horizontal: 118 }, days: 30 },
    { temperature: 17.8, solarRadiation: { north: 46, east: 68, south: 60, west: 66, horizontal: 114 }, days: 31 },
    { temperature: 17.5, solarRadiation: { north: 35, east: 58, south: 58, west: 56, horizontal: 96 }, days: 31 },
    { temperature: 14.0, solarRadiation: { north: 22, east: 38, south: 47, west: 37, horizontal: 62 }, days: 30 },
    { temperature: 10.0, solarRadiation: { north: 13, east: 22, south: 34, west: 22, horizontal: 33 }, days: 31 },
    { temperature: 5.5, solarRadiation: { north: 7, east: 12, south: 20, west: 12, horizontal: 16 }, days: 30 },
    { temperature: 2.5, solarRadiation: { north: 5, east: 8, south: 14, west: 8, horizontal: 10 }, days: 31 },
  ],
}

// TRY 06 – Bad Marienberg (Westerwald uplands, ~547m a.s.l.)
const badMarienberg: ClimateLocation = {
  id: 'badMarienberg',
  name: 'Bad Marienberg',
  country: 'DE',
  tryRegion: 6,
  regionName: 'Mittelgebirge (West)',
  monthlyData: [
    { temperature: -1.0, solarRadiation: { north: 7, east: 11, south: 20, west: 11, horizontal: 15 }, days: 31 },
    { temperature: -0.5, solarRadiation: { north: 11, east: 18, south: 31, west: 17, horizontal: 25 }, days: 28 },
    { temperature: 3.0, solarRadiation: { north: 19, east: 35, south: 48, west: 33, horizontal: 49 }, days: 31 },
    { temperature: 7.0, solarRadiation: { north: 32, east: 54, south: 57, west: 52, horizontal: 82 }, days: 30 },
    { temperature: 11.5, solarRadiation: { north: 46, east: 70, south: 64, west: 68, horizontal: 112 }, days: 31 },
    { temperature: 14.5, solarRadiation: { north: 52, east: 74, south: 62, west: 72, horizontal: 122 }, days: 30 },
    { temperature: 16.2, solarRadiation: { north: 48, east: 70, south: 62, west: 68, horizontal: 118 }, days: 31 },
    { temperature: 16.0, solarRadiation: { north: 36, east: 60, south: 60, west: 58, horizontal: 100 }, days: 31 },
    { temperature: 12.5, solarRadiation: { north: 22, east: 40, south: 50, west: 38, horizontal: 64 }, days: 30 },
    { temperature: 8.2, solarRadiation: { north: 13, east: 23, south: 36, west: 23, horizontal: 34 }, days: 31 },
    { temperature: 3.5, solarRadiation: { north: 7, east: 12, south: 20, west: 12, horizontal: 16 }, days: 30 },
    { temperature: 0.5, solarRadiation: { north: 5, east: 8, south: 15, west: 8, horizontal: 11 }, days: 31 },
  ],
}

// TRY 07 – Kassel (central German hills, ~231m a.s.l.)
const kassel: ClimateLocation = {
  id: 'kassel',
  name: 'Kassel',
  country: 'DE',
  tryRegion: 7,
  regionName: 'Mittelgebirge (Zentral)',
  monthlyData: [
    { temperature: 0.2, solarRadiation: { north: 7, east: 11, south: 20, west: 11, horizontal: 15 }, days: 31 },
    { temperature: 1.0, solarRadiation: { north: 11, east: 18, south: 32, west: 17, horizontal: 26 }, days: 28 },
    { temperature: 4.5, solarRadiation: { north: 19, east: 36, south: 50, west: 34, horizontal: 51 }, days: 31 },
    { temperature: 8.5, solarRadiation: { north: 33, east: 55, south: 58, west: 53, horizontal: 84 }, days: 30 },
    { temperature: 13.0, solarRadiation: { north: 47, east: 72, south: 66, west: 70, horizontal: 116 }, days: 31 },
    { temperature: 16.0, solarRadiation: { north: 53, east: 76, south: 64, west: 74, horizontal: 126 }, days: 30 },
    { temperature: 18.0, solarRadiation: { north: 48, east: 72, south: 64, west: 70, horizontal: 120 }, days: 31 },
    { temperature: 17.5, solarRadiation: { north: 37, east: 62, south: 62, west: 60, horizontal: 102 }, days: 31 },
    { temperature: 13.5, solarRadiation: { north: 23, east: 40, south: 50, west: 39, horizontal: 65 }, days: 30 },
    { temperature: 9.0, solarRadiation: { north: 13, east: 24, south: 36, west: 23, horizontal: 35 }, days: 31 },
    { temperature: 4.5, solarRadiation: { north: 7, east: 12, south: 21, west: 12, horizontal: 17 }, days: 30 },
    { temperature: 1.2, solarRadiation: { north: 5, east: 8, south: 15, west: 8, horizontal: 11 }, days: 31 },
  ],
}

// TRY 08 – Braunlage (Harz mountains, ~607m a.s.l.)
const braunlage: ClimateLocation = {
  id: 'braunlage',
  name: 'Braunlage',
  country: 'DE',
  tryRegion: 8,
  regionName: 'Mittelgebirge (Ost)',
  monthlyData: [
    { temperature: -2.5, solarRadiation: { north: 7, east: 11, south: 20, west: 11, horizontal: 15 }, days: 31 },
    { temperature: -2.0, solarRadiation: { north: 11, east: 19, south: 33, west: 18, horizontal: 27 }, days: 28 },
    { temperature: 1.5, solarRadiation: { north: 20, east: 36, south: 50, west: 34, horizontal: 52 }, days: 31 },
    { temperature: 5.5, solarRadiation: { north: 33, east: 55, south: 58, west: 53, horizontal: 84 }, days: 30 },
    { temperature: 10.5, solarRadiation: { north: 47, east: 72, south: 66, west: 70, horizontal: 116 }, days: 31 },
    { temperature: 13.5, solarRadiation: { north: 53, east: 76, south: 64, west: 74, horizontal: 126 }, days: 30 },
    { temperature: 15.2, solarRadiation: { north: 48, east: 72, south: 64, west: 70, horizontal: 120 }, days: 31 },
    { temperature: 15.0, solarRadiation: { north: 37, east: 62, south: 62, west: 60, horizontal: 102 }, days: 31 },
    { temperature: 11.2, solarRadiation: { north: 23, east: 40, south: 50, west: 39, horizontal: 66 }, days: 30 },
    { temperature: 7.0, solarRadiation: { north: 14, east: 24, south: 37, west: 24, horizontal: 36 }, days: 31 },
    { temperature: 2.5, solarRadiation: { north: 8, east: 12, south: 21, west: 12, horizontal: 17 }, days: 30 },
    { temperature: -1.0, solarRadiation: { north: 5, east: 8, south: 16, west: 8, horizontal: 11 }, days: 31 },
  ],
}

// TRY 09 – Chemnitz (Saxon hills, ~418m a.s.l.)
const chemnitz: ClimateLocation = {
  id: 'chemnitz',
  name: 'Chemnitz',
  country: 'DE',
  tryRegion: 9,
  regionName: 'Erzgebirge',
  monthlyData: [
    { temperature: -1.2, solarRadiation: { north: 7, east: 11, south: 21, west: 11, horizontal: 15 }, days: 31 },
    { temperature: -0.2, solarRadiation: { north: 11, east: 19, south: 33, west: 18, horizontal: 27 }, days: 28 },
    { temperature: 3.5, solarRadiation: { north: 20, east: 37, south: 51, west: 35, horizontal: 52 }, days: 31 },
    { temperature: 7.8, solarRadiation: { north: 33, east: 56, south: 60, west: 54, horizontal: 86 }, days: 30 },
    { temperature: 12.8, solarRadiation: { north: 48, east: 74, south: 68, west: 72, horizontal: 120 }, days: 31 },
    { temperature: 15.8, solarRadiation: { north: 54, east: 78, south: 66, west: 76, horizontal: 130 }, days: 30 },
    { temperature: 17.5, solarRadiation: { north: 50, east: 74, south: 66, west: 72, horizontal: 125 }, days: 31 },
    { temperature: 17.2, solarRadiation: { north: 38, east: 64, south: 64, west: 62, horizontal: 106 }, days: 31 },
    { temperature: 13.2, solarRadiation: { north: 23, east: 42, south: 52, west: 40, horizontal: 67 }, days: 30 },
    { temperature: 8.5, solarRadiation: { north: 14, east: 25, south: 38, west: 25, horizontal: 37 }, days: 31 },
    { temperature: 3.8, solarRadiation: { north: 8, east: 13, south: 22, west: 13, horizontal: 18 }, days: 30 },
    { temperature: 0.2, solarRadiation: { north: 5, east: 8, south: 16, west: 8, horizontal: 11 }, days: 31 },
  ],
}

// TRY 10 – Hof (Bavarian uplands, ~567m a.s.l.)
const hof: ClimateLocation = {
  id: 'hof',
  name: 'Hof',
  country: 'DE',
  tryRegion: 10,
  regionName: 'Fichtelgebirge/Oberfranken',
  monthlyData: [
    { temperature: -2.0, solarRadiation: { north: 7, east: 11, south: 21, west: 11, horizontal: 15 }, days: 31 },
    { temperature: -1.2, solarRadiation: { north: 11, east: 19, south: 34, west: 18, horizontal: 28 }, days: 28 },
    { temperature: 2.5, solarRadiation: { north: 20, east: 37, south: 52, west: 35, horizontal: 53 }, days: 31 },
    { temperature: 6.8, solarRadiation: { north: 33, east: 56, south: 60, west: 54, horizontal: 86 }, days: 30 },
    { temperature: 11.8, solarRadiation: { north: 48, east: 74, south: 68, west: 72, horizontal: 120 }, days: 31 },
    { temperature: 14.8, solarRadiation: { north: 54, east: 78, south: 66, west: 76, horizontal: 130 }, days: 30 },
    { temperature: 16.5, solarRadiation: { north: 50, east: 74, south: 66, west: 72, horizontal: 126 }, days: 31 },
    { temperature: 16.2, solarRadiation: { north: 38, east: 64, south: 64, west: 62, horizontal: 106 }, days: 31 },
    { temperature: 12.2, solarRadiation: { north: 23, east: 42, south: 53, west: 40, horizontal: 68 }, days: 30 },
    { temperature: 7.5, solarRadiation: { north: 14, east: 25, south: 39, west: 25, horizontal: 37 }, days: 31 },
    { temperature: 2.8, solarRadiation: { north: 8, east: 13, south: 22, west: 13, horizontal: 18 }, days: 30 },
    { temperature: -0.5, solarRadiation: { north: 5, east: 8, south: 16, west: 8, horizontal: 11 }, days: 31 },
  ],
}

// TRY 11 – Fichtelberg (Erzgebirge summit, ~1213m a.s.l.)
const fichtelberg: ClimateLocation = {
  id: 'fichtelberg',
  name: 'Fichtelberg',
  country: 'DE',
  tryRegion: 11,
  regionName: 'Erzgebirge (Gipfel)',
  monthlyData: [
    { temperature: -5.0, solarRadiation: { north: 8, east: 13, south: 24, west: 13, horizontal: 18 }, days: 31 },
    { temperature: -5.0, solarRadiation: { north: 13, east: 22, south: 38, west: 21, horizontal: 32 }, days: 28 },
    { temperature: -2.0, solarRadiation: { north: 22, east: 40, south: 55, west: 38, horizontal: 58 }, days: 31 },
    { temperature: 2.0, solarRadiation: { north: 34, east: 58, south: 62, west: 56, horizontal: 88 }, days: 30 },
    { temperature: 7.0, solarRadiation: { north: 48, east: 74, south: 68, west: 72, horizontal: 120 }, days: 31 },
    { temperature: 10.0, solarRadiation: { north: 54, east: 78, south: 66, west: 76, horizontal: 130 }, days: 30 },
    { temperature: 11.8, solarRadiation: { north: 50, east: 74, south: 66, west: 72, horizontal: 126 }, days: 31 },
    { temperature: 11.5, solarRadiation: { north: 38, east: 64, south: 65, west: 62, horizontal: 108 }, days: 31 },
    { temperature: 8.0, solarRadiation: { north: 24, east: 42, south: 54, west: 41, horizontal: 68 }, days: 30 },
    { temperature: 4.0, solarRadiation: { north: 15, east: 26, south: 40, west: 26, horizontal: 38 }, days: 31 },
    { temperature: -0.5, solarRadiation: { north: 9, east: 14, south: 24, west: 14, horizontal: 19 }, days: 30 },
    { temperature: -3.5, solarRadiation: { north: 6, east: 10, south: 18, west: 10, horizontal: 13 }, days: 31 },
  ],
}

// TRY 12 – Mannheim (Upper Rhine valley, ~96m a.s.l.)
const mannheim: ClimateLocation = {
  id: 'mannheim',
  name: 'Mannheim',
  country: 'DE',
  tryRegion: 12,
  regionName: 'Oberrheingraben',
  monthlyData: [
    { temperature: 1.5, solarRadiation: { north: 8, east: 13, south: 25, west: 13, horizontal: 19 }, days: 31 },
    { temperature: 2.5, solarRadiation: { north: 13, east: 22, south: 38, west: 21, horizontal: 32 }, days: 28 },
    { temperature: 6.5, solarRadiation: { north: 22, east: 42, south: 58, west: 40, horizontal: 60 }, days: 31 },
    { temperature: 10.5, solarRadiation: { north: 36, east: 62, south: 66, west: 60, horizontal: 95 }, days: 30 },
    { temperature: 14.8, solarRadiation: { north: 52, east: 80, south: 74, west: 78, horizontal: 132 }, days: 31 },
    { temperature: 18.0, solarRadiation: { north: 58, east: 84, south: 72, west: 82, horizontal: 142 }, days: 30 },
    { temperature: 20.0, solarRadiation: { north: 54, east: 82, south: 74, west: 80, horizontal: 140 }, days: 31 },
    { temperature: 19.5, solarRadiation: { north: 42, east: 70, south: 72, west: 68, horizontal: 118 }, days: 31 },
    { temperature: 15.5, solarRadiation: { north: 26, east: 48, south: 60, west: 46, horizontal: 78 }, days: 30 },
    { temperature: 10.5, solarRadiation: { north: 16, east: 29, south: 44, west: 28, horizontal: 42 }, days: 31 },
    { temperature: 5.5, solarRadiation: { north: 9, east: 14, south: 25, west: 14, horizontal: 20 }, days: 30 },
    { temperature: 2.2, solarRadiation: { north: 6, east: 10, south: 19, west: 10, horizontal: 14 }, days: 31 },
  ],
}

// TRY 13 – Muehldorf a. Inn (Bavarian lowlands, ~406m a.s.l.)
const muehldorf: ClimateLocation = {
  id: 'muehldorf',
  name: 'Mühldorf a.Inn',
  country: 'DE',
  tryRegion: 13,
  regionName: 'Bayerisches Alpenvorland (Ost)',
  monthlyData: [
    { temperature: -1.5, solarRadiation: { north: 8, east: 13, south: 26, west: 13, horizontal: 19 }, days: 31 },
    { temperature: 0.0, solarRadiation: { north: 13, east: 22, south: 38, west: 21, horizontal: 32 }, days: 28 },
    { temperature: 4.5, solarRadiation: { north: 22, east: 42, south: 58, west: 40, horizontal: 60 }, days: 31 },
    { temperature: 8.5, solarRadiation: { north: 36, east: 60, south: 64, west: 58, horizontal: 92 }, days: 30 },
    { temperature: 13.5, solarRadiation: { north: 50, east: 78, south: 72, west: 76, horizontal: 128 }, days: 31 },
    { temperature: 16.5, solarRadiation: { north: 56, east: 82, south: 70, west: 80, horizontal: 138 }, days: 30 },
    { temperature: 18.2, solarRadiation: { north: 52, east: 78, south: 70, west: 76, horizontal: 134 }, days: 31 },
    { temperature: 17.8, solarRadiation: { north: 40, east: 68, south: 70, west: 66, horizontal: 114 }, days: 31 },
    { temperature: 13.8, solarRadiation: { north: 25, east: 46, south: 58, west: 44, horizontal: 74 }, days: 30 },
    { temperature: 8.8, solarRadiation: { north: 16, east: 28, south: 43, west: 28, horizontal: 42 }, days: 31 },
    { temperature: 3.5, solarRadiation: { north: 9, east: 14, south: 25, west: 14, horizontal: 20 }, days: 30 },
    { temperature: 0.0, solarRadiation: { north: 6, east: 10, south: 19, west: 10, horizontal: 14 }, days: 31 },
  ],
}

// TRY 14 – Stoetten (Swabian Alb, ~734m a.s.l.)
const stoetten: ClimateLocation = {
  id: 'stoetten',
  name: 'Stötten',
  country: 'DE',
  tryRegion: 14,
  regionName: 'Schwäbische Alb',
  monthlyData: [
    { temperature: -2.0, solarRadiation: { north: 8, east: 13, south: 24, west: 13, horizontal: 18 }, days: 31 },
    { temperature: -1.2, solarRadiation: { north: 12, east: 21, south: 36, west: 20, horizontal: 30 }, days: 28 },
    { temperature: 2.5, solarRadiation: { north: 21, east: 40, south: 55, west: 38, horizontal: 57 }, days: 31 },
    { temperature: 6.5, solarRadiation: { north: 34, east: 58, south: 63, west: 56, horizontal: 90 }, days: 30 },
    { temperature: 11.5, solarRadiation: { north: 50, east: 76, south: 70, west: 74, horizontal: 124 }, days: 31 },
    { temperature: 14.5, solarRadiation: { north: 56, east: 80, south: 68, west: 78, horizontal: 134 }, days: 30 },
    { temperature: 16.2, solarRadiation: { north: 52, east: 76, south: 68, west: 74, horizontal: 130 }, days: 31 },
    { temperature: 16.0, solarRadiation: { north: 40, east: 66, south: 68, west: 64, horizontal: 112 }, days: 31 },
    { temperature: 12.2, solarRadiation: { north: 25, east: 44, south: 56, west: 43, horizontal: 72 }, days: 30 },
    { temperature: 7.5, solarRadiation: { north: 15, east: 27, south: 42, west: 27, horizontal: 40 }, days: 31 },
    { temperature: 2.5, solarRadiation: { north: 9, east: 14, south: 24, west: 14, horizontal: 19 }, days: 30 },
    { temperature: -0.5, solarRadiation: { north: 6, east: 9, south: 18, west: 9, horizontal: 13 }, days: 31 },
  ],
}

// TRY 15 – Garmisch-Partenkirchen (Alpine foothills, ~719m a.s.l.)
const garmisch: ClimateLocation = {
  id: 'garmisch',
  name: 'Garmisch-Partenk.',
  country: 'DE',
  tryRegion: 15,
  regionName: 'Alpenrand',
  monthlyData: [
    { temperature: -2.5, solarRadiation: { north: 9, east: 14, south: 28, west: 14, horizontal: 20 }, days: 31 },
    { temperature: -1.0, solarRadiation: { north: 14, east: 24, south: 42, west: 23, horizontal: 34 }, days: 28 },
    { temperature: 3.0, solarRadiation: { north: 23, east: 44, south: 60, west: 42, horizontal: 64 }, days: 31 },
    { temperature: 7.0, solarRadiation: { north: 36, east: 62, south: 66, west: 60, horizontal: 95 }, days: 30 },
    { temperature: 12.0, solarRadiation: { north: 50, east: 78, south: 72, west: 76, horizontal: 128 }, days: 31 },
    { temperature: 15.0, solarRadiation: { north: 56, east: 82, south: 70, west: 80, horizontal: 138 }, days: 30 },
    { temperature: 16.8, solarRadiation: { north: 52, east: 78, south: 70, west: 76, horizontal: 134 }, days: 31 },
    { temperature: 16.5, solarRadiation: { north: 40, east: 68, south: 70, west: 66, horizontal: 114 }, days: 31 },
    { temperature: 12.5, solarRadiation: { north: 26, east: 46, south: 58, west: 44, horizontal: 75 }, days: 30 },
    { temperature: 8.0, solarRadiation: { north: 16, east: 29, south: 44, west: 28, horizontal: 43 }, days: 31 },
    { temperature: 2.5, solarRadiation: { north: 10, east: 15, south: 26, west: 15, horizontal: 21 }, days: 30 },
    { temperature: -1.5, solarRadiation: { north: 7, east: 11, south: 20, west: 11, horizontal: 15 }, days: 31 },
  ],
}

// Wuerzburg is not a standard TRY station but kept for backward compatibility
// with existing tests and presets (located between TRY 12 and TRY 07, ~268m a.s.l.)
const wuerzburg: ClimateLocation = {
  id: 'wuerzburg',
  name: 'Würzburg',
  country: 'DE',
  monthlyData: [
    { temperature: -0.6, solarRadiation: { north: 8, east: 13, south: 25, west: 13, horizontal: 18 }, days: 31 },
    { temperature: 0.8, solarRadiation: { north: 12, east: 21, south: 37, west: 20, horizontal: 30 }, days: 28 },
    { temperature: 4.5, solarRadiation: { north: 21, east: 40, south: 56, west: 38, horizontal: 56 }, days: 31 },
    { temperature: 8.8, solarRadiation: { north: 35, east: 60, south: 65, west: 58, horizontal: 92 }, days: 30 },
    { temperature: 13.5, solarRadiation: { north: 50, east: 78, south: 72, west: 76, horizontal: 126 }, days: 31 },
    { temperature: 16.8, solarRadiation: { north: 57, east: 82, south: 70, west: 80, horizontal: 138 }, days: 30 },
    { temperature: 18.8, solarRadiation: { north: 52, east: 80, south: 72, west: 78, horizontal: 135 }, days: 31 },
    { temperature: 18.2, solarRadiation: { north: 40, east: 68, south: 70, west: 66, horizontal: 114 }, days: 31 },
    { temperature: 14.2, solarRadiation: { north: 25, east: 46, south: 58, west: 44, horizontal: 74 }, days: 30 },
    { temperature: 9.0, solarRadiation: { north: 15, east: 28, south: 42, west: 27, horizontal: 40 }, days: 31 },
    { temperature: 4.2, solarRadiation: { north: 9, east: 14, south: 25, west: 14, horizontal: 20 }, days: 30 },
    { temperature: 0.8, solarRadiation: { north: 6, east: 10, south: 19, west: 10, horizontal: 13 }, days: 31 },
  ],
}

export const climateLocations: ClimateLocation[] = [
  bremerhaven,
  rostock,
  hamburg,
  potsdam,
  essen,
  badMarienberg,
  kassel,
  braunlage,
  chemnitz,
  hof,
  fichtelberg,
  mannheim,
  muehldorf,
  stoetten,
  garmisch,
  wuerzburg,
]

export function getClimateLocation(id: string): ClimateLocation | undefined {
  return climateLocations.find((loc) => loc.id === id)
}

export function getClimateLocationsByCountry(country: string): ClimateLocation[] {
  return climateLocations.filter((loc) => loc.country === country)
}
