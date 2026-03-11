import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const progressBarVariants = cva(
  "min-w-[200px] w-full overflow-hidden rounded-full bg-border transition-[width] duration-300",
  {
    variants: {
      size: {
        small: "h-2",
        regular: "h-4",
      },
      variant: {
        default: "bg-slate-900",
        info: "bg-blue-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
      },
    },
    defaultVariants: {
      size: "regular",
      variant: "default",
    },
  },
);

const progressBarFillVariants = cva("h-full transition-[width] duration-300", {
  variants: {
    variant: {
      default: "bg-primary",
      info: "bg-gi-blue",
      success: "bg-gi-green",
      warning: "bg-gi-orange",
      error: "bg-gi-red",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value: number;
  dataTestId?: string;
interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants>,
    VariantProps<typeof progressBarFillVariants> {
  value: number;
  dataTestId?: string;
}

function ProgressBar({
  className,
  value,
  size,
  variant,
  dataTestId,
  ...props
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      data-slot="progress-bar"
      data-test-id={dataTestId}
      className={cn(progressBarVariants({ size, variant, className }))}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className={progressBarFillVariants({ variant })}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

export { ProgressBar, progressBarVariants, progressBarFillVariants };
