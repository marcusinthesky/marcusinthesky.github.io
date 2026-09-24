import type { ComponentPropsWithoutRef, ReactNode } from "react";

type RecordProps = ComponentPropsWithoutRef<"article"> & {
  /** The catalogue rail: year, status or date, in catalogue notation. */
  meta?: ReactNode;
};

/**
 * A catalogue entry: one compact, ruled row for surveying a collection. Stack
 * records inside a container that closes the list with a bottom rule.
 */
export function Record({ children, className = "", meta, ...props }: RecordProps) {
  return (
    <article
      className={`grid gap-x-8 gap-y-2 border-t border-border py-6 transition-colors duration-500 ease-out-expo hover:border-t-chapter focus-within:border-t-chapter sm:grid-cols-[9rem_minmax(0,1fr)] ${className}`}
      {...props}
    >
      <div className="flex flex-wrap gap-x-3 gap-y-1 label-sm text-muted-foreground sm:flex-col">
        {meta}
      </div>
      <div className="min-w-0">{children}</div>
    </article>
  );
}

export function RecordTitle({ children, level = 3 }: { children: ReactNode; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Heading className="max-w-3xl font-serif text-xl font-medium leading-snug text-pretty sm:text-2xl">
      {children}
    </Heading>
  );
}

/** Authors, source or venue. */
export function RecordAttribution({ children }: { children: ReactNode }) {
  return <p className="mt-1 caption text-muted-foreground">{children}</p>;
}

/** An interpretation beside the record, introduced by its term ("The question"). */
export function RecordNote({ children, term }: { children: ReactNode; term: string }) {
  return (
    <p className="mt-3 max-w-3xl caption text-muted-foreground">
      <span className="font-semibold text-foreground">{term}: </span>
      {children}
    </p>
  );
}

/** Destinations: the primary record link first. */
export function RecordLinks({ children }: { children: ReactNode }) {
  return <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1">{children}</div>;
}
