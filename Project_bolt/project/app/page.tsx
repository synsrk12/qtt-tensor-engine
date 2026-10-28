'use client';

import * as React from 'react';
import { Circle, Loader as Loader2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';

import { Header } from '@/components/Header';
import { InputPanel } from '@/components/InputPanel';
import { AuthorNotes } from '@/components/AuthorNotes';
import { ResultHistory, type CalculationHistoryEntry } from '@/components/ResultHistory';
import { ResultPanel } from '@/components/ResultPanel';
import { ThemeToggle } from '@/components/theme-toggle';
import { useToast } from '@/hooks/use-toast';
import { usePointGroups } from '@/hooks/use-point-groups';
import { useOperations } from '@/hooks/use-operations';
import { calculateTensor } from '@/services/api';
import type {
  CalculationMode,
  CalculateResponse,
  Status,
} from '@/types';

const JAHN_SYMBOL_PATTERN = /^(?:ae|ea|a|e)?(?:V[1-9]\d*|\[V[1-9]\d*\]|\{V[1-9]\d*\})+$/;

export default function Home() {
  const [jahnSymbol, setJahnSymbol] = React.useState('');
  const [mode, setMode] = React.useState<CalculationMode>('point_group');
  const [selection, setSelection] = React.useState<string[]>([]);
  const [trs, setTrs] = React.useState<'0' | '1'>('0');
  const [response, setResponse] = React.useState<CalculateResponse | null>(
    null
  );
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [status, setStatus] = React.useState<Status>('ready');
  const [historyEntries, setHistoryEntries] = React.useState<CalculationHistoryEntry[]>([]);
  const [clearHistoryOnRefresh, setClearHistoryOnRefresh] = React.useState(false);
  const { toast } = useToast();
  const { options: pointGroupOptions,entries: pointGroupEntries,loading: pgLoading,error: pgError} = usePointGroups();
  const { options: operationOptions, loading: opLoading, error: opError } = useOperations();
  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    setSelection([]);
  };

  const handleCalculate = async () => {
    if (!jahnSymbol.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a Jahn Symbol.',
        variant: 'destructive',
      });
      return;
    }

    if (!JAHN_SYMBOL_PATTERN.test(jahnSymbol.trim())) {
      toast({
        title: 'Invalid Jahn Symbol',
        description:
          'Use lowercase a and/or e only as an optional prefix, followed by Vn, [Vn], or {Vn} blocks (for example, aeV1[V2]).',
        variant: 'destructive',
      });
      return;
    }

    if (
      (mode === 'point_group' || mode === 'operation' || mode === 'custom_group') &&
      selection.length === 0
    ) {
      const selectionRequirement =
        mode === 'operation'
          ? 'a crystal operation'
          : mode === 'custom_group'
          ? 'at least one point group'
          : 'a point group';

      toast({
        title: 'Validation Error',
        description: `Please select ${selectionRequirement}.`,
        variant: 'destructive',
      });
      return;
    }

    setIsCalculating(true);
    setStatus('calculating');

    try {
      const res = await calculateTensor({
        jahnSymbol: jahnSymbol.trim(),
        mode,
        selection,
        trs,
      });

      const rawMode = (res as any).mode;
      const normalizedMode =
        rawMode === 'custom'
          ? 'custom_group'
          : rawMode === 'pointgroup'
          ? 'point_group'
          : rawMode;

      const enrichedResponse = {
        ...res,
        mode: normalizedMode as CalculationMode,
        results: res.results.map((result: any) => {
          const pg = pointGroupEntries.find((p) => p.id === result.id);

          return {
            ...result,
            displayName: pg?.displayName ?? result.displayName,
            magnetic: pg?.magneticType ?? result.magnetic,
            numberOfGenerators:
              pg?.numberOfGenerators ?? result.numberOfGenerators ?? 0,
            operations: pg?.operations ?? result.operations ?? [],
          };
        }),
      };

      setResponse(enrichedResponse);
      setStatus('finished');

      const historyEntry = createHistoryEntry(enrichedResponse);
      addHistoryEntry(historyEntry);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);

      toast({
        title: 'API Error',
        description: message,
        variant: 'destructive',
      });

      setStatus('error');
    } finally {
      setIsCalculating(false);
    }
  };

  const HISTORY_STORAGE_KEY = 'tensorSymCalcHistory';
  const CLEAR_HISTORY_ON_REFRESH_KEY = 'tensorSymClearHistoryOnRefresh';

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const rawSetting = window.localStorage.getItem(CLEAR_HISTORY_ON_REFRESH_KEY);
    const enabled = rawSetting === 'true';
    setClearHistoryOnRefresh(enabled);

    if (enabled) {
      window.localStorage.removeItem(HISTORY_STORAGE_KEY);
      setHistoryEntries([]);
      return;
    }

    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return;

    try {
      const entries = JSON.parse(raw) as CalculationHistoryEntry[];
      setHistoryEntries(entries);
    } catch {
      /* ignore invalid history */
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const entryId = params.get('history');
    if (!entryId) return;

    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return;

    try {
      const entries = JSON.parse(raw) as CalculationHistoryEntry[];
      const entry = entries.find((item) => item.id === entryId);
      if (entry) {
        setJahnSymbol(entry.jahnSymbol);
        setMode(entry.mode);
        setSelection(entry.selection);
        setTrs(entry.trs);
        setResponse(entry.response);
        setStatus('finished');
      }
    } catch {
      /* ignore invalid history */
    }
  }, []);

  const saveHistoryEntries = (entries: CalculationHistoryEntry[]) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
    setHistoryEntries(entries);
  };

  const handleClearHistory = () => {
    saveHistoryEntries([]);
    toast({
      title: 'History cleared',
      description: 'Previous calculations have been removed.',
    });
  };

  const handleToggleClearOnRefresh = (enabled: boolean) => {
    if (typeof window === 'undefined') return;
    setClearHistoryOnRefresh(enabled);
    window.localStorage.setItem(CLEAR_HISTORY_ON_REFRESH_KEY, String(enabled));
    if (enabled) {
      saveHistoryEntries([]);
    }
  };

  const addHistoryEntry = (entry: CalculationHistoryEntry) => {
    setHistoryEntries((prev) => {
      const nextEntries = [entry, ...prev.filter((item) => item.id !== entry.id)].slice(0, 10);
      saveHistoryEntries(nextEntries);
      return nextEntries;
    });
  };

  const createHistoryEntry = (response: CalculateResponse): CalculationHistoryEntry => ({
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    jahnSymbol: jahnSymbol.trim(),
    mode,
    selection,
    trs,
    response,
  });

  const handleRestore = (entry: CalculationHistoryEntry) => {
    if (isCalculating) return;

    setJahnSymbol(entry.jahnSymbol);
    setMode(entry.mode);
    setSelection(entry.selection);
    setTrs(entry.trs);
    setResponse(entry.response);
    setStatus('finished');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('history', entry.id);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const handleCopyPermalink = async (entry: CalculationHistoryEntry) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('history', entry.id);
    await navigator.clipboard.writeText(url.toString());
    toast({ title: 'Link copied', description: 'Permalink copied to clipboard.' });
  };

  const handleReset = () => {
    setJahnSymbol('');
    setMode('point_group');
    setSelection([]);
    setTrs('0');
    setResponse(null);
    setStatus('ready');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1.5fr)_minmax(0,360px)] gap-6">
          {/* Left column — Input */}
          <div className="lg:sticky lg:top-[88px] lg:self-start">
            <InputPanel
              jahnSymbol={jahnSymbol}
              mode={mode}
              selection={selection}
              pointGroupOptions={pointGroupOptions}
              operationOptions={operationOptions}
              pointGroupLoading={pgLoading}
              pointGroupError={pgError}
              operationLoading={opLoading}
              operationError={opError}
              onJahnSymbolChange={setJahnSymbol}
              onModeChange={handleModeChange}
              onSelectionChange={setSelection}
              trs={trs}
              onTrsChange={setTrs}
              onCalculate={handleCalculate}
              onReset={handleReset}
              isCalculating={isCalculating}
            />
          </div>

          {/* Middle column — Instructions + Results */}
          <div className="flex min-h-0 flex-col gap-6">
            <div className="rounded-3xl border border-border/70 bg-card/80 p-5 shadow-lg shadow-black/5 backdrop-blur-sm">
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-base font-title font-semibold uppercase tracking-[0.18em] text-foreground">
                    Quick Instructions
                  </h2>
                  <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-foreground/90 font-title">
                    <li>Enter a valid Jahn Symbol.</li>
                    <li>Choose a calculation mode.</li>
                    <li>Pick the operation or point group.</li>
                    <li>Click Calculate and review the tensor results.</li>
                  </ol>
                </div>
                <div className="rounded-2xl bg-muted/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Last updated {new Date().toLocaleDateString('en-US')}
                </div>
              </div>
            </div>
            <div className="min-h-0">
              <ResultPanel response={response} isCalculating={isCalculating} />
            </div>
          </div>

          {/* Right column — Notes + History */}
          <div className="lg:sticky lg:top-[88px] lg:self-start flex min-h-0 flex-col gap-6">
            <AuthorNotes />
            <ResultHistory
              entries={historyEntries}
              onRestore={handleRestore}
              onClearHistory={handleClearHistory}
              isCalculating={isCalculating}
            />
          </div>
        </div>
      </main>

      {/* Status bar */}
      <footer className="border-t border-border/60 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-sm">
              {status === 'ready' && (
                <>
                  <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Ready</span>
                </>
              )}
              {status === 'calculating' && (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span className="text-primary">Calculating...</span>
                </>
              )}
              {status === 'finished' && (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Finished
                  </span>
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                  <span className="text-destructive">Error</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs text-muted-foreground">
                TensorSym v1.0
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
