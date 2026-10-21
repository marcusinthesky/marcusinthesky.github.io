import type { Metadata } from "next";

import { methods, profile, projects, publications } from "@marcusinthesky/content";
import { Card, CardBody, CardTitle, PageHeader, SectionHeader } from "@marcusinthesky/ui/patterns";
import { Badge, ButtonLink } from "@marcusinthesky/ui/primitives";

import { MethodRecord } from "@/components/domain/method-record";
import { PublicationRecord } from "@/components/domain/publication-record";
import { PcaCloud } from "@/components/figures/pca-cloud/pca-cloud";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Research programme and methods spanning quantitative finance and information geometry.",
  path: "/research/",
});

export default function ResearchPage() {
  return (
    <div className="page-shell" data-chapter="lotus" data-nav="research">
      <PageHeader
        motif="lotus"
        description="Company information describes what businesses do. Financial markets record how securities behave. This research connects the two, using language models and statistical methods to measure economic peers, shared risk and strategic competition."
        eyebrow="Research"
        title="Measuring the economic structure behind financial risk"
        figure={{
          name: "Principal components",
          note: "Many observed dimensions → few principal directions",
          content: <PcaCloud />,
        }}
      />
      <section className="grid gap-5 border-t border-border py-14 md:grid-cols-3">
        {[
          [
            "Representations",
            "What does company information reveal? Language models turn news and disclosures into comparable representations of business activities and risks.",
          ],
          [
            "Relationships",
            "Which firms are economically connected? Optimal transport and statistical models identify information-based peers and shared financial exposure.",
          ],
          [
            "Decisions",
            "What can be learned when return histories are incomplete? Models connect economic differences to portfolio risk, with explicit assumptions and limitations.",
          ],
        ].map(([title, description]) => (
          <Card key={title}>
            <CardTitle level={2}>{title}</CardTitle>
            <CardBody>{description}</CardBody>
          </Card>
        ))}
      </section>
      <section className="border-t border-border py-14">
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <Badge key={interest}>{interest}</Badge>
          ))}
        </div>
        <div className="mt-10 border-b border-border">
          {publications
            .filter(({ links }) => links.some(({ label }) => label === "arXiv"))
            .map((publication) => (
              <PublicationRecord
                headingLevel={3}
                key={publication.slug}
                publication={publication}
              />
            ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/publications/">All publications</ButtonLink>
          <ButtonLink href={projects[0].links[0].url} variant="secondary">
            Research website
          </ButtonLink>
        </div>
      </section>
      <section className="py-14" id="method-index">
        <SectionHeader
          description="The same ideas recur across papers, software, writing and figures. Follow one method to everywhere it appears in the work."
          eyebrow="Method index"
          title="Where each idea appears"
        />
        <div className="mt-10 border-b border-border">
          {methods.map((method, index) => (
            <MethodRecord index={index} key={method.slug} method={method} />
          ))}
        </div>
      </section>
    </div>
  );
}
