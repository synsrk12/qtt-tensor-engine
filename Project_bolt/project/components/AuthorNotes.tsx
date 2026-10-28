'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export function AuthorNotes() {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="!flex-row items-center justify-between gap-2 !p-3">
        <div>
          <CardTitle className="text-lg font-title">Notes from author</CardTitle>
          <CardDescription className="text-sm font-title">
            Helpful context and contact details for this app.
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? 'Collapse author notes' : 'Expand author notes'}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {expanded && (
        <CardContent className="!p-3 pt-0">
          <div className="text-sm text-foreground">
            <div className="mt-2 text-foreground/90">
              We are currently at developing stage.
            </div>
            <div className="mt-3 text-sm text-foreground/90">
              Please cite the article - {}{' '}
              <span className="text-primary underline">[link]</span>
            </div>
            <div className="mt-3 text-sm text-foreground/90">
              Please contact the following email -{' '}
              <span className="font-mono italic">sayans21@iitk.ac.in</span> for reporting any bug or improvement.
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
