import type { ReactNode } from "react";

type WorkingPageProps = { className?: string; children: ReactNode };

/**
 * A working page: prose on the page itself, with a margin that holds notes on
 * wide screens. Direct children sit in the prose column; wrap a block in
 * `Annotated` to give it a margin note.
 */
export function WorkingPage({ children, className = "" }: WorkingPageProps) {
  return (
    <div
      className={`lg:grid lg:grid-cols-[minmax(0,var(--reading-width))_16rem] lg:gap-x-12 lg:[&>:not([data-annotated])]:col-start-1 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A block and its margin note. On narrow screens the note follows the block in
 * reading order; it never floats over content or disappears.
 */
export function Annotated({ children, note }: { children: ReactNode; note: ReactNode }) {
  return (
    <div className="lg:col-span-full lg:grid lg:grid-cols-subgrid" data-annotated="">
      <div className="lg:col-start-1">{children}</div>
      <MarginNote>{note}</MarginNote>
    </div>
  );
}

/** A short limitation, source or related observation, set as annotation. */
export function MarginNote({ children }: { children: ReactNode }) {
  return (
    // A note, not a landmark: a page carries many, each tied to its paragraph.
    <div
      className="mt-3 border-l border-border pl-4 caption text-muted-foreground lg:col-start-2 lg:mt-1 lg:self-start"
      role="note"
    >
      {children}
    </div>
  );
}
