'use client';

import * as React from 'react';
import { Loader as Loader2, RotateCcw, Calculator, CircleAlert as AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ModeSelector } from '@/components/ModeSelector';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  SearchableSelect,
  MultiSelect,
} from '@/components/SearchableSelect';
import type { CalculationMode, SelectOption } from '@/types';

interface InputPanelProps {
  jahnSymbol: string;
  mode: CalculationMode;
  selection: string[];
  trs: '0' | '1';
  pointGroupOptions: SelectOption[];
  operationOptions: SelectOption[];
  pointGroupLoading: boolean;
  pointGroupError: string | null;
  operationLoading: boolean;
  operationError: string | null;
  onJahnSymbolChange: (value: string) => void;
  onModeChange: (mode: CalculationMode) => void;
  onSelectionChange: (selection: string[]) => void;
  onTrsChange: (value: '0' | '1') => void;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating: boolean;
}

export function InputPanel({
  jahnSymbol,
  mode,
  selection,
  trs,
  pointGroupOptions,
  operationOptions,
  pointGroupLoading,
  pointGroupError,
  operationLoading,
  operationError,
  onJahnSymbolChange,
  onModeChange,
  onSelectionChange,
  onTrsChange,
  onCalculate,
  onReset,
  isCalculating,
}: InputPanelProps) {
  const disabled = isCalculating;
  const [tensorRankInput, setTensorRankInput] = React.useState('4');
  const tensorRank = Math.max(1, Number(tensorRankInput) || 1);
  const [isAxial, setIsAxial] = React.useState(false);
  const [isOddUnderTrs, setIsOddUnderTrs] = React.useState(false);
  const [symmetrization, setSymmetrization] = React.useState('none');
  const [antisymmetrization, setAntisymmetrization] = React.useState('none');

  const renderLoading = () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      Loading...
    </div>
  );

  const renderError = (msg: string) => (
    <div className="flex items-start gap-2 text-sm text-destructive">
      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
      <span>{msg}</span>
    </div>
  );

  const symmetrizationOptions = React.useMemo(() => {
    const options = [{ value: 'none', label: 'None' }];
    for (let start = 1; start < tensorRank; start += 1) {
      for (let end = start + 1; end <= tensorRank; end += 1) {
        options.push({ value: `${start},${end}`, label: `(${start},${end})` });
      }
    }
    return options;
  }, [tensorRank]);

  const antisymmetrizationOptions = React.useMemo(() => {
    const options = [{ value: 'none', label: 'None' }];
    for (let start = 1; start < tensorRank; start += 1) {
      options.push({ value: `${start},${start + 1}`, label: `(${start},${start + 1})` });
    }
    return options;
  }, [tensorRank]);

  const parseRange = (value: string) => {
    if (value === 'none') return null;
    const parts = value.split(',').map((part) => Number(part.trim()));
    if (parts.length !== 2 || parts.some((part) => Number.isNaN(part))) return null;
    return { start: parts[0], end: parts[1] };
  };

  const validateHelper = () => {
    if (tensorRank < 1) {
      return 'Rank must be at least 1.';
    }

    const symRange = parseRange(symmetrization);
    const antiRange = parseRange(antisymmetrization);

    if (symRange) {
      if (symRange.end <= symRange.start) {
        return 'Symmetrization must include at least two consecutive indices.';
      }
      if (symRange.end > tensorRank) {
        return 'Symmetrization indices must fit within the tensor rank.';
      }
    }

    if (antiRange) {
      if (antiRange.end !== antiRange.start + 1) {
        return 'Antisymmetrization must be two consecutive indices.';
      }
      if (antiRange.end > tensorRank) {
        return 'Antisymmetrization indices must fit within the tensor rank.';
      }
    }

    if (symRange && antiRange) {
      const overlap =
        antiRange.start <= symRange.end && antiRange.end >= symRange.start;
      if (overlap) {
        return 'Symmetrization and antisymmetrization overlap and cannot share indices.';
      }
    }

    return null;
  };

  const buildJahnHelperSymbol = () => {
    const error = validateHelper();
    if (error) {
      return { symbol: '', error };
    }

    const symRange = parseRange(symmetrization);
    const antiRange = parseRange(antisymmetrization);
    const segments: ('normal' | 'sym' | 'anti')[] = Array(tensorRank).fill('normal');

    if (symRange) {
      for (let i = symRange.start - 1; i < symRange.end; i += 1) {
        segments[i] = 'sym';
      }
    }

    if (antiRange) {
      for (let i = antiRange.start - 1; i < antiRange.end; i += 1) {
        segments[i] = 'anti';
      }
    }

    const tokens: string[] = [];
    let index = 0;

    while (index < tensorRank) {
      const type = segments[index];
      let length = 1;
      while (index + length < tensorRank && segments[index + length] === type) {
        length += 1;
      }

      if (type === 'normal') {
        if (length > 0) {
          tokens.push(`V${length}`);
        }
      } else if (type === 'sym') {
        tokens.push(`[V${length}]`);
      } else {
        tokens.push(`{V${length}}`);
      }

      index += length;
    }

    const prefix = `${isOddUnderTrs ? 'a' : ''}${isAxial ? 'e' : ''}`;
    return { symbol: `${prefix}${tokens.join('')}`, error: null };
  };

  const helperResult = React.useMemo(buildJahnHelperSymbol, [
    tensorRank,
    isAxial,
    isOddUnderTrs,
    symmetrization,
    antisymmetrization,
  ]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Tensor Definition</CardTitle>
        <CardDescription>
          Define the tensor symmetry using Jahn notation and select a
          calculation mode.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Jahn Symbol */}
        <div className="space-y-2">
              <Label htmlFor="jahn-symbol" className="text-sm font-semibold font-title">
            Jahn Symbol <span className="text-destructive">*</span>
          </Label>
          <Input
            id="jahn-symbol"
            value={jahnSymbol}
            onChange={(e) => onJahnSymbolChange(e.target.value)}
            placeholder="e.g. V2, aeV1[V2], e{V2}"
            disabled={disabled}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            The Jahn symbol uniquely defines the tensor.
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="helper">
              <AccordionTrigger>
                <span className="text-sm font-semibold font-title">Jahn Symbol generator</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-title">
                    Build a Jahn symbol from tensor rank, parity, and index symmetry.
                  </p>
                  <p className="text-xs text-muted-foreground font-title">
                    For symmetrization, <span className="font-title">(i,j)</span> means symmetrize indices i through j (inclusive). For antisymmetrization only pairs <span className="font-title">(i,i+1)</span> are allowed.
                  </p>
                  <div className="flex items-center justify-end">
                    <Button
                      size="sm"
                      onClick={() => {
                        if (!helperResult.error) {
                          onJahnSymbolChange(helperResult.symbol);
                        }
                      }}
                      disabled={disabled || Boolean(helperResult.error)}
                    >
                      Generate
                    </Button>
                  </div>

                </div>

                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="tensor-rank" className="text-sm font-medium font-title">
                      Tensor rank
                    </Label>
                    <Input
                      id="tensor-rank"
                      type="number"
                      min={1}
                      value={tensorRankInput}
                      onChange={(e) => setTensorRankInput(e.target.value)}
                      disabled={disabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium font-title">Axial / Polar</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAxial(false)}
                        className={`rounded-md border px-3 py-2 text-sm transition ${
                          !isAxial
                            ? 'border-border/80 bg-accent text-foreground'
                            : 'border-border/60 hover:bg-accent/50'
                        }`}
                        disabled={disabled}
                      >
                        Polar
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAxial(true)}
                        className={`rounded-md border px-3 py-2 text-sm transition ${
                          isAxial
                            ? 'border-border/80 bg-accent text-foreground'
                            : 'border-border/60 hover:bg-accent/50'
                        }`}
                        disabled={disabled}
                      >
                        Axial
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium font-title">Odd under time reversal</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOddUnderTrs(false)}
                        className={`rounded-md border px-3 py-2 text-sm transition ${
                          !isOddUnderTrs
                            ? 'border-border/80 bg-accent text-foreground'
                            : 'border-border/60 hover:bg-accent/50'
                        }`}
                        disabled={disabled}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsOddUnderTrs(true)}
                        className={`rounded-md border px-3 py-2 text-sm transition ${
                          isOddUnderTrs
                            ? 'border-border/80 bg-accent text-foreground'
                            : 'border-border/60 hover:bg-accent/50'
                        }`}
                        disabled={disabled}
                      >
                        Yes
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symmetrization" className="text-sm font-medium font-title">
                      Symmetrization
                    </Label>
                    <select
                      id="symmetrization"
                      value={symmetrization}
                      onChange={(e) => setSymmetrization(e.target.value)}
                      disabled={disabled}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-title"
                    >
                      {symmetrizationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-1 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="antisymmetrization" className="text-sm font-medium font-title">
                      Antisymmetrization
                    </Label>
                    <select
                      id="antisymmetrization"
                      value={antisymmetrization}
                      onChange={(e) => setAntisymmetrization(e.target.value)}
                      disabled={disabled}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-title"
                    >
                      {antisymmetrizationOptions.map((option) => {
                        const optRange = parseRange(option.value);
                        const symRange = parseRange(symmetrization);
                        const disabledOption =
                          optRange && symRange
                            ? !(optRange.end < symRange.start || optRange.start > symRange.end)
                            : false;

                        return (
                          <option key={option.value} value={option.value} disabled={disabledOption}>
                            {option.label}{disabledOption ? ' (conflicts)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>

        {/* Mode Selector */}
        <ModeSelector
          value={mode}
          onChange={onModeChange}
          disabled={disabled}
        />

        {/* Dynamic inputs */}
        <div className="space-y-4 border-t border-border/60 pt-4">
          {mode === 'operation' && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold font-title">Time Reversal (𝒯)</Label>
                <RadioGroup
                  value={trs}
                  onValueChange={(value) =>
                    onTrsChange(value as '0' | '1')
                  }
                  className="grid grid-cols-2 gap-2"
                >
                  <div
                    className={`flex items-center space-x-3 rounded-md border px-3 py-2 transition-colors ${
                      trs === '0'
                        ? 'border-border/80 bg-accent'
                        : 'border-border/60 hover:bg-accent/50'
                    }`}
                  >
                    <RadioGroupItem value="0" id="trs-0" />
                    <Label
                      htmlFor="trs-0"
                      className="text-sm font-normal font-title cursor-pointer flex-1"
                    >
                      Not multiplied
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 rounded-md border px-3 py-2 transition-colors ${
                      trs === '1'
                        ? 'border-border/80 bg-accent'
                        : 'border-border/60 hover:bg-accent/50'
                    }`}
                  >
                    <RadioGroupItem value="1" id="trs-1" />
                    <Label
                      htmlFor="trs-1"
                      className="text-sm font-normal font-title cursor-pointer flex-1"
                    >
                      Multiplied
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground">
                  Choose whether TRS is multiplied for the selected operation.
                </p>
              </div>
              {operationError ? (
                renderError(operationError)
              ) : operationLoading ? (
                renderLoading()
              ) : (
                <SearchableSelect
                  label="Crystal Operation"
                  options={operationOptions}
                  value={selection[0] ?? ''}
                  onChange={(v) => onSelectionChange(v ? [v] : [])}
                  placeholder="Select a crystal operation..."
                  searchPlaceholder="Search operations..."
                  disabled={disabled}
                />
              )}
            </>
          )}

          {mode === 'point_group' && (
            <>
              {pointGroupError ? (
                renderError(pointGroupError)
              ) : pointGroupLoading ? (
                renderLoading()
              ) : (
                <SearchableSelect
                  label="Point Group"
                  options={pointGroupOptions}
                  value={selection[0] ?? ''}
                  onChange={(v) => onSelectionChange(v ? [v] : [])}
                  placeholder="Select a point group..."
                  searchPlaceholder="Search point groups..."
                  disabled={disabled}
                />
              )}
            </>
          )}

          {(mode === 'all_groups_table' || mode === 'all_groups_inverse') && (
            <div className="rounded-md border border-dashed border-border bg-muted/30 px-4 py-6 text-center">
              <p className="text-sm text-muted-foreground">
                The tensor will be evaluated for every crystallographic point
                group.
              </p>
            </div>
          )}

          {mode === 'custom_group' && (
            <>
              {pointGroupError ? (
                renderError(pointGroupError)
              ) : pointGroupLoading ? (
                renderLoading()
              ) : (
                <MultiSelect
                  label="Point Groups"
                  options={pointGroupOptions}
                  values={selection}
                  onChange={onSelectionChange}
                  placeholder="Select point groups..."
                  searchPlaceholder="Search point groups..."
                  disabled={disabled}
                />
              )}
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            onClick={onCalculate}
            disabled={disabled}
            className="w-full h-11 text-base"
          >
            {isCalculating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-5 w-5" />
                Calculate
              </>
            )}
          </Button>
          <Button
            onClick={onReset}
            disabled={disabled}
            variant="secondary"
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
