import { circulation } from "@marcusinthesky/content";
import type { ReactNode } from "react";

import styles from "./circulation-marquee.module.css";

const logo = "h-auto w-[clamp(6.75rem,10vw,9.5rem)] grayscale";
const serifMark = "font-serif text-[clamp(1.2rem,1.9vw,1.65rem)] tracking-[-0.03em]";

/** How each venue is drawn; names and destinations come from the content record. */
const marks: Record<string, ReactNode> = {
  // The symposium publishes no logo of its own; set in the WFC wordmark style.
  "World Finance & Banking Symposium": (
    <span className="label-sm leading-tight">
      World Finance &amp;
      <br />
      Banking
      <br />
      Symposium
    </span>
  ),
  "World Finance Conference": (
    <img
      alt=""
      className={logo}
      height={59}
      src="/logos/world-finance-conference.png"
      width={150}
    />
  ),
  arXiv: (
    <span className="font-serif text-[clamp(1.2rem,1.9vw,1.65rem)] tracking-[-0.07em]">arXiv</span>
  ),
  "Hugging Face": (
    <span className="font-sans text-[clamp(0.9rem,1.4vw,1.25rem)] font-bold tracking-[-0.04em]">
      Hugging Face
    </span>
  ),
  GitHub: (
    <span className="font-sans text-[clamp(0.9rem,1.4vw,1.25rem)] font-bold tracking-[-0.02em]">
      GitHub
    </span>
  ),
  "University of Cape Town": (
    <img alt="" className={logo} height={53} src="/logos/uct-horizontal-black.svg" width={364} />
  ),
};

/**
 * Where the work has been presented, deposited and published, drifting past as
 * a slow, edge-faded marquee in one muted tone. It pauses on hover or keyboard
 * focus, and wraps into a static row under reduced motion.
 */
export function CirculationMarquee() {
  return (
    <section aria-labelledby="circulation-marquee-title" className="border-y border-border">
      <div className="page-shell grid items-center gap-4 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
        <h2 className="label-sm text-muted-foreground" id="circulation-marquee-title">
          Published and presented through
        </h2>
        <div
          className={`${styles.viewport} overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]`}
        >
          <div className={`${styles.track} flex w-max motion-reduce:w-auto`}>
            {[false, true].map((duplicate) => (
              <ul
                aria-hidden={duplicate || undefined}
                className={`flex shrink-0 list-none items-center gap-12 p-0 pr-12 ${duplicate ? "motion-reduce:hidden" : "motion-reduce:flex-wrap"}`}
                key={String(duplicate)}
              >
                {circulation.map(({ href, name }) => (
                  <li key={name}>
                    <a
                      aria-label={name}
                      className="inline-flex min-h-14 items-center text-muted-foreground transition-[color,translate] duration-500 ease-out-expo hover:-translate-y-0.5 hover:text-foreground [&_img]:opacity-75 [&_img]:transition-opacity hover:[&_img]:opacity-100"
                      href={href}
                      rel={href.startsWith("/") ? undefined : "noreferrer"}
                      tabIndex={duplicate ? -1 : undefined}
                      title={name}
                    >
                      {marks[name] ?? <span className={serifMark}>{name}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
