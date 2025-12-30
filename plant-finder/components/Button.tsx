import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-white text-stone-900 border border-stone-200 hover:bg-stone-50",
  ghost: "bg-transparent text-stone-700 hover:text-stone-900 hover:bg-stone-100",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
        styles[variant],
        className,
      ].join(" ")}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      {...props}
      className={[
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
        styles[variant],
        className,
      ].join(" ")}
    />
  );
}
