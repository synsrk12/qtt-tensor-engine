'use client';

import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Badge not used now; rendering groups as TeX

interface InverseResult {
  component: string;
  indices: number[];
  groups: string[];
}

interface Props {
  results: InverseResult[];
}

export function AllGroupsInverseTable({ results }: Props) {
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

  return (
    <div className="rounded-md border">

      <Table>

        <TableHeader>
          <TableRow>

            <TableHead className="text-center">Component</TableHead>
            <TableHead className="text-center">Groups</TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>

          {results.map((item) => (

            <TableRow key={item.component}>

             <TableCell className="min-w-[180px] whitespace-nowrap font-mono font-semibold">
                <InlineMath math={`f_{${item.indices.join('')}}`} />
              </TableCell>

              <TableCell>

                <div className="flex flex-wrap gap-1">

                  {item.groups.length === 0 ? (
                    <span className="text-muted-foreground">
                      None
                    </span>
                  ) : (
                    item.groups.map((group) => (
                      <span key={group} className="px-2 py-1 rounded-md bg-gray-100/60 dark:bg-gray-800/40">
                        <InlineMath math={`\\text{${sanitizeForText(group)}}`} />
                      </span>
                    ))
                  )}

                </div>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}
