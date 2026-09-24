import { describe, expect, test } from "bun:test";

import {
  PAPER_LINKS,
  STAGE_EDGES,
  STAGE_FAMILIES,
  totalStages,
} from "./reproducibility-graph-model";

describe("reproducibility graph", () => {
  test("accounts for every stage in dvc.yaml at eb3c1b5", () => {
    expect(totalStages).toBe(88);
  });

  test("only connects families that exist, never flowing right to left", () => {
    const column = new Map(STAGE_FAMILIES.map(({ column, id }) => [id, column]));
    for (const [from, to] of STAGE_EDGES) {
      expect(column.has(from) && column.has(to)).toBe(true);
      expect(column.get(to)).toBeGreaterThanOrEqual(column.get(from) ?? Infinity);
    }
    for (const [a, b] of PAPER_LINKS) expect(column.get(a)).toBe(column.get(b));
  });
});
