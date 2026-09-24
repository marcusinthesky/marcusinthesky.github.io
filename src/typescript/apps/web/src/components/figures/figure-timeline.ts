import type { CSSProperties } from "react";

/** Places one figure animation on its load-time timeline, in milliseconds. */
export function timelineStep(start: number, duration: number): CSSProperties {
  return { animationDelay: `${start}ms`, animationDuration: `${duration}ms` };
}
