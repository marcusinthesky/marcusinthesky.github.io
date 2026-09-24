import { circulation, type Circulation } from "@marcusinthesky/content";

const groups: readonly (readonly [Circulation["kind"], string])[] = [
  ["presentation", "Presented at"],
  ["paper", "Papers and preprints"],
  ["software", "Models and software"],
  ["education", "Education"],
];

/**
 * Where the work has circulated, as a static bibliography grouped by the kind of
 * relationship: a talk, a deposit and a degree are different kinds of record.
 */
export function CirculationRecord() {
  return (
    <section
      aria-labelledby="circulation-title"
      className="grid gap-10 border-t border-border py-14 lg:grid-cols-[0.72fr_1.28fr]"
    >
      <h2 className="font-serif text-3xl" id="circulation-title">
        Record of circulation
      </h2>
      <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {groups.map(([kind, heading]) => (
          <div key={kind}>
            <dt className="label-sm text-foreground">{heading}</dt>
            {circulation
              .filter((entry) => entry.kind === kind)
              .map(({ detail, href, name }) => (
                <dd className="m-0 mt-2 caption" key={name}>
                  <a
                    className="font-serif text-base text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                    href={href}
                    rel={href.startsWith("/") ? undefined : "noreferrer"}
                  >
                    {name}
                  </a>
                  {detail ? <span className="block text-muted-foreground">{detail}</span> : null}
                </dd>
              ))}
          </div>
        ))}
      </dl>
    </section>
  );
}
