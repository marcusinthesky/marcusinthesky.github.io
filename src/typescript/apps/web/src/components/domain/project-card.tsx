import type { Project } from "@marcusinthesky/content";
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
  headingLevel = 2,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  return (
    <Card caption={project.technologies.slice(0, 4).join(" · ")} className="h-full">
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
      </CardFooter>
    </Card>
  );
}
