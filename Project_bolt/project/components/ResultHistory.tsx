'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { CalculateResponse, CalculationMode } from '@/types';

export interface CalculationHistoryEntry {
  id: string;
  createdAt: string;
  jahnSymbol: string;
  mode: CalculationMode;
  selection: string[];
  trs: '0' | '1';
  response: CalculateResponse;
}

interface ResultHistoryProps {
  entries: CalculationHistoryEntry[];
  onRestore: (entry: CalculationHistoryEntry) => void;
  onClearHistory: () => void;
  isCalculating?: boolean;
}

const modeLabels: Record<CalculationMode, string> = {
  point_group: 'Point Group',
  operation: 'Operation',
  custom_group: 'Custom Group',
  all_groups_table: 'All Groups',
  all_groups_inverse: 'Inverse Groups',
};

export function ResultHistory({
  entries,
  onRestore,
  onClearHistory,
  isCalculating = false,
}: ResultHistoryProps) {
  const [displayCount, setDisplayCount] = React.useState<number>(4);

  const visibleEntries = React.useMemo(() => {
    if (displayCount <= 0) return entries;
    return entries.slice(0, displayCount);
  }, [entries, displayCount]);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg">Result history</CardTitle>
            <CardDescription>Restore recent calculations.</CardDescription>
          </div>
          <Button size="sm" variant="outline" onClick={onClearHistory}>
            Clear history
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {entries.length === 0 ? (
          <div className="rounded-2xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
            No previous results yet. Each successful calculation will be saved automatically.
          </div>
        ) : (
          visibleEntries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-border/70 bg-background/80 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {entry.jahnSymbol} · {modeLabels[entry.mode]}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRestore(entry)}
                    disabled={isCalculating}
                  >
                    Restore
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>

      {entries.length > 0 ? (
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <div>
            Showing {Math.min(displayCount > 0 ? displayCount : entries.length, entries.length)} of {entries.length} saved calculations.
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Show:</label>
            <select
              value={displayCount}
              onChange={(e) => setDisplayCount(Number(e.target.value))}
              className="rounded-md border px-2 py-1 text-xs bg-background"
            >
              <option value={4}>Latest 4</option>
              <option value={10}>Latest 10</option>
              <option value={0}>All</option>
            </select>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
}
