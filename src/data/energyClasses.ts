import type { EnergyClass } from '@/calculation/types'

export const energyClasses: EnergyClass[] = [
  { label: 'A+', minValue: 0, maxValue: 30, color: '#00a651' },
  { label: 'A', minValue: 30, maxValue: 50, color: '#4cb848' },
  { label: 'B', minValue: 50, maxValue: 75, color: '#bdd630' },
  { label: 'C', minValue: 75, maxValue: 100, color: '#fff200' },
  { label: 'D', minValue: 100, maxValue: 130, color: '#feb913' },
  { label: 'E', minValue: 130, maxValue: 160, color: '#f37021' },
  { label: 'F', minValue: 160, maxValue: 200, color: '#ed1c24' },
  { label: 'G', minValue: 200, maxValue: 250, color: '#c1272d' },
  { label: 'H', minValue: 250, maxValue: 400, color: '#8b0000' },
]

export function getEnergyClass(specificDemand: number): string {
  for (const ec of energyClasses) {
    if (specificDemand < ec.maxValue) {
      return ec.label
    }
  }
  return 'H'
}
