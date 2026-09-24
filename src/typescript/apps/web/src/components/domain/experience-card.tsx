import type { Experience } from "@marcusinthesky/content";
import { Card, CardBody, CardMeta, CardTitle } from "@marcusinthesky/ui/patterns";

/** One role: period, title, organisation, then what the work was. */
export function ExperienceCard({
  entry,
  headingLevel = 3,
}: {
  entry: Experience;
  headingLevel?: 2 | 3;
}) {
  return (
    <Card>
      <CardMeta>{entry.period}</CardMeta>
      <CardTitle level={headingLevel}>{entry.role}</CardTitle>
      <p className="mt-1 text-muted-foreground">
        {entry.organization} · {entry.location}
      </p>
      <CardBody>
        <ul className="mt-2 space-y-2 pl-5">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
