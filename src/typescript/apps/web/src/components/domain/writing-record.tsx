import type { Writing } from "@marcusinthesky/content";
import { Record, RecordAttribution, RecordLinks, RecordTitle } from "@marcusinthesky/ui/patterns";

import { NudgeArrow } from "@/components/site/nudge-arrow";

const published = new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium", timeZone: "UTC" });

/** An essay in the writing index: date and source in the rail, a link to where it is published. */
export function WritingRecord({
  entry,
  headingLevel = 2,
}: {
  entry: Writing;
  headingLevel?: 2 | 3;
}) {
  return (
    <Record
      meta={
        <>
          {entry.publishedAt ? (
            <time className="tabular-nums" dateTime={entry.publishedAt}>
              {published.format(new Date(entry.publishedAt))}
            </time>
          ) : null}
          <span>{entry.source}</span>
        </>
      }
    >
      <RecordTitle level={headingLevel}>{entry.title}</RecordTitle>
      <RecordAttribution>{entry.summary}</RecordAttribution>
      <RecordLinks>
        <a
          className="group inline-flex min-h-11 items-center gap-2 label-md text-primary"
          href={entry.canonicalUrl}
          rel="noreferrer"
        >
          <span className="underline-draw">Read the essay</span> <NudgeArrow />
        </a>
      </RecordLinks>
    </Record>
  );
}
