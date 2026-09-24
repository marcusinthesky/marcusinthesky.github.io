import type { CSSProperties } from "react";
import { useId } from "react";

import { actionClass } from "@marcusinthesky/ui/primitives";

import {
  createGaltonBalls,
  GALTON_APEX,
  GALTON_BALL_COUNT,
  GALTON_DX,
  GALTON_FLOOR,
  GALTON_ROWS,
  GALTON_STACK_STEP,
  galtonBins,
  galtonNormalCurve,
  galtonPegs,
} from "./galton-board-model";
import styles from "./galton-board.module.css";

const balls = createGaltonBalls();
const fallDuration = 2300;
const launchInterval = 140;
const finalLanding = fallDuration + (GALTON_BALL_COUNT - 1) * launchInterval;

export function GaltonBoard() {
  const id = useId();

  return (
    <div className={styles.board}>
      <svg
        aria-labelledby={`${id}-title ${id}-description`}
        className="h-auto w-full text-foreground"
        role="img"
        viewBox="0 0 400 490"
      >
        <title id={`${id}-title`}>Galton board simulation</title>
        <desc id={`${id}-description`}>
          Forty balls make ten independent left or right choices and accumulate by number of right
          turns. Outlined bars show the expected binomial counts; the normal approximation appears
          after the final ball lands.
        </desc>

        <g className="fill-muted-foreground font-sans text-[12px] tracking-[0.1em] uppercase">
          <text x="20" y="20">
            {GALTON_BALL_COUNT} trials
          </text>
          <text textAnchor="end" x="380" y="20">
            n = {GALTON_ROWS} · p = ½
          </text>
        </g>

        <g className="fill-muted-foreground">
          {galtonPegs.map(({ x, y }) => (
            <circle cx={x} cy={y} key={`${x}-${y}`} r="2.25" />
          ))}
        </g>

        <g className="stroke-border" strokeWidth="1">
          {galtonBins.map(({ x }) => (
            <line
              key={x}
              x1={x - GALTON_DX / 2}
              x2={x - GALTON_DX / 2}
              y1="300"
              y2={GALTON_FLOOR}
            />
          ))}
          <line
            x1={GALTON_APEX.x + (GALTON_ROWS / 2 + 0.5) * GALTON_DX}
            x2={GALTON_APEX.x + (GALTON_ROWS / 2 + 0.5) * GALTON_DX}
            y1="300"
            y2={GALTON_FLOOR}
          />
        </g>

        <g className="fill-none stroke-border" strokeWidth="1">
          {galtonBins.map(({ height, x }) => (
            <rect height={height} key={x} width="18" x={x - 9} y={GALTON_FLOOR - height} />
          ))}
        </g>

        <path
          className={`${styles.draw} fill-none stroke-data-estimate`}
          d={galtonNormalCurve}
          pathLength={1}
          strokeDasharray="1"
          strokeWidth="1.25"
          style={{ animationDelay: `${finalLanding}ms` }}
        />

        <g aria-hidden="true" className="fill-primary">
          {balls.map(({ bin, id, stackIndex }, index) => (
            <circle
              className={styles.settle}
              cx={galtonBins[bin]?.x}
              cy={GALTON_FLOOR - 4 - stackIndex * GALTON_STACK_STEP}
              key={`settled-${id}`}
              r="3.5"
              style={{ animationDelay: `${fallDuration + index * launchInterval}ms` }}
            />
          ))}
        </g>

        <g aria-hidden="true" className="fill-foreground">
          {balls.map(({ id, path }, index) => (
            <circle
              className={`${styles.fall} ${styles.movingBall}`}
              data-galton="ball"
              cx="0"
              cy="0"
              key={id}
              r="4"
              style={
                {
                  animationDelay: `${index * launchInterval}ms`,
                  offsetPath: `path("${path}")`,
                } as CSSProperties
              }
            />
          ))}
        </g>

        <line
          className="stroke-foreground"
          strokeWidth="1.25"
          x1="30"
          x2="370"
          y1={GALTON_FLOOR}
          y2={GALTON_FLOOR}
        />
        <g className="fill-muted-foreground font-sans text-[11px]" textAnchor="middle">
          {galtonBins.map(({ x }, index) => (
            <text key={x} x={x} y="480">
              {index}
            </text>
          ))}
        </g>
      </svg>

      <div className="mt-1 flex min-h-11 items-center justify-between gap-4 border-t border-border font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground">
        <span>Number of right turns</span>
        {/* Checkbox controls: they pause and replay this figure alone, without script or navigation. */}
        <div className="flex min-h-11 items-center gap-5 text-foreground">
          <span className={styles.pauseControl}>
            <input
              className={`${styles.pause} sr-only`}
              data-galton="pause"
              id={`${id}-pause`}
              type="checkbox"
            />
            <label className={actionClass("text")} htmlFor={`${id}-pause`}>
              <span className={styles.pauseCopy}>Pause</span>
              <span className={styles.resumeCopy}>Resume</span>
            </label>
          </span>
          <span
            className={styles.replayControl}
            style={{ animationDelay: `${finalLanding + 1200}ms` }}
          >
            <input
              aria-label="Replay the simulation"
              className={`${styles.replay} sr-only`}
              data-galton="replay"
              id={`${id}-replay`}
              type="checkbox"
            />
            <label className={actionClass("text")} htmlFor={`${id}-replay`}>
              Replay
            </label>
          </span>
          <span className={styles.staticStatus} data-galton-status="">
            {GALTON_BALL_COUNT}-ball sample
          </span>
        </div>
      </div>
    </div>
  );
}
