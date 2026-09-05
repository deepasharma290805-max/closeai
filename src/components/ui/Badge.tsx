import * as React from "react";
import { cn } from "@/src/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default: "bg-bg-main text-text-primary border border-border-light",
    success: "bg-success-bg text-success border border-success/20",
    warning: "bg-warning-bg text-warning border border-warning/20",
    error: "bg-error-bg text-error border border-error/20",
    outline: "text-text-secondary border border-border-light",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
