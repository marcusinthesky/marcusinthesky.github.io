/**
 * Pricing Perspective's pipeline, collapsed to stage families. Stage counts and
 * edges are taken from dvc.yaml at commit eb3c1b5: an edge means a stage in one
 * family declares an output of another family as an input.
 */
export type StageFamily = {
  id: string;
  name: string;
  stages: number;
  /** Column (left to right: inputs → outputs) and row centre in the figure. */
  column: number;
  y: number;
};

export const STAGE_FAMILIES: readonly StageFamily[] = [
  { id: "corpus", name: "Corpus", stages: 3, column: 0, y: 70 },
  { id: "market", name: "Market data", stages: 3, column: 0, y: 200 },
  { id: "representations", name: "Representations", stages: 3, column: 1, y: 70 },
  { id: "backtest", name: "Backtest check", stages: 1, column: 1, y: 250 },
  { id: "geometry", name: "Geometry", stages: 10, column: 2, y: 70 },
  { id: "validation", name: "Validation", stages: 3, column: 2, y: 160 },
  { id: "paper1", name: "Paper 1", stages: 14, column: 3, y: 50 },
  { id: "paper3", name: "Paper 3", stages: 17, column: 3, y: 120 },
  { id: "paper5", name: "Paper 5", stages: 20, column: 3, y: 190 },
  { id: "montecarlo", name: "Monte Carlo", stages: 8, column: 3, y: 262 },
  { id: "render", name: "Render", stages: 3, column: 4, y: 120 },
  { id: "lean", name: "Lean claims", stages: 2, column: 4, y: 230 },
];

/** The one stage every other stage depends on: a hash of the source code. */
export const PROVENANCE_STAGES = 1;

/** Forward edges between families. */
export const STAGE_EDGES: readonly (readonly [string, string])[] = [
  ["corpus", "representations"],
  ["corpus", "backtest"],
  ["corpus", "paper1"],
  ["corpus", "paper5"],
  ["market", "backtest"],
  ["market", "validation"],
  ["market", "paper1"],
  ["market", "paper3"],
  ["market", "paper5"],
  ["representations", "geometry"],
  ["representations", "validation"],
  ["representations", "paper1"],
  ["representations", "paper3"],
  ["representations", "paper5"],
  ["geometry", "validation"],
  ["geometry", "paper1"],
  ["geometry", "paper3"],
  ["geometry", "paper5"],
  ["validation", "paper1"],
  ["paper1", "render"],
  ["paper3", "render"],
  ["paper5", "render"],
  ["lean", "render"],
];

/** The papers also consume one another's results; drawn as links within their column. */
export const PAPER_LINKS: readonly (readonly [string, string])[] = [
  ["paper1", "paper3"],
  ["paper3", "paper5"],
  ["paper1", "paper5"],
];

export const totalStages =
  PROVENANCE_STAGES + STAGE_FAMILIES.reduce((sum, { stages }) => sum + stages, 0);
