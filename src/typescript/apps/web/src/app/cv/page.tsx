import type { Metadata } from "next";

import {
  education,
  experience,
  leadership,
  openSourceContributions,
  projects,
  publications,
} from "@marcusinthesky/content";
import { PageHeader } from "@marcusinthesky/ui/patterns";
import { Badge, ButtonLink } from "@marcusinthesky/ui/primitives";
import { Download } from "lucide-react";

import { PublicationRecord } from "@/components/domain/publication-record";
import { ExperienceCard } from "@/components/domain/experience-card";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Curriculum vitae",
  description: "Public curriculum vitae of Marcus Gawronsky.",
  path: "/cv/",
});

export default function CvPage() {
  return (
    <div className="page-shell" data-nav="cv">
      <PageHeader
        description="Professional work, quantitative research, technical leadership and education. Read the overview below or download the two-page CV."
        eyebrow="Curriculum vitae"
        motif="book"
        title="Curriculum vitae"
      />
      <div className="border-t border-border py-10">
        <ButtonLink href="/cv/Marcus-Gawronsky-CV.pdf">
          <Download aria-hidden="true" className="mr-2" size={15} /> Download PDF
        </ButtonLink>
      </div>
      <section className="grid gap-10 py-8 lg:grid-cols-[0.68fr_1.32fr]">
        <aside>
          <h2 className="font-serif text-3xl">Capabilities</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Python",
              "TypeScript",
              "SQL",
              "Econometrics",
              "Causal inference",
              "Representation learning",
              "Optimal transport",
              "Nix",
              "Kubernetes",
              "GCP",
              "R",
              "Terraform",
              "DVC",
              "Lean 4",
            ].map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
          <h2 className="mt-12 font-serif text-3xl">Education</h2>
          <div className="mt-5 space-y-5">
            {education.map((entry) => (
              <div key={entry.qualification}>
                <p className="font-medium">{entry.qualification}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.institution} · {entry.period}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{entry.summary}</p>
              </div>
            ))}
          </div>
        </aside>
        <div className="space-y-5">
          {experience.map((entry) => (
            <ExperienceCard
              entry={entry}
              headingLevel={2}
              key={`${entry.organization}-${entry.period}`}
            />
          ))}
        </div>
      </section>
      <section className="border-t border-border py-10">
        <h2 className="mb-6 font-serif text-3xl">Research and publications</h2>
        {publications
          .filter(({ links }) => links.some(({ label }) => label === "arXiv"))
          .map((publication) => (
            <PublicationRecord headingLevel={3} key={publication.slug} publication={publication} />
          ))}
      </section>
      <section className="border-t border-border py-10">
        <h2 className="mb-6 font-serif text-3xl">Research software and open source</h2>
        <ul className="space-y-3">
          {projects
            .filter(({ slug }) =>
              ["pricing-perspective", "insitu", "precarious-papers"].includes(slug),
            )
            .map((project) => (
              <li key={project.slug}>
                <a className="underline underline-offset-4" href={`/projects/${project.slug}/`}>
                  {project.title}
                </a>{" "}
                — {project.summary}
              </li>
            ))}
          {openSourceContributions.map((contribution) => (
            <li key={contribution.url}>
              <a className="underline underline-offset-4" href={contribution.url}>
                {contribution.project}
              </a>{" "}
              — {contribution.summary}
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-border py-10">
        <h2 className="mb-6 font-serif text-3xl">Leadership, teaching and community</h2>
        <div className="space-y-5">
          {leadership.map((entry) => (
            <ExperienceCard entry={entry} key={`${entry.organization}-${entry.role}`} />
          ))}
        </div>
      </section>
      <section className="border-t border-border py-10">
        <h2 className="mb-6 font-serif text-3xl">Awards</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>2019 — Winner, Uber Movement/SANRAL Cape Town Data Science Challenge.</li>
          <li>2018 — Third place, Capitec BBLB Kaggle Data Science Competition.</li>
          <li>Class Medal, Natural Resource Economics, University of Cape Town.</li>
        </ul>
      </section>
    </div>
  );
}
