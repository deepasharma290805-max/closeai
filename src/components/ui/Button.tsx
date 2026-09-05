import * as React from "react";
import { cn } from "@/src/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-[14px] font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-active-black focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-active-black text-white hover:bg-black/80 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:-translate-y-px",
      secondary: "bg-white text-text-primary border border-border-light hover:border-border-strong hover:bg-black/[0.02] shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
      outline: "border border-border-strong bg-transparent hover:bg-black/5",
      ghost: "hover:bg-black/5 hover:text-text-primary text-text-secondary",
    };

    const sizes = {
      sm: "h-[36px] px-3 text-[13px]",
      md: "h-[42px] px-4",
      lg: "h-[46px] px-6 text-[15px]",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
