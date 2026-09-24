import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  /** A museum-label line (source, date, stack) set beneath the frame, outside it. */
  caption?: ReactNode;
};

// `relative` is part of the contract: CardLink's stretched overlay fills this frame.
const frame =
  "group relative flex flex-col rounded-none border border-border bg-card p-6 text-card-foreground transition-[translate,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-foreground hover:border-t-chapter focus-within:border-foreground focus-within:border-t-chapter";

/** An editorial container: a hairline frame, with catalogue metadata beneath it. */
export function Card({ caption, children, className = "", ...props }: CardProps) {
  if (caption === undefined) {
    return (
      <article className={`${frame} ${className}`} {...props}>
        {children}
      </article>
    );
  }
  return (
    <article className={`flex flex-col ${className}`} {...props}>
      <div className={`${frame} flex-1`}>{children}</div>
      <p className="mt-3 label-sm text-muted-foreground">{caption}</p>
    </article>
  );
}

/** Status, year or role above the title, in catalogue notation. */
export function CardMeta({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 label-md text-muted-foreground">
      {children}
    </div>
  );
}

export function CardTitle({ children, level = 3 }: { children: ReactNode; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Heading className="font-serif text-2xl font-medium leading-snug tracking-[-0.02em]">
      {children}
    </Heading>
  );
}

/** The question or claim, in the written hand. */
export function CardLede({ children }: { children: ReactNode }) {
  return <p className="mt-3 font-serif text-lg leading-snug text-foreground">{children}</p>;
}

/** Supporting text; grows so footers align across a row of cards. */
export function CardBody({ children }: { children: ReactNode }) {
  return <div className="mt-3 flex-1 text-muted-foreground">{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">{children}</div>;
}

type CardLinkProps = ComponentPropsWithoutRef<"a"> & {
  /** Stretches the link's hit area over the whole card frame. Use for the card's one destination. */
  stretched?: boolean;
  /** A trailing glyph, such as an arrow, outside the drawn underline. */
  icon?: ReactNode;
};

export function CardLink({
  children,
  className = "",
  icon,
  stretched = false,
  ...props
}: CardLinkProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center gap-2 self-start label-md text-primary ${stretched ? "after:absolute after:inset-0" : ""} ${className}`}
      {...props}
    >
      <span className="underline-draw">{children}</span>
      {icon}
    </a>
  );
}
