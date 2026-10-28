'use client';

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

interface CustomGroupResult {
  id: string;
  displayName: string;
  allowedComponents: number[][];
}

interface Props {
  results: CustomGroupResult[];
}

export function CustomGroupsTable({ results }: Props) {
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
    <div className="rounded-md border-2 border-gray-400 dark:border-gray-600">
      <Table>
        <TableHeader className="bg-gray-100/100 dark:bg-gray-800/100">
          <TableRow>
            <TableHead className="text-center border-r border-gray-500 bg-gray-200/100 dark:border-gray-600 dark:bg-gray-700/100 dark:text-gray-100 font-semibold">
              Point Group
            </TableHead>
            <TableHead className="text-center bg-gray-200/100 dark:bg-gray-700/100 dark:text-gray-100 font-semibold">
              Allowed Components
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {results.map((group) => (
            <TableRow key={group.id}>
              <TableCell className="text-center font-mono font-semibold border-r border-gray-400 w-40">
                <InlineMath math={`\\text{${sanitizeForText(group.displayName)}}` }/>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {group.allowedComponents.map((component, index) => (
                    <Badge key={`${group.id}-${index}`} variant="secondary" className="font-mono">
                      <InlineMath math={`f_{${component.join('')}}`} />
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
