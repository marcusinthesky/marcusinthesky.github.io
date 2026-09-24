import type { ComponentPropsWithoutRef } from "react";

import { actionClass, type ActionVariant } from "./action-class";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ActionVariant;
  arrow?: boolean;
};

export function ButtonLink({
  arrow = false,
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={actionClass(variant, className)} {...props}>
      {/* The chapter thread takes the bottom edge on hover and keyboard focus. */}
      {variant === "text" ? null : (
        <span
          aria-hidden="true"
          className="absolute -inset-x-px -bottom-px h-0.5 origin-left scale-x-0 bg-chapter transition-transform duration-300 ease-out-expo group-hover/button:scale-x-100 group-focus-visible/button:scale-x-100"
          data-part="thread"
        />
      )}
      {children}
      {arrow ? (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover/button:translate-x-[3px]"
        >
          →
        </span>
      ) : null}
    </a>
  );
}
