'use client';

import * as React from 'react';
import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import operationsData from '@/data/operations.json';
import { TensorMatrix } from '@/components/TensorMatrix';
import { GroupTable } from '@/components/GroupTable';
import { useToast } from '@/hooks/use-toast';
import type { CalculateResponse, TensorResult } from '@/types';
import { GeneratorPanel } from "@/components/GeneratorPanel";
import { usePointGroups } from "@/hooks/use-point-groups";
import { AllGroupsTable } from "@/components/AllGroupsTable";
import { AllGroupsInverseTable } from '@/components/AllGroupsInverseTable';
import { CustomGroupsTable } from '@/components/CustomGroupsTable';
import type { PointGroupEntry } from '@/types';

interface ResultPanelProps {
  response: CalculateResponse | null;
  isCalculating: boolean;
}

export function ResultPanel({ response, isCalculating }: ResultPanelProps) {
  const { toast } = useToast();
  const { entries: pointGroups } = usePointGroups();
  const selectedGroup =
    response?.results.length === 1
      ? pointGroups.find((pg) => pg.id === response.results[0].id)
      : undefined;

  const latex = React.useMemo(
    () => (response ? generateLaTeX(response) : ''),
    [response]
  );

  if (isCalculating) {
    return (
      <div className="min-h-0">
        <ResultCard title="Calculating..." description="Fetching tensor data." />
      </div>
    );
  }

  if (!response) {
    return (
      <div className="min-h-0">
        <ResultCard
          title="No calculation yet."
          description="Enter a Jahn symbol, select a mode, and press Calculate to see results."
        />
      </div>
    );
  }

  const isTableMode =
    response.mode === 'all_groups_table' ||
    response.mode === 'all_groups_inverse' ||
    response.mode === 'custom_group';

  const copyResults = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    toast({ title: 'Copied', description: 'Results copied to clipboard.' });
  };

  

  const exportLaTeX = () => {
    const blob = new Blob([latex], { type: 'application/x-tex' });
    downloadBlob(blob, `tensorsym-${response.jahnSymbol}.tex`);
    toast({ title: 'Exported', description: 'LaTeX file downloaded.' });
  };

  return (
    <div className="min-h-0">
      <Card className="min-h-0 overflow-hidden">
        <CardHeader>
            <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Results</CardTitle>
              <CardDescription>
                Jahn symbol: <span className="font-mono">{response.jahnSymbol}</span>{' '}
                · {response.results.length} result{response.results.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {response.mode === 'all_groups_table' ? (
            <AllGroupsTable results={response.results as any} />
          ) : response.mode === 'all_groups_inverse' ? (
            <AllGroupsInverseTable results={response.results as any} />
          ) : response.mode === 'custom_group' ? (
            <CustomGroupsTable results={response.results as any} />
          ) : (
            <SingleResult
              result={response.results[0]}
              response={response}
              pointGroup={selectedGroup}
            />
          )}
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2 ml-auto">
            <Button size="sm" variant="outline" onClick={copyResults}>
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              Copy
            </Button>
            {/* JSON export removed per user request */}
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    TeX Preview
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>LaTeX Preview</DialogTitle>
                    <DialogDescription>
                      Preview the generated LaTeX source for the selected result.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[400px] overflow-auto rounded-md border border-border/60 p-4 text-sm font-mono">
                    <pre>{latex}</pre>
                  </div>
                  <DialogFooter>
                    <Button size="sm" variant="secondary" onClick={exportLaTeX}>
                      Download TeX
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="outline" onClick={exportLaTeX}>
                TeX
              </Button>
            </>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function ResultCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="h-full flex items-center justify-center">
      <CardContent className="py-16 text-center">
        <p className="text-lg font-title font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function SingleResult({
  result,
  response,
  pointGroup,
}: {
  result: TensorResult;
  response: CalculateResponse;
  pointGroup?: PointGroupEntry;
}) {
  if (!result) {
    return <p className="text-sm text-muted-foreground">No data returned.</p>;
  }

  const headingNode: React.ReactNode =
    response.mode === 'operation' ? (
      <>
        Operation:{' '}
        {(() => {
          // prefer lookup by operation id and use its `latex` entry when available
          const opId = result.operation ?? result.displayName ?? null;
          let latexLabel = opId ?? '';
          if (opId) {
            const found = (operationsData as any[]).find((o) => o.id === opId);
            if (found) {
              latexLabel = found.latex ?? found.displayName ?? opId;
            }
          }
          return <InlineMath math={String(latexLabel)} />;
        })()}
      </>
    ) : (
      `Point Group: ${result.displayName ?? result.pointGroup ?? result.label}`
    );

  return (
    <div className="space-y-4">
    
     <div className="space-y-3">

  <div className="flex items-center gap-2">
    <h3 className="text-lg font-title font-semibold">{headingNode}</h3>
  </div>

 <div
  className={`grid gap-3 ${
    response.mode === "operation"
      ? "grid-cols-2"
      : "grid-cols-2 md:grid-cols-4"
  }`}
>

    {response.mode !== "operation" && (
  <>
    <div className="rounded-md border p-3">
      <div className="text-xs text-muted-foreground">
        Magnetic Type
      </div>
      <div className="font-semibold">
        {result.magnetic}
      </div>
    </div>

    <div className="rounded-md border p-3">
      <div className="text-xs text-muted-foreground">
        Number of Generators
      </div>
      <div className="font-semibold">
        {result.numberOfGenerators}
      </div>
    </div>
  </>
)}

    <div className="rounded-md border p-3">
      <div className="text-xs text-muted-foreground">
        Independent Components
      </div>
      <div className="font-semibold">
        {result.allowedComponents.length}
      </div>
    </div>

    <div className="rounded-md border p-3">
      <div className="text-xs text-muted-foreground">
        Tensor Rank
      </div>
      <div className="font-semibold">
        {result.matrix.rows.length}
      </div>
    </div>

  </div>

</div>
      <Tabs defaultValue="components">
        <TabsList
  className={`grid w-full ${
    response.mode === "operation"
            ? "grid-cols-2 sm:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-4"
  }`}
>
  <TabsTrigger value="components">Allowed</TabsTrigger>
  <TabsTrigger value="matrix">Matrix</TabsTrigger>

  {response.mode !== "operation" && (
    <TabsTrigger value="generators">Generators</TabsTrigger>
  )}

  <TabsTrigger value="relations">Relations</TabsTrigger>
</TabsList>
        <TabsContent value="components" className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold mb-2">Allowed Components</h4>
            <div className="flex flex-wrap gap-1.5">
              {(
                Array.isArray(result.allowedComponents[0])
                  ? (result.allowedComponents as number[][]).map((c, index) => (
                      <Badge
                        key={`allowed-${index}`}
                        variant="secondary"
                        className="font-mono"
                      >
                        <InlineMath math={`f_{${c.join('')}}`} />
                      </Badge>
                    ))
                  : (result.allowedComponents as string[]).map((c, idx) => (
                          <Badge key={`${c}-${idx}`} variant="secondary" className="font-mono">
                            <InlineMath math={
                              ((): string => {
                                const m = String(c).match(/^f\[([^\]]+)\]$/);
                                if (m) return `f_{${m[1].replace(/[,\s]+/g, '')}}`;
                                return `\\text{${sanitizeForText(c)}}`;
                              })()
                            } />
                          </Badge>
                    ))
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="matrix">
          <TensorMatrix matrix={result.matrix} />
        </TabsContent>
        
        <TabsContent value="generators">
          <GeneratorPanel operations={result.operations ?? []} />
        </TabsContent>
        
        <TabsContent value="relations" className="space-y-1">
          {result.relations.map((rel, i) => {
            const formatSide = (s: string) => {
              // replace f[...] occurrences with f_{...} and remove commas/spaces inside
              return s.replace(/f\[([^\]]+)\]/g, (_m, inner) => {
                const cleaned = String(inner).replace(/[,\s]+/g, '');
                return `f_{${cleaned}}`;
              });
            };

            const math = `${formatSide(rel.lhs)}=${formatSide(rel.rhs)}`;

            return (
              <div
                key={i}
                className="rounded-md border border-border/60 px-4 py-2"
              >
                <p className="font-mono text-sm">
                  <InlineMath math={math} />
                </p>
              </div>
            );
          })}
        </TabsContent>

        {/* JSON view removed */}
      </Tabs>
    </div>
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeTex(value: string | undefined | null) {
  const safeValue = value ?? '';
  return safeValue
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([{}%$#_&^~])/g, '\\$1');
}

function sanitizeForText(value: string | undefined | null) {
  const s = String(value ?? '');
  const unwrapped = s.replace(/\\text\{([^}]*)\}/g, '$1');
  return escapeTex(unwrapped);
}

function linearComponentTeX(component: number[]) {
  return `f_{${component.join('')}}`;
}

function generateLaTeX(response: CalculateResponse) {
  const headerGroups = `\\begin{tabular}{ll} \\textbf{Groups} & \\textbf{Allowed components}\\\\~\\hline`;
  const footer = `\\hline\\end{tabular}`;

  if ((response as any).mode === 'all_groups_inverse') {
    const rows = (response.results as any[]).map((r) => {
      let componentTex = '$-$';
      if (Array.isArray(r.indices)) {
        const mapped = String(r.indices.join('')).replace(/1/g, 'x').replace(/2/g, 'y').replace(/3/g, 'z');
        componentTex = `$${mapped}$`;
      } else if (r.component) {
        const cleaned = String(r.component).replace(/^f_?/, '').replace(/[{}$]/g, '');
        const mapped = cleaned.replace(/1/g, 'x').replace(/2/g, 'y').replace(/3/g, 'z');
        componentTex = `$${mapped}$`;
      } else if (r.label) {
        const cleaned = String(r.label).replace(/^f_?/, '').replace(/[{}$]/g, '');
        const mapped = cleaned.replace(/1/g, 'x').replace(/2/g, 'y').replace(/3/g, 'z');
        componentTex = `$${mapped}$`;
      }

      const groups = r.groups ?? r.results ?? [];
      let groupsTex = '---';
      if (Array.isArray(groups) && groups.length > 0) {
        const items = (groups as string[]).map((g) => `$${sanitizeForText(String(g))}$`);
        const longText = items.join(', ');

        if (longText.length > 120 && items.length > 1) {
          const splitIndex = Math.ceil(items.length / 2);
          const firstPart = items.slice(0, splitIndex).join(', ');
          const secondPart = items.slice(splitIndex).join(', ');
          groupsTex = `${firstPart},\\\\& ${secondPart}`;
        } else {
          groupsTex = items.join(', ');
        }
      }

      return `${componentTex} & ${groupsTex} \\\\\n\\hline\n`;
    }).join('');

    return `\\begin{table}[t]\n\\centering\n\\caption{}\n\\label{}\n\\renewcommand{\\arraystretch}{1.15}\n\\begin{tabular}{|c|c|}\n\\hline\n\\textbf{\\color{blue} Component} & \\textbf{\\color{blue} Magnetic point groups} \\\\\n\\hline\n\\hline\n${rows}\n\\end{tabular}\n\\end{table}`;
  }

  // default: groups -> allowed components
  const rows = response.results.map((result) => {
    const label = `$${escapeTex(result.displayName ?? result.pointGroup ?? result.label)}$`;
    const allowedComponents = result.allowedComponents ?? [];
    const allowed = Array.isArray(allowedComponents[0])
      ? (allowedComponents as number[][])
          .map((c) => `$${linearComponentTeX(c)}$`)
          .join(',~~')
      : (allowedComponents as string[])
          .map((component) => `$${escapeTex(component)}$`)
          .join(',~~');
    const formattedAllowed = allowed || '$-$';

    return `${label} & ${formattedAllowed}\\\\\n`;
  });

  return `${headerGroups}${rows.join('')}${footer}`;
}
