import { useTranslation } from 'react-i18next'
import { Slider } from '@/components/ui/slider'

interface ParameterSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  unit: string
  decimals?: number
}

export function ParameterSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  decimals = 2,
}: ParameterSliderProps) {
  const { t } = useTranslation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    if (!isNaN(val)) {
      onChange(Math.min(max, Math.max(min, val)))
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs text-foreground leading-tight">
          {t(label)}
        </label>
        <div className="flex items-center gap-1 shrink-0">
          <input
            type="number"
            value={value.toFixed(decimals)}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className="w-16 text-xs text-right border border-input rounded px-1 py-0.5 bg-background"
          />
          <span className="text-xs text-muted-foreground w-14 text-left">
            {t(unit)}
          </span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  )
}
