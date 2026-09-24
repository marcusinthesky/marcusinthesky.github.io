import { useId } from "react";

import {
  PAPER_LINKS,
  PROVENANCE_STAGES,
  STAGE_EDGES,
  STAGE_FAMILIES,
  totalStages,
} from "./reproducibility-graph-model";

const NODE_WIDTH = 104;
const NODE_HEIGHT = 36;
const COLUMN_STEP = 128;
const LEFT = 12;

const byId = new Map(STAGE_FAMILIES.map((family) => [family.id, family]));
const x = (column: number) => LEFT + column * COLUMN_STEP;

function edgePath(from: string, to: string) {
  const a = byId.get(from);
  const b = byId.get(to);
  if (!a || !b) return "";
  if (a.column === b.column) {
    // Within a column (Geometry → Validation, Lean claims → Render): a straight vertical run.
    const cx = x(a.column) + NODE_WIDTH / 2;
    const down = b.y > a.y ? 1 : -1;
    return `M${cx} ${a.y + (down * NODE_HEIGHT) / 2}V${b.y - (down * NODE_HEIGHT) / 2}`;
  }
  const x1 = x(a.column) + NODE_WIDTH;
  const x2 = x(b.column);
  const mid = (x1 + x2) / 2;
  return `M${x1} ${a.y}C${mid} ${a.y} ${mid} ${b.y} ${x2} ${b.y}`;
}

function paperLink(from: string, to: string, index: number) {
  const a = byId.get(from);
  const b = byId.get(to);
  if (!a || !b) return "";
  const edge = x(a.column) - 6 - index * 5;
  return `M${x(a.column)} ${a.y}H${edge}V${b.y}H${x(b.column)}`;
}

/**
 * Pricing Perspective's DVC pipeline, collapsed to stage families. Static: the
 * figure is evidence to inspect, not a process to watch. It scrolls sideways on
 * narrow screens rather than shrinking its labels below legibility.
 */
export function ReproducibilityGraph() {
  const id = useId();

  return (
    <div
      aria-label="Pipeline stage graph (scrolls horizontally)"
      className="overflow-x-auto"
      role="region"
      tabIndex={0}
    >
      <svg
        aria-labelledby={`${id}-title ${id}-description`}
        className="h-auto w-full min-w-[36rem] text-foreground"
        role="img"
        viewBox="0 0 640 300"
      >
        <title id={`${id}-title`}>Pricing Perspective pipeline stage graph</title>
        <desc id={`${id}-description`}>
          {totalStages} pipeline stages grouped into families. Corpus and market data feed
          representations, geometry and validation, which feed three papers; the papers and the Lean
          claim checks feed the manuscript render. Monte Carlo studies declare no inputs from the
          rest of the pipeline. One provenance stage hashes the source code every stage depends on.
        </desc>

        <g className="fill-muted-foreground font-sans text-[10px] tracking-[0.1em] uppercase">
          <text x={LEFT} y="14">
            Code provenance · {PROVENANCE_STAGES} stage · an input to every stage below
          </text>
        </g>
        <line className="stroke-border" strokeDasharray="3 3" x1={LEFT} x2={628} y1="22" y2="22" />

        <g aria-hidden="true" className="fill-none stroke-muted-foreground" strokeWidth="1">
          {STAGE_EDGES.map(([from, to]) => (
            <path d={edgePath(from, to)} key={`${from}-${to}`} opacity="0.55" />
          ))}
          {PAPER_LINKS.map(([from, to], index) => (
            <path d={paperLink(from, to, index)} key={`${from}-${to}`} strokeDasharray="2 2" />
          ))}
        </g>

        <g aria-hidden="true">
          {STAGE_FAMILIES.map(({ column, id: family, name, stages, y }) => (
            <g key={family}>
              <rect
                className="fill-card stroke-foreground"
                height={NODE_HEIGHT}
                strokeWidth="1"
                width={NODE_WIDTH}
                x={x(column)}
                y={y - NODE_HEIGHT / 2}
              />
              <text
                className="fill-foreground font-sans text-[11px] font-semibold"
                x={x(column) + 8}
                y={y - 3}
              >
                {name}
              </text>
              <text
                className="fill-muted-foreground font-sans text-[10px] tabular-nums"
                x={x(column) + 8}
                y={y + 11}
              >
                {stages} {stages === 1 ? "stage" : "stages"}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
