import { methods } from "@marcusinthesky/content";

type Kind = "publications" | "projects" | "writing";

/** The methods a record belongs to, linked to their rows in the method index. */
export function MethodLinks({ kind, slug }: { kind: Kind; slug: string }) {
  const related = methods.filter((method) => method[kind].includes(slug));
  if (related.length === 0) return null;
  return (
    // Above a card's stretched link, so each method stays its own target.
    <p className="relative z-10 mt-3 caption text-muted-foreground">
      <span className="font-semibold text-foreground">Methods: </span>
      {related.map((method, index) => (
        <span key={method.slug}>
          {index > 0 ? " · " : null}
          <a
            className="underline decoration-border underline-offset-4 hover:decoration-foreground"
            href={`/research/#method-${method.slug}`}
          >
            {method.name}
          </a>
        </span>
      ))}
    </p>
  );
}
