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
        description="Whether information encoded in language-model representations can be given useful mathematical structure—and whether that structure says something about dependence, interaction, and risk. The recurring objects are distributions, geometry, covariance, spatial interaction, and uncertainty."
        eyebrow="Research"
        title="Distributional information as financial structure"
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
            "Language-model representations become empirical objects rather than opaque features.",
          ],
          [
            "Geometry",
            "Optimal transport and information geometry describe relationships among probability distributions.",
          ],
          [
            "Evidence",
            "Econometrics, simulation, replication pipelines, and formalisation constrain the claims.",
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
          {publications.slice(0, 3).map((publication) => (
            <PublicationRecord headingLevel={3} key={publication.slug} publication={publication} />
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
