'use client';

import * as React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';


type AllowedComponent = number[] | string;

interface AllGroupResult {
  id: string;
  displayName: string;
  allowedComponents: AllowedComponent[];
}


interface Props {
  results: AllGroupResult[];
}

export function AllGroupsTable({results}: Props){
  function escapeTex(value: string | undefined | null) {
    const safeValue = value ?? '';
    return safeValue
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/([{}%$#_&^~])/g, '\\$1');
  }
  function sanitizeForText(value: string | undefined | null) {
    const s = String(value ?? '');
    // unwrap any existing \text{...} wrappers
    const unwrapped = s.replace(/\\text\{([^}]*)\}/g, '$1');
    return escapeTex(unwrapped);
  }
  return (
   <div className="rounded-md border-2 border-gray-400 dark:border-gray-600">

      <Table>

        <TableHeader className="bg-gray-100/100 dark:bg-gray-800/100">
          <TableRow>

            <TableHead className="text-center border-r border-gray-500 bg-gray-200/100 dark:border-gray-600 dark:bg-gray-700/100 dark:text-gray-100 font-semibold">Point Group</TableHead>
            <TableHead className="text-center bg-gray-200/100 dark:bg-gray-700/100 dark:text-gray-100 font-semibold">Allowed Components</TableHead>


          </TableRow>
        </TableHeader>


        <TableBody>

        {results.map((group)=>(
          <TableRow key={group.id}>

            <TableCell className="text-center font-mono font-semibold border-r border-gray-400 w-40">
  <InlineMath math={`\\text{${sanitizeForText(group.displayName)}}`} />
</TableCell>

            <TableCell>
              <div className="flex flex-wrap gap-2 items-center">
                {group.allowedComponents.map((component, index) => {
                  if (Array.isArray(component)) {
                    return (
                      <span key={index} className="px-2 py-1 rounded-md bg-gray-100/60 dark:bg-gray-800/40">
                        <InlineMath math={`f_{${component.join('')}}`} />
                      </span>
                    );
                  }

                  return (
                    <span key={index} className="px-2 py-1 rounded-md bg-gray-100/60 dark:bg-gray-800/40">
                      <InlineMath math={(() => {
                        const m = String(component).match(/^f\[([^\]]+)\]$/);
                        if (m) return `f_{${m[1].replace(/[,\s]+/g, '')}}`;
                        return `\\text{${sanitizeForText(component)}}`;
                      })()} />
                    </span>
                  );
                })}
              </div>
            </TableCell>

          </TableRow>
        ))}


        </TableBody>

      </Table>

    </div>
  );
}
