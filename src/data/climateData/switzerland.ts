import type { ClimateLocation } from '@/calculation/types'

// Monthly climate data for Swiss reference cities
// Sources: SIA 2028, MeteoSchweiz

const zuerich: ClimateLocation = {
  id: 'zuerich',
  name: 'Zürich',
  country: 'CH',
  monthlyData: [
    { temperature: 0.3, solarRadiation: { north: 8, east: 13, south: 24, west: 12, horizontal: 18 }, days: 31 },
    { temperature: 1.5, solarRadiation: { north: 13, east: 22, south: 37, west: 21, horizontal: 30 }, days: 28 },
    { temperature: 5.3, solarRadiation: { north: 22, east: 40, south: 54, west: 38, horizontal: 56 }, days: 31 },
    { temperature: 8.8, solarRadiation: { north: 34, east: 58, south: 62, west: 56, horizontal: 88 }, days: 30 },
    { temperature: 13.2, solarRadiation: { north: 48, east: 74, south: 68, west: 72, horizontal: 118 }, days: 31 },
    { temperature: 16.5, solarRadiation: { north: 55, east: 80, south: 68, west: 78, horizontal: 134 }, days: 30 },
    { temperature: 18.6, solarRadiation: { north: 52, east: 78, south: 70, west: 76, horizontal: 132 }, days: 31 },
    { temperature: 17.8, solarRadiation: { north: 40, east: 66, south: 68, west: 64, horizontal: 110 }, days: 31 },
    { temperature: 14.0, solarRadiation: { north: 25, east: 44, south: 56, west: 42, horizontal: 72 }, days: 30 },
    { temperature: 9.2, solarRadiation: { north: 15, east: 27, south: 40, west: 26, horizontal: 39 }, days: 31 },
    { temperature: 4.5, solarRadiation: { north: 9, east: 14, south: 24, west: 14, horizontal: 19 }, days: 30 },
    { temperature: 1.2, solarRadiation: { north: 6, east: 9, south: 18, west: 9, horizontal: 12 }, days: 31 },
  ],
}

const bern: ClimateLocation = {
  id: 'bern',
  name: 'Bern',
  country: 'CH',
  monthlyData: [
    { temperature: -0.4, solarRadiation: { north: 7, east: 12, south: 22, west: 11, horizontal: 16 }, days: 31 },
    { temperature: 1.0, solarRadiation: { north: 12, east: 20, south: 35, west: 19, horizontal: 28 }, days: 28 },
    { temperature: 4.8, solarRadiation: { north: 20, east: 38, south: 52, west: 36, horizontal: 53 }, days: 31 },
    { temperature: 8.2, solarRadiation: { north: 32, east: 55, south: 60, west: 53, horizontal: 84 }, days: 30 },
    { temperature: 12.8, solarRadiation: { north: 46, east: 72, south: 66, west: 70, horizontal: 116 }, days: 31 },
    { temperature: 16.0, solarRadiation: { north: 53, east: 78, south: 66, west: 76, horizontal: 130 }, days: 30 },
    { temperature: 18.2, solarRadiation: { north: 50, east: 76, south: 68, west: 74, horizontal: 128 }, days: 31 },
    { temperature: 17.4, solarRadiation: { north: 38, east: 64, south: 66, west: 62, horizontal: 106 }, days: 31 },
    { temperature: 13.5, solarRadiation: { north: 24, east: 42, south: 54, west: 40, horizontal: 68 }, days: 30 },
    { temperature: 8.8, solarRadiation: { north: 14, east: 26, south: 38, west: 25, horizontal: 37 }, days: 31 },
    { temperature: 4.0, solarRadiation: { north: 8, east: 13, south: 22, west: 13, horizontal: 18 }, days: 30 },
    { temperature: 0.5, solarRadiation: { north: 5, east: 8, south: 16, west: 8, horizontal: 11 }, days: 31 },
  ],
}

const lugano: ClimateLocation = {
  id: 'lugano',
  name: 'Lugano',
  country: 'CH',
  monthlyData: [
    { temperature: 3.0, solarRadiation: { north: 10, east: 16, south: 30, west: 15, horizontal: 22 }, days: 31 },
    { temperature: 4.2, solarRadiation: { north: 14, east: 24, south: 40, west: 23, horizontal: 34 }, days: 28 },
    { temperature: 7.8, solarRadiation: { north: 24, east: 44, south: 58, west: 42, horizontal: 62 }, days: 31 },
    { temperature: 11.5, solarRadiation: { north: 36, east: 62, south: 66, west: 60, horizontal: 95 }, days: 30 },
    { temperature: 15.5, solarRadiation: { north: 50, east: 78, south: 72, west: 76, horizontal: 128 }, days: 31 },
    { temperature: 19.0, solarRadiation: { north: 58, east: 84, south: 72, west: 82, horizontal: 142 }, days: 30 },
    { temperature: 21.5, solarRadiation: { north: 55, east: 82, south: 74, west: 80, horizontal: 140 }, days: 31 },
    { temperature: 20.8, solarRadiation: { north: 42, east: 70, south: 72, west: 68, horizontal: 118 }, days: 31 },
    { temperature: 17.0, solarRadiation: { north: 28, east: 48, south: 60, west: 46, horizontal: 78 }, days: 30 },
    { temperature: 12.0, solarRadiation: { north: 17, east: 30, south: 45, west: 29, horizontal: 44 }, days: 31 },
    { temperature: 7.0, solarRadiation: { north: 10, east: 16, south: 28, west: 16, horizontal: 22 }, days: 30 },
    { temperature: 3.8, solarRadiation: { north: 7, east: 11, south: 22, west: 11, horizontal: 15 }, days: 31 },
  ],
}

export const swissClimateLocations: ClimateLocation[] = [zuerich, bern, lugano]
