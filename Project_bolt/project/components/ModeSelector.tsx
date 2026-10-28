'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MODE_LABELS, MODE_VALUES } from '@/lib/constants';
import type { CalculationMode } from '@/types';

interface ModeSelectorProps {
  value: CalculationMode;
  onChange: (mode: CalculationMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ value, onChange, disabled }: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold font-title">Calculation Mode</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as CalculationMode)}
        disabled={disabled}
        className="grid grid-cols-1 gap-2"
      >
        {MODE_VALUES.map((mode) => (
          <div
            key={mode}
            className="flex items-center space-x-3 rounded-md border border-border/60 px-3 py-2 transition-colors hover:bg-accent/50 data-[state=checked]:bg-accent"
          >
            <RadioGroupItem value={mode} id={`mode-${mode}`} />
            <Label
              htmlFor={`mode-${mode}`}
              className="text-sm font-normal font-title cursor-pointer flex-1"
            >
              {MODE_LABELS[mode]}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
