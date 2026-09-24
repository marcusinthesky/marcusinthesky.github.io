import { describe, expect, test } from "bun:test";

import { circulation, methods, profile, projects, publications, writing } from "./index";

describe("public content", () => {
  test("contains no direct contact details", () => {
    const serialized = JSON.stringify({
      profile,
      projects,
      publications,
      writing,
      methods,
      circulation,
    });
    expect(serialized).not.toMatch(/@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    expect(serialized).not.toMatch(/\+27|professional references/i);
  });

  test("uses unique slugs", () => {
    for (const records of [projects, publications, writing, methods]) {
      const slugs = records.map(({ slug }) => slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  test("the method index only references records that exist", () => {
    const known = {
      publications: new Set(publications.map(({ slug }) => slug)),
      projects: new Set(projects.map(({ slug }) => slug)),
      writing: new Set(writing.map(({ slug }) => slug)),
    };
    for (const method of methods) {
      for (const kind of ["publications", "projects", "writing"] as const) {
        for (const slug of method[kind]) expect(known[kind].has(slug)).toBe(true);
      }
      const references =
        method.publications.length +
        method.projects.length +
        method.writing.length +
        method.figures.length;
      expect(references).toBeGreaterThan(0);
    }
  });

  test("every circulation entry has a destination", () => {
    for (const entry of circulation) expect(entry.href.length).toBeGreaterThan(0);
  });
});
