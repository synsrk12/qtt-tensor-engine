'use client';

import * as React from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { TensorMatrix } from '@/components/TensorMatrix';
import type { TensorResult } from '@/types';

interface GroupTableProps {
  results: TensorResult[];
}

export function GroupTable({ results }: GroupTableProps) {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">Point Group</TableHead>
              <TableHead className="w-[35%]">Independent Components</TableHead>
              <TableHead className="w-[35%]">Allowed Components</TableHead>
              <TableHead className="w-[10%] text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => {
              const isOpen = expanded === r.id;
              return (
                <React.Fragment key={r.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggle(r.id)}
                  >
                    <TableCell className="font-mono font-medium">
                      <InlineMath math={`\\text{${String(r.displayName ?? r.pointGroup ?? r.label).replace(/\\/g,'\\\\').replace(/([{}%$#_&^~])/g,'\\$1')}`} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(r.independentComponents ?? []).slice(0, 3).map((c) => (
                          <Badge key={c} variant="secondary" className="font-mono text-xs">
                            <InlineMath math={String(c)} />
                          </Badge>
                        ))}
                        {(r.independentComponents ?? []).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(r.independentComponents ?? []).length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(
                          Array.isArray(r.allowedComponents[0])
                            ? (r.allowedComponents as number[][])
                            : (r.allowedComponents as string[])
                        )
                          .slice(0, 3)
                            .map((c, index) => (
                            <Badge
                              key={typeof c === 'string' ? c : index}
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {typeof c === 'string' ? (
                                  <InlineMath math={
                                    ((): string => {
                                      const s = String(c);
                                      const m = s.match(/^f\[([^\]]+)\]$/);
                                      if (m) return `f_{${m[1].replace(/[,\s]+/g, '')}}`;
                                      return s;
                                    })()
                                  } />
                                ) : (
                                  <InlineMath math={`f_{${c.join('')}}`} />
                                )}
                            </Badge>
                          ))}
                        {(
                          Array.isArray(r.allowedComponents[0])
                            ? (r.allowedComponents as number[][])
                            : (r.allowedComponents as string[])
                        ).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{
                              (
                                Array.isArray(r.allowedComponents[0])
                                  ? (r.allowedComponents as number[][])
                                  : (r.allowedComponents as string[])
                              ).length - 3
                            }
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {isOpen ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {isOpen && (
                    <TableRow>
                      <TableCell colSpan={4} className="p-4">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div className="flex-1 space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold mb-2">
                                Tensor Matrix — {r.displayName ?? r.pointGroup ?? r.label}
                              </h4>
                              <TensorMatrix matrix={r.matrix} />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold mb-2">
                                Relations
                              </h4>
                              <div className="space-y-1">
                                {r.relations.map((rel, i) => {
                                  const formatSide = (s: string) =>
                                    String(s).replace(/f\[([^\]]+)\]/g, (_m, inner) => `f_{${String(inner).replace(/[,\s]+/g, '')}}`);
                                  const math = `${formatSide(rel.lhs)}=${formatSide(rel.rhs)}`;
                                  return (
                                    <p key={i} className="font-mono text-sm">
                                      <InlineMath math={math} />
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
