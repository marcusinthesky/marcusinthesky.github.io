import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/research/",
  "/publications/",
  "/projects/",
  "/blog/",
  "/cv/",
  "/contact/",
];

/**
 * Lets time-based entrance animations finish so axe measures the colours visitors read,
 * not an intermediate frame of a fade. Infinite and scroll-driven animations never finish.
 */
const settleEntranceAnimations = (page: Page) =>
  page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter(
          (animation) =>
            animation.timeline === document.timeline &&
            Number.isFinite(Number(animation.effect?.getComputedTiming().endTime)),
        )
        .map((animation) => animation.finished.catch(() => undefined)),
    ),
  );

for (const route of routes) {
  test(`${route} is navigable and accessible`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);

    await settleEntranceAnimations(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

const viewports = [
  ["desktop", { width: 1280, height: 800 }],
  ["mobile", { width: 375, height: 800 }],
] as const;

// GitHub Pages derives Content-Type from the file extension; the local server mirrors it.
const resourceTypes = [
  [/\.css$/, "text/css"],
  [/\.woff2$/, "font/woff2"],
  [/\.svg$/, "image/svg+xml"],
  [/\.png$/, "image/png"],
] as const;

/** The resolved paper token and the body background it should paint. */
const paper = (page: Page) =>
  page.evaluate(() => {
    const probe = document.createElement("div");
    probe.style.backgroundColor = "var(--background)";
    document.body.append(probe);
    const token = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return { body: getComputedStyle(document.body).backgroundColor, token };
  });

for (const route of [...routes, "/projects/pricing-perspective/"]) {
  for (const [name, viewport] of viewports) {
    test(`${route} loads and styles every local resource at ${name} width`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const failures: string[] = [];
      page.on("requestfailed", (request) =>
        failures.push(`${request.url()} ${request.failure()?.errorText}`),
      );
      page.on("response", (response) => {
        if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
        const { pathname } = new URL(response.url());
        const type = response.headers()["content-type"] ?? "";
        for (const [pattern, expected] of resourceTypes) {
          if (pattern.test(pathname) && !type.startsWith(expected)) {
            failures.push(`${response.url()} served as ${type}`);
          }
        }
      });

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      expect(failures).toEqual([]);

      const { body, token } = await paper(page);
      expect(token).not.toBe("rgba(0, 0, 0, 0)");
      expect(body).toBe(token);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      ).toBe(true);
    });
  }
}

test("unknown addresses receive the styled not-found page", async ({ page }) => {
  const response = await page.goto("/no-such-page/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
  const { body, token } = await paper(page);
  expect(body).toBe(token);
});

test("the retired writing address forwards to the blog", async ({ page }) => {
  await page.goto("/writing/");
  await expect(page).toHaveURL(/\/blog\/$/);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("the public CV is downloadable", async ({ request }) => {
  const response = await request.get("/cv/Marcus-Gawronsky-CV.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("the Galton board provides a completed reduced-motion state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("[data-galton-status]")).toHaveText("40-ball sample");
  await expect(page.locator('[data-galton="ball"]').first()).toBeHidden();
  await expect(page.getByRole("img", { name: "Galton board simulation" })).toBeVisible();
});

test("the Galton board can pause and resume without JavaScript", async ({ page }) => {
  await page.goto("/");
  const pause = page.locator('[data-galton="pause"]');
  const movingBall = page.locator('[data-galton="ball"]').first();

  await page.getByText("Pause", { exact: true }).click();
  await expect(pause).toBeChecked();
  await expect(movingBall).toHaveCSS("animation-play-state", "paused");

  await page.getByText("Resume", { exact: true }).click();
  await expect(movingBall).toHaveCSS("animation-play-state", "running");
});

test("the Galton board replays in place, without navigating", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    (window as Window & { beforeReplay?: boolean }).beforeReplay = true;
  });
  const movingBall = page.locator('[data-galton="ball"]').first();
  const before = await movingBall.evaluate((ball) => getComputedStyle(ball).animationName);

  // Replay arrives once the sample has landed; activate it as soon as it can be used.
  const replay = page.getByRole("checkbox", { name: "Replay the simulation" });
  await page.getByText("Replay", { exact: true }).click({ timeout: 15_000 });
  await expect(replay).toBeChecked();
  // Replay stays where it is, so keyboard focus is not lost while the figure reruns.
  await expect(replay).toBeFocused();

  expect(new URL(page.url()).pathname).toBe("/");
  expect(
    await page.evaluate(() => (window as Window & { beforeReplay?: boolean }).beforeReplay),
  ).toBe(true);
  const after = await movingBall.evaluate((ball) => getComputedStyle(ball).animationName);
  expect(after).not.toBe(before);
});

test("the circulation marquee drifts, and rests as one static row under reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const marquee = page.getByRole("region", { name: "Published and presented through" });
  const track = marquee.locator("ul").first().locator("..");
  await expect(track).not.toHaveCSS("animation-name", "none");
  // Only the first copy is reachable; the duplicate that closes the loop is hidden from readers.
  await expect(marquee.getByRole("link", { name: "arXiv" })).toHaveCount(1);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(marquee.locator("ul").nth(1)).toBeHidden();
});

test("specimens stay on the page as the reader scrolls past", async ({ page }) => {
  await page.goto("/");
  const plate = page.locator('section[data-chapter="lotus"] figure svg').first();
  await plate.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: "instant" }));
  await expect(plate).toHaveCSS("opacity", "1");
});

test("on narrow screens the introduction and prose come before their figures", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const top = (locator: Locator) => locator.evaluate((node) => node.getBoundingClientRect().top);
  expect(await top(page.locator("h1"))).toBeLessThan(
    await top(page.getByRole("link", { name: "Explore the research" })),
  );
  expect(
    await top(
      page.getByRole("heading", { name: "From mathematical structure to working machinery" }),
    ),
  ).toBeLessThan(await top(page.getByRole("img", { name: "Galton board simulation" })));
});

test("the method index links every method from its records", async ({ page }) => {
  await page.goto("/research/");
  const methodLink = page.locator('main a[href^="/research/#method-"]').first();
  const target = (await methodLink.getAttribute("href"))?.split("#")[1] ?? "";
  await expect(page.locator(`#${target}`)).toHaveCount(1);
});

test("a case study mounts its evidence with a full label", async ({ page }) => {
  await page.goto("/projects/pricing-perspective/");
  const evidence = page.locator("#evidence");
  await expect(
    evidence.getByRole("img", { name: "Pricing Perspective pipeline stage graph" }),
  ).toBeVisible();
  for (const term of ["Question", "Method", "Observation", "Limitation", "Source"]) {
    await expect(evidence.getByText(term, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole("note").first()).toBeVisible();
});

test("machine-readable projections are public", async ({ request }) => {
  for (const path of [
    "/data/profile.json",
    "/data/methods.json",
    "/feed.xml",
    "/llms.txt",
    "/sitemap.xml",
  ]) {
    expect((await request.get(path)).ok()).toBe(true);
  }
});

test("the footer mountain line is static under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const paths = page.locator("footer svg path");
  await expect(paths.first()).toBeAttached();
  for (const path of await paths.all()) {
    await expect(path).toHaveCSS("animation-name", "none");
  }
});

const chapterThreads = [
  ["/research/", "rgb(36, 95, 199)"],
  ["/publications/", "rgb(36, 95, 199)"],
  ["/blog/", "rgb(181, 35, 38)"],
  ["/about/", "rgb(47, 107, 58)"],
  ["/projects/", "rgb(23, 23, 23)"],
  ["/cv/", "rgb(23, 23, 23)"],
] as const;

for (const [route, colour] of chapterThreads) {
  test(`${route} carries its chapter thread`, async ({ page }) => {
    await page.goto(route);
    const thread = page.locator('main [data-part="thread"]').first();
    await expect(thread).toHaveAttribute("aria-hidden", "true");
    await expect(thread).toHaveCSS("background-color", colour);
  });
}

test("home sections take the thread of their chapter", async ({ page }) => {
  await page.goto("/");
  const thread = (chapter: string) =>
    page.locator(`section[data-chapter="${chapter}"] header [data-part="thread"]`);
  await expect(thread("lotus")).toHaveCSS("background-color", "rgb(36, 95, 199)");
  await expect(thread("rose")).toHaveCSS("background-color", "rgb(181, 35, 38)");
});

test("section threads are static under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const threads = page.locator('main header [data-part="thread"]');
  await expect(threads.first()).toBeAttached();
  for (const thread of await threads.all()) {
    await expect(thread).toHaveCSS("animation-name", "none");
  }
});

const navSections = [
  ["/about/", "about", "rgb(47, 107, 58)"],
  ["/research/", "research", "rgb(36, 95, 199)"],
  ["/publications/", "research", "rgb(36, 95, 199)"],
  ["/projects/", "projects", "rgb(23, 23, 23)"],
  ["/blog/", "writing", "rgb(181, 35, 38)"],
  ["/cv/", "cv", "rgb(23, 23, 23)"],
] as const;

/** The sections whose navigation thread is fully drawn. */
const drawnThreads = (nav: Locator) =>
  nav
    .locator('[data-part="thread"]')
    .evaluateAll((threads) =>
      threads
        .filter((thread) => getComputedStyle(thread).scale === "1")
        .map((thread) => thread.closest("[data-nav]")?.getAttribute("data-nav")),
    );

for (const [route, section, colour] of navSections) {
  test(`${route} draws the ${section} navigation thread`, async ({ page }) => {
    await page.goto(route);
    const nav = page.getByRole("navigation", { name: "Primary" });
    const thread = nav.locator(`[data-nav="${section}"] [data-part="thread"]`);
    await expect(thread).toHaveCSS("background-color", colour);
    expect(await drawnThreads(nav)).toEqual([section]);
  });
}

test("the home page has no current navigation section", async ({ page }) => {
  await page.goto("/");
  expect(await drawnThreads(page.getByRole("navigation", { name: "Primary" }))).toEqual([]);
});

test("navigation threads draw in on hover and keyboard focus", async ({ page }) => {
  await page.goto("/research/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  const thread = (section: string) => nav.locator(`[data-nav="${section}"] [data-part="thread"]`);

  await nav.getByRole("link", { name: "Writing" }).hover();
  await expect(thread("writing")).toHaveCSS("scale", "1");
  await expect(thread("writing")).toHaveCSS("background-color", "rgb(181, 35, 38)");

  await page.mouse.move(0, 400);
  await nav.getByRole("link", { name: "Research" }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(nav.getByRole("link", { name: "About" })).toBeFocused();
  await expect(thread("about")).toHaveCSS("scale", "1");
});

test("the mobile menu marks the current section", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/blog/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("navigation", { name: "Menu" });
  await expect(menu).toBeVisible();
  await expect(menu.locator('[data-nav="writing"] [data-part="thread"]')).toHaveCSS(
    "background-color",
    "rgb(181, 35, 38)",
  );
  expect(await drawnThreads(menu)).toEqual(["writing"]);
});

test("the header rook is decorative", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('header a[href="/"] svg')).toHaveAttribute("aria-hidden", "true");
});

test("headings use the self-hosted Fraunces family", async ({ page }) => {
  await page.goto("/");
  const family = await page.locator("h1").evaluate((node) => getComputedStyle(node).fontFamily);
  expect(family).toMatch(/Fraunces/);
});

test("heritage ornaments render finished under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about/");
  const animated = page.locator(
    '[data-part="compass-star"] [data-verb], [data-part="seal"] [data-verb], .motif-rule-line',
  );
  await expect(animated.first()).toBeAttached();
  for (const element of await animated.all()) {
    await expect(element).toHaveCSS("animation-name", "none");
  }
});
