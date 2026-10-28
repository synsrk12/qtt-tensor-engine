import { Atom } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Atom className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                QTT Tensor Engine{' '}
                <span className="text-xs font-medium uppercase text-slate-500">
                  Version-1.0
                </span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Symmetry tensor solver for crystallography and magnetic tensor research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
