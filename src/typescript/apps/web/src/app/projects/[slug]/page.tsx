import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projects } from "@marcusinthesky/content";
import {
  Annotated,
  PageHeader,
  Specimen,
  SpecimenCaption,
  SpecimenFrame,
  SpecimenLabel,
  WorkingPage,
} from "@marcusinthesky/ui/patterns";
import { Badge, ButtonLink } from "@marcusinthesky/ui/primitives";

import { MethodLinks } from "@/components/domain/method-links";
import { figures } from "@/components/figures";
import { BrandIcon } from "@/components/integrations/brand-icon";
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata } from "@/lib/metadata";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}/`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();

  const { evidence } = project;
  const Figure = evidence ? figures[evidence.figure].Figure : null;

  return (
    <div className="page-shell" data-nav="projects">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.summary,
          author: { "@type": "Person", name: "Marcus Gawronsky" },
          codeRepository: project.links.find(({ label }) => label === "GitHub")?.url,
          keywords: project.technologies,
        }}
      />
      <PageHeader
        description={project.summary}
        eyebrow="Project case study"
        title={project.title}
      />

      {/* The evidence: one mounted specimen with its full label. */}
      {evidence && Figure ? (
        <section
          aria-labelledby="evidence-title"
          className="grid scroll-mt-24 grid-cols-[minmax(0,1fr)] items-start gap-8 border-t border-border py-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12"
          id="evidence"
        >
          <h2 className="sr-only" id="evidence-title">
            Evidence
          </h2>
          <Specimen>
            <SpecimenFrame>
              <Figure />
            </SpecimenFrame>
            <SpecimenCaption name={evidence.name} />
          </Specimen>
          <SpecimenLabel
            kind="Evidence"
            limitation={evidence.limitation}
            method={evidence.method}
            observation={evidence.observation}
            question={evidence.question}
            source={
              evidence.source ? (
                <a
                  className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                  href={evidence.source.url}
                  rel="noreferrer"
                >
                  {evidence.source.label}
                </a>
              ) : undefined
            }
          />
        </section>
      ) : null}

      {/* A working page: the account in prose, with limitations and sources in the margin. */}
      <article className="border-t border-border py-14">
        <WorkingPage className="typeset">
          <p>
            <strong>Role:</strong> {project.role}
          </p>
          {project.narrative.map((paragraph) =>
            typeof paragraph === "string" ? (
              <p key={paragraph}>{paragraph}</p>
            ) : (
              <Annotated key={paragraph.text} note={paragraph.note}>
                <p>{paragraph.text}</p>
              </Annotated>
            ),
          )}
          <h2>Technology and method</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <Badge key={technology}>{technology}</Badge>
            ))}
          </div>
          <MethodLinks kind="projects" slug={project.slug} />
          <div className="flex flex-wrap gap-3">
            {project.links.map((link, index) => (
              <ButtonLink
                href={link.url}
                key={link.url}
                variant={index === 0 ? "primary" : "secondary"}
              >
                <BrandIcon className="size-4" label={link.label} />
                {link.label}
              </ButtonLink>
            ))}
          </div>
        </WorkingPage>
      </article>
    </div>
  );
}
