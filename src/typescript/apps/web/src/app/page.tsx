import { projects, publications, writing } from "@marcusinthesky/content";
import {
  EmblemPlate,
  HeritageMark,
  PalmCorner,
  type HeritageMotif,
} from "@marcusinthesky/ui/heritage";
import {
  SectionHeader,
  Specimen,
  SpecimenCaption,
  SpecimenFrame,
  SpecimenLabel,
} from "@marcusinthesky/ui/patterns";
import { ButtonLink } from "@marcusinthesky/ui/primitives";

import { CirculationMarquee } from "@/components/domain/circulation-marquee";
import { ProjectCard } from "@/components/domain/project-card";
import { PublicationRecord } from "@/components/domain/publication-record";
import { WritingRecord } from "@/components/domain/writing-record";
import { GaltonBoard } from "@/components/figures/galton-board/galton-board";
import { AskAi, researchPrompt } from "@/components/integrations/ask-ai";

// Each pillar introduces the motif its chapter carries below: lotus for research,
// shuttle for engineering, the compass star for applied decisions.
const pillars: readonly (readonly [string, string, HeritageMotif])[] = [
  [
    "Quantitative research",
    "Models, estimators, geometric representations, uncertainty, portfolio risk, and empirical testing.",
    "lotus",
  ],
  [
    "Research engineering",
    "Reproducible computational systems, provenance, validation, automation, and production-quality scientific software.",
    "shuttle",
  ],
  [
    "Applied AI",
    "Modern representation models as measurable objects inside statistical and decision systems—not merely as interfaces.",
    "star",
  ],
];

const galtonSource =
  "https://github.com/marcusinthesky/marcusinthesky.github.io/blob/main/src/typescript/apps/web/src/components/figures/galton-board/galton-board-model.ts";

// The page opens like the first spread of a working notebook: a ruled title
// block, then a mounted specimen annotated by the chapter's prose, then compact
// records. The Galton board is an interim frontispiece until a research figure
// takes its place; the marquee shows where the work has circulated.
export default function HomePage() {
  const featured = projects.filter(({ featured }) => featured);
  const recentWriting = [...writing]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-border">
        <div className="page-shell grid animate-rise gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-0">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_9rem] lg:pr-12">
            <div>
              <h1 className="text-balance font-serif text-display-lg">
                Research made operational.
              </h1>
              <p className="mt-5 max-w-md text-balance label-md text-muted-foreground">
                {"Quantitative research · Applied AI · Research engineering"}
              </p>
            </div>
            {/* A margin ornament on wide screens; omitted on narrow ones, where the work comes first. */}
            <PalmCorner
              className="hidden size-36 justify-self-end lg:block"
              motion="reveal"
              side="right"
            />
          </div>
          <div className="lg:border-l lg:border-border lg:pl-12">
            <p className="max-w-lg text-balance font-serif text-headline-md">
              Ideas that survive contact with production.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/research/">Explore the research</ButtonLink>
              <ButtonLink arrow href="/projects/" variant="text">
                See the systems
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Prose first in reading order; on wide screens the specimen takes the left of the spread. */}
      <section
        className="page-shell grid scroll-mt-24 gap-12 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-0"
        id="frontispiece"
      >
        <div className="lg:order-2 lg:border-l lg:border-border lg:pl-10">
          <SectionHeader
            description="My work sits between research and production: probability, representation learning, information geometry, econometrics, optimisation, and the practical problem of making analytical results reproducible."
            eyebrow="The work"
            index={1}
            title="From mathematical structure to working machinery"
          />
          <blockquote className="mt-8 max-w-2xl border-l-2 border-foreground pl-5 font-serif text-headline-sm">
            Can an interesting idea become rigorous enough to defend and robust enough to use?
          </blockquote>
          <dl className="mt-10">
            {pillars.map(([term, detail, motif]) => (
              <div className="grid gap-2 border-t border-border py-5" key={term}>
                <dt className="label-md flex items-center gap-3">
                  <HeritageMark motif={motif} motion="scroll" size="lg" />
                  {term}
                </dt>
                <dd className="text-muted-foreground">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid items-start gap-8 lg:order-1 lg:pr-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
          <Specimen className="w-full max-w-md justify-self-center xl:max-w-none">
            <SpecimenFrame>
              <GaltonBoard />
            </SpecimenFrame>
            <SpecimenCaption
              name="Galton board"
              note="Independent choices → binomial paths → a normal law"
            />
          </Specimen>
          <SpecimenLabel
            className="w-full max-w-md justify-self-center"
            observation="Forty balls, ten coin flips each: the stacks trace a normal curve."
            question="How do coin flips become a bell curve?"
            source={
              <a
                className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                href={galtonSource}
                rel="noreferrer"
              >
                Simulation code
              </a>
            }
          />
        </div>
      </section>

      <CirculationMarquee />

      <section className="page-shell py-16">
        <SectionHeader
          description="Each project pairs a research question with the computational machinery needed to test it, reproduce it, and carry it forward."
          eyebrow="Selected work"
          index={2}
          motif={<HeritageMark motif="shuttle" motion="scroll" size="lg" />}
          title="Research, systems, and tools"
        />
        <div className="mt-10 grid items-start gap-6 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard headingLevel={3} key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <div className="page-shell">
        <section className="py-16" data-chapter="lotus">
          <SectionHeader
            description="Whether information in language-model representations can be given mathematical structure—and what that structure says about dependence, interaction, and risk."
            eyebrow="Research"
            index={3}
            title="Questions I am working on"
          />
          <div className="mt-10 grid items-start gap-8 xl:grid-cols-[10rem_minmax(0,1fr)]">
            <EmblemPlate className="max-w-40" motif="lotus" name="Lotus" note="Nelumbo nucifera." />
            <div className="border-b border-border">
              {publications.slice(0, 3).map((publication) => (
                <PublicationRecord
                  headingLevel={3}
                  key={publication.slug}
                  publication={publication}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/publications/" variant="secondary">
              View all research
            </ButtonLink>
            <AskAi label="Ask about this work" prompt={researchPrompt} />
          </div>
        </section>

        <section className="border-t border-border py-16" data-chapter="rose">
          <SectionHeader
            description="The machinery around the research: reproducibility, provenance, modelling choices, and treating analysis as software."
            eyebrow="Writing"
            index={4}
            title="Working notes"
          />
          <div className="mt-10 grid items-start gap-8 xl:grid-cols-[10rem_minmax(0,1fr)]">
            <EmblemPlate
              className="max-w-40"
              motif="rose"
              name="Rose"
              note="Hulthemia. Rosa persica."
            />
            <div className="border-b border-border">
              {recentWriting.map((entry) => (
                <WritingRecord entry={entry} headingLevel={3} key={entry.slug} />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <ButtonLink href="/blog/" variant="secondary">
              All writing
            </ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}
