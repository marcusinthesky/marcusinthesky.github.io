/** The action vocabulary shared by links, labels and (when one is needed) buttons. */
export type ActionVariant = "primary" | "secondary" | "text";

const base =
  "group/button label-md relative inline-flex min-h-11 items-center justify-center gap-2 rounded-none transition-colors duration-300";

const variants = {
  primary:
    "border border-foreground bg-foreground px-5 py-2 text-background no-underline hover:bg-foreground/90",
  secondary:
    "border border-foreground bg-transparent px-5 py-2 text-foreground no-underline hover:bg-muted",
  text: "cursor-pointer py-2 text-foreground underline decoration-1 underline-offset-[0.35em] hover:decoration-2",
} satisfies Record<ActionVariant, string>;

/** Class recipe for an action, so any element (a, label, button) reads as the same control. */
export function actionClass(variant: ActionVariant = "primary", className = "") {
  return `${base} ${variants[variant]}${className ? ` ${className}` : ""}`;
}
