import type { ReactNode } from "react";

type SpecimenProps = { className?: string; children: ReactNode };

/**
 * A mounted plate: an object worth inspecting, framed on white, with its label
 * beneath or beside the frame, never inside it. Compose with SpecimenFrame,
 * SpecimenCaption and, where the object is evidence, SpecimenLabel.
 */
export function Specimen({ children, className = "" }: SpecimenProps) {
  return <figure className={`m-0 flex flex-col ${className}`}>{children}</figure>;
}

const ASPECTS = {
  auto: "",
  square: "grid aspect-square place-items-center",
  wide: "grid aspect-[2/1] place-items-center",
} as const;

type SpecimenFrameProps = {
  /** Fixes the field's proportions, e.g. for a motif; figures with their own geometry use `auto`. */
  aspect?: keyof typeof ASPECTS;
  className?: string;
  children: ReactNode;
};

/** The white field. It grows when the plate is stretched (e.g. in a tile row), keeping the object centred. */
export function SpecimenFrame({ aspect = "auto", children, className = "" }: SpecimenFrameProps) {
  return (
    <div
      className={`flex flex-1 flex-col justify-center border border-border bg-card p-5 ${className}`}
    >
      {aspect === "auto" ? children : <div className={ASPECTS[aspect]}>{children}</div>}
    </div>
  );
}

type SpecimenCaptionProps = {
  /** The specimen's name, in spaced capitals. */
  name: string;
  /** One short line: what it shows, where it comes from, or its binomial. */
  note?: string;
};

/** The museum label beneath the frame. */
export function SpecimenCaption({ name, note }: SpecimenCaptionProps) {
  return (
    <figcaption className="mt-3 text-center">
      <span className="block label-sm text-foreground">{name}</span>
      {note ? (
        <span className="mt-1 block font-serif text-sm text-muted-foreground italic">{note}</span>
      ) : null}
    </figcaption>
  );
}

type SpecimenLabelProps = {
  /** What kind of object this is, e.g. "Method demonstration". */
  kind?: string;
  /** Why the investigation exists. */
  question?: ReactNode;
  /** How the object was produced or examined. */
  method?: ReactNode;
  /** What the reader should notice. */
  observation?: ReactNode;
  /** Where the interpretation stops. */
  limitation?: ReactNode;
  /** Where the figure, code, manuscript or data can be inspected. */
  source?: ReactNode;
  className?: string;
};

const FIELDS = [
  ["question", "Question"],
  ["method", "Method"],
  ["observation", "Observation"],
  ["limitation", "Limitation"],
  ["source", "Source"],
] as const;

/**
 * The specimen's record: a fixed vocabulary, so every piece of evidence on the
 * site answers the same questions in the same order. Omit what is not known.
 */
export function SpecimenLabel({ className = "", kind, ...fields }: SpecimenLabelProps) {
  return (
    <div className={className}>
      {kind ? <p className="label-md text-foreground">{kind}</p> : null}
      <dl className={`${kind ? "mt-4 " : ""}border-t border-border`}>
        {FIELDS.map(([key, term]) =>
          fields[key] === undefined ? null : (
            <div className="grid gap-1 border-b border-border py-3" key={key}>
              <dt className="label-sm text-muted-foreground">{term}</dt>
              <dd className="m-0 caption text-foreground">{fields[key]}</dd>
            </div>
          ),
        )}
      </dl>
    </div>
  );
}
