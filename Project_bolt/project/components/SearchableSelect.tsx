'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { SelectOption } from '@/types';
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  label?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  disabled,
  label,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold font-title leading-none">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between font-normal font-title"
          >
           <span className={cn(!value && "text-muted-foreground")}>
  {selectedOption ? (
    selectedOption.latex ? (
      <InlineMath math={selectedOption.latex} />
    ) : (
      selectedOption.label
    )
  ) : (
    placeholder
  )}
</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={`${option.value} ${option.label}`}
                    onSelect={(currentValue) => {
  const selected = options.find(
    o => o.value === currentValue ||
         `${o.value} ${o.label}` === currentValue
  );

  if (!selected) return;

  onChange(selected.value);
  setOpen(false);
}}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.latex ? (
  <InlineMath math={option.latex} />
) : (
  option.label
)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface MultiSelectProps {
  options: SelectOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  label?: string;
}

export function MultiSelect({
  options,
  values,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  disabled,
  label,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = (optionValue: string) => {
    if (values.includes(optionValue)) {
      onChange(values.filter((v) => v !== optionValue));
    } else {
      onChange([...values, optionValue]);
    }
  };

  const labelFor = (value: string) =>
    options.find((o) => o.value === value)?.latex ?? options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold font-title leading-none">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between font-normal font-title h-auto min-h-[2.5rem]"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {values.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                values.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  >
                    {labelFor(v).includes('\\') || labelFor(v).includes('_') || labelFor(v).includes('/') ? (
                      <InlineMath math={labelFor(v)} />
                    ) : (
                      labelFor(v)
                    )}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(v);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggle(v);
                        }
                      }}
                      className="rounded-sm hover:bg-primary/20"
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </span>
                ))
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => toggle(option.value)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        values.includes(option.value) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.latex ? (
                      <InlineMath math={option.latex} />
                    ) : (
                      option.label
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
