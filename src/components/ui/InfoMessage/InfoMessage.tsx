import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const infoMessageVariants = cva("text-xs font-bold leading-[1.2] align-middle", {
  variants: {
    variant: {
      default: "text-gi-dark-gray",
      info: "text-gi-blue",
      error: "text-gi-red",
      warning: "text-gi-orange",
      success: "text-gi-green",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function InfoMessage({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof infoMessageVariants>) {
  return (
    <div
      data-slot="info-message"
      className={cn(infoMessageVariants({ variant, className }))}
      {...props}
    />
  );
}

export { InfoMessage, infoMessageVariants };
