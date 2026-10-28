'use client';

import * as React from 'react';
import type { OperationEntry, SelectOption } from '@/types';

interface UseOperationsResult {
  options: SelectOption[];
  entries: OperationEntry[];
  loading: boolean;
  error: string | null;
}

export function useOperations(): UseOperationsResult {
  const [entries, setEntries] = React.useState<OperationEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    fetch('/api/operations')
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load operations (${res.status})`);
        const data = (await res.json()) as OperationEntry[];
        if (cancelled) return;
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const options = React.useMemo<SelectOption[]>(
    () =>
      entries.map((e) => ({
        value: e.id,
        label: e.displayName,
        latex: e.latex,
      })),
    [entries]
  );

  return { options, entries, loading, error };
}
