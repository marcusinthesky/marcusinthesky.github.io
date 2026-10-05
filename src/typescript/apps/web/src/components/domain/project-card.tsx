import type { Project } from "@marcusinthesky/content";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardFooter,
  CardLede,
  CardLink,
  CardTitle,
} from "@marcusinthesky/ui/patterns";

import { MethodLinks } from "@/components/domain/method-links";
import { NudgeArrow } from "@/components/site/nudge-arrow";

export function ProjectCard({
  project,
  preview,
  headingLevel = 2,
}: {
  project: Project;
  preview?: { alt: string; label: string; src: string };
  headingLevel?: 2 | 3;
}) {
  return (
    <Card caption={project.technologies.slice(0, 4).join(" · ")} className="h-full">
      {preview ? (
        <figure className="-mx-6 -mt-6 mb-5 overflow-hidden border-b border-border">
          <div className="relative aspect-[16/10] bg-surface-muted">
            <Image
              alt={preview.alt}
              className="object-cover object-top"
              fill
              sizes="(min-width: 1280px) 45vw, (min-width: 768px) 45vw, 100vw"
              src={preview.src}
            />
          </div>
          <figcaption className="px-6 py-2 label-sm text-muted-foreground">
            Website preview · {preview.label}
          </figcaption>
        </figure>
      ) : null}
      <CardTitle level={headingLevel}>{project.title}</CardTitle>
      {project.lede ? <CardLede>{project.lede}</CardLede> : null}
      <CardBody>
        <p>{project.summary}</p>
        <MethodLinks kind="projects" slug={project.slug} />
      </CardBody>
      <CardFooter>
        <CardLink href={`/projects/${project.slug}/`} icon={<NudgeArrow size={15} />} stretched>
          Read the case study
        </CardLink>
        {project.links.map((link) => (
          <a
            className="relative z-10 inline-flex min-h-11 items-center gap-2 label-md text-primary"
            href={link.url}
            key={link.url}
            rel="noreferrer"
          >
            <span className="underline-draw">{link.label}</span>
            <NudgeArrow size={15} />
          </a>
        ))}
      </CardFooter>
    </Card>
  );
}
