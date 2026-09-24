import type { Publication } from "@marcusinthesky/content";
import {
  Record,
  RecordAttribution,
  RecordLinks,
  RecordNote,
  RecordTitle,
} from "@marcusinthesky/ui/patterns";

import { MethodLinks } from "@/components/domain/method-links";
import { AskAi, paperPrompt } from "@/components/integrations/ask-ai";
import { BrandIcon } from "@/components/integrations/brand-icon";
import { NudgeArrow } from "@/components/site/nudge-arrow";

/**
 * A publication at two reading speeds: the scholarly record (title, authors,
 * year, status, links), then the question it asks as a clearly separate note.
 */
export function PublicationRecord({
  publication,
  headingLevel = 2,
}: {
  publication: Publication;
  headingLevel?: 2 | 3;
}) {
  return (
    <Record
      meta={
        <>
          <span className="tabular-nums">{publication.year}</span>
          <span>{publication.status}</span>
        </>
      }
    >
      <RecordTitle level={headingLevel}>{publication.title}</RecordTitle>
      <RecordAttribution>{publication.authors.join(" · ")}</RecordAttribution>
      {publication.lede ? <RecordNote term="The question">{publication.lede}</RecordNote> : null}
      <MethodLinks kind="publications" slug={publication.slug} />
      <RecordLinks>
        {publication.links.map((link) => (
          <a
            className="group inline-flex min-h-11 items-center gap-2 label-md text-primary"
            href={link.url}
            key={link.url}
            rel="noreferrer"
          >
            <BrandIcon className="size-4" label={link.label} />
            <span className="underline-draw">{link.label}</span> <NudgeArrow />
          </a>
        ))}
        <AskAi compact prompt={paperPrompt(publication)} />
      </RecordLinks>
    </Record>
  );
}
