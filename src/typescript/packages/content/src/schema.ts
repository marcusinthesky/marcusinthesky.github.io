import { z } from "zod";

const url = z.url();

const linkSchema = z.object({
  label: z.string().min(1),
  url,
});

const slug = z.string().regex(/^[a-z0-9-]+$/);

/** Figures the web app can render; content names them, the app maps them to components. */
export const figureIds = [
  "galton-board",
  "kalman-filter",
  "monte-carlo-fan",
  "pareto-frontier",
  "pca-cloud",
  "reproducibility-graph",
] as const;
const figureId = z.enum(figureIds);

/**
 * A specimen's label: the same questions for every piece of evidence. Fields are
 * optional so a label never has to invent what is not known.
 */
const evidenceSchema = z.object({
  figure: figureId,
  /** The figure's name beneath its frame. */
  name: z.string().min(1),
  question: z.string().min(1).optional(),
  method: z.string().min(1).optional(),
  observation: z.string().min(1).optional(),
  limitation: z.string().min(1).optional(),
  source: linkSchema.optional(),
});

/** A narrative paragraph, optionally with a margin note (a limitation, source or aside). */
const paragraphSchema = z.union([
  z.string().min(1),
  z.object({ text: z.string().min(1), note: z.string().min(1) }),
]);

export const profileSchema = z.object({
  name: z.string().min(1),
  givenName: z.string().min(1),
  familyName: z.string().min(1),
  headline: z.string().min(1),
  summary: z.string().min(1),
  location: z.string().min(1),
  roles: z.array(z.string().min(1)).min(1),
  interests: z.array(z.string().min(1)).min(1),
  links: z.array(linkSchema).min(1),
});

export const publicationSchema = z.object({
  slug,
  title: z.string().min(1),
  authors: z.array(z.string().min(1)).min(1),
  year: z.number().int(),
  status: z.string().min(1),
  /** The question the paper asks, in one sentence. */
  lede: z.string().min(1).optional(),
  summary: z.string().min(1),
  keywords: z.array(z.string().min(1)),
  links: z.array(linkSchema).min(1),
});

export const projectSchema = z.object({
  slug,
  title: z.string().min(1),
  /** The question or claim the project answers, in one sentence. */
  lede: z.string().min(1).optional(),
  summary: z.string().min(1),
  narrative: z.array(paragraphSchema).min(1),
  role: z.string().min(1),
  technologies: z.array(z.string().min(1)),
  featured: z.boolean(),
  links: z.array(linkSchema).min(1),
  evidence: evidenceSchema.optional(),
});

export const writingSchema = z.object({
  slug,
  title: z.string().min(1),
  summary: z.string().min(1),
  source: z.string().min(1),
  publishedAt: z.iso.date(),
  canonicalUrl: url,
  local: z.boolean().default(false),
});

/**
 * A method or recurring question, and where it appears across the work. The
 * index lets a reader follow one idea through papers, projects, writing and figures.
 */
export const methodSchema = z.object({
  slug,
  name: z.string().min(1),
  question: z.string().min(1),
  publications: z.array(slug),
  projects: z.array(slug),
  writing: z.array(slug),
  figures: z.array(figureId),
});

/**
 * Where the work has circulated. Each entry says what kind of relationship it
 * is, so a talk, a preprint server and a university are never presented as the
 * same kind of credential.
 */
export const circulationSchema = z.object({
  kind: z.enum(["presentation", "paper", "software", "education"]),
  name: z.string().min(1),
  /** What happened there, when content supports it. */
  detail: z.string().min(1).optional(),
  href: z.string().min(1),
});

export const experienceSchema = z.object({
  organization: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  period: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
});

export const educationSchema = z.object({
  institution: z.string().min(1),
  qualification: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
});

export type Link = z.infer<typeof linkSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Writing = z.infer<typeof writingSchema>;
export type Evidence = z.infer<typeof evidenceSchema>;
export type FigureId = z.infer<typeof figureId>;
export type Paragraph = z.infer<typeof paragraphSchema>;
export type Method = z.infer<typeof methodSchema>;
export type Circulation = z.infer<typeof circulationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
