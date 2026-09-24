import type { ReactNode } from "react";

import { Specimen, SpecimenCaption, SpecimenFrame } from "../../patterns/specimen/specimen";
import { Motif } from "../motif";
import { Rook } from "../parts/heritage";
import { Lotus, PalmBranch, Rose, Shuttle } from "../parts/prain";

/** Chapter emblems: one constituent motif each, never a shield composition. */
const EMBLEMS = {
  lotus: { part: <Lotus />, viewBox: "0 0 256 256", aspect: "square" },
  rose: { part: <Rose />, viewBox: "0 0 256 256", aspect: "square" },
  shuttle: { part: <Shuttle />, viewBox: "12 84 232 88", aspect: "wide" },
  palm: { part: <PalmBranch />, viewBox: "0 0 256 256", aspect: "square" },
  rook: { part: <Rook />, viewBox: "0 0 256 256", aspect: "square" },
} as const satisfies Record<
  string,
  { part: ReactNode; viewBox: string; aspect: "square" | "wide" }
>;

export type EmblemMotif = keyof typeof EMBLEMS;

/** One motif drawn as a study at plate scale, centred in its field. It stays on the page once drawn. */
export function Emblem({ motif }: { motif: EmblemMotif }) {
  const { part, viewBox } = EMBLEMS[motif];
  return (
    <Motif className="mx-auto block h-auto w-4/5" detail="study" motion="scroll" viewBox={viewBox}>
      {part}
    </Motif>
  );
}

type EmblemPlateProps = {
  motif: EmblemMotif;
  /** The motif's name beneath the frame. */
  name: string;
  /** Its binomial or source. */
  note?: string;
  className?: string;
};

/** A chapter's frontispiece: its motif at plate scale, framed and captioned like a specimen. */
export function EmblemPlate({ className, motif, name, note }: EmblemPlateProps) {
  return (
    <Specimen className={className}>
      <SpecimenFrame aspect={EMBLEMS[motif].aspect}>
        <Emblem motif={motif} />
      </SpecimenFrame>
      <SpecimenCaption name={name} note={note} />
    </Specimen>
  );
}
