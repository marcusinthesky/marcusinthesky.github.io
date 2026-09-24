import type { FigureId } from "@marcusinthesky/content";
import type { ComponentType } from "react";

import { GaltonBoard } from "./galton-board/galton-board";
import { KalmanFilter } from "./kalman-filter/kalman-filter";
import { MonteCarloFan } from "./monte-carlo-fan/monte-carlo-fan";
import { ParetoFrontier } from "./pareto-frontier/pareto-frontier";
import { PcaCloud } from "./pca-cloud/pca-cloud";
import { ReproducibilityGraph } from "./reproducibility-graph/reproducibility-graph";

type FigureEntry = {
  Figure: ComponentType;
  /** The figure's specimen name. */
  name: string;
  /** Where the figure is mounted on the site. */
  href: string;
};

/** Content names figures by id; this maps each id to its component and its place on the site. */
export const figures: Record<FigureId, FigureEntry> = {
  "galton-board": { Figure: GaltonBoard, name: "Galton board", href: "/#frontispiece" },
  "kalman-filter": { Figure: KalmanFilter, name: "Kalman filter", href: "/blog/" },
  "monte-carlo-fan": { Figure: MonteCarloFan, name: "Monte Carlo paths", href: "/publications/" },
  "pareto-frontier": { Figure: ParetoFrontier, name: "Pareto frontier", href: "/projects/" },
  "pca-cloud": { Figure: PcaCloud, name: "Principal components", href: "/research/" },
  "reproducibility-graph": {
    Figure: ReproducibilityGraph,
    name: "Pipeline stage graph",
    href: "/projects/pricing-perspective/#evidence",
  },
};
