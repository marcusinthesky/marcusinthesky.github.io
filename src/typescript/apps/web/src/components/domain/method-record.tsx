import type { Method } from "@marcusinthesky/content";
import { projects, publications, writing } from "@marcusinthesky/content";
import { Record, RecordNote, RecordTitle } from "@marcusinthesky/ui/patterns";

import { figures } from "@/components/figures";

type Appearance = { label: string; items: { name: string; href: string }[] };

/** Where one method appears: papers, projects, writing and figures, each linked to its record. */
export function MethodRecord({ index, method }: { index: number; method: Method }) {
  const appearances: Appearance[] = [
    {
      label: "Papers",
      items: publications
        .filter(({ slug }) => method.publications.includes(slug))
        .map(({ links, title }) => ({ name: title, href: links[0].url })),
    },
    {
      label: "Projects",
      items: projects
        .filter(({ slug }) => method.projects.includes(slug))
        .map(({ slug, title }) => ({ name: title, href: `/projects/${slug}/` })),
    },
    {
      label: "Writing",
      items: writing
        .filter(({ slug }) => method.writing.includes(slug))
        .map(({ canonicalUrl, title }) => ({ name: title, href: canonicalUrl })),
    },
    {
      label: "Figures",
      items: method.figures.map((id) => ({ name: figures[id].name, href: figures[id].href })),
    },
  ].filter(({ items }) => items.length > 0);

  return (
    <Record
      className="scroll-mt-24"
      id={`method-${method.slug}`}
      meta={<span className="tabular-nums">Method {String(index + 1).padStart(2, "0")}</span>}
    >
      <RecordTitle>{method.name}</RecordTitle>
      <RecordNote term="The question">{method.question}</RecordNote>
      <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {appearances.map(({ items, label }) => (
          <div key={label}>
            <dt className="label-sm text-muted-foreground">{label}</dt>
            {items.map(({ href, name }) => (
              <dd className="m-0 mt-1 caption" key={href + name}>
                <a
                  className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                  href={href}
                >
                  {name}
                </a>
              </dd>
            ))}
          </div>
        ))}
      </dl>
    </Record>
  );
}
