'use client';

import * as React from 'react';
import type { PointGroupEntry, SelectOption } from '@/types';

interface UsePointGroupsResult {
  options: SelectOption[];
  entries: PointGroupEntry[];
  loading: boolean;
  error: string | null;
}

function formatPointGroupLatex(value: string): string {
  if (!value) return '';

  return value
    .replace(/([A-Za-z])_([A-Za-z0-9]+)/g, '$1_{$2}')
    .replace(/\//g, '/');
}

export function usePointGroups(): UsePointGroupsResult {
  const [entries, setEntries] = React.useState<PointGroupEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    fetch('/api/point-groups')
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load point groups (${res.status})`);
        const data = (await res.json()) as PointGroupEntry[];
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
        latex: formatPointGroupLatex(e.latex ?? e.displayName),
      })),
    [entries]
  );

  return { options, entries, loading, error };
}
