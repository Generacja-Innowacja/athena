import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";
import CheckIcon from "../../../assets/icons/check-icon.svg";
import InfoIcon from "../../../assets/icons/info-icon.svg";
import WarningIcon from "../../../assets/icons/warning-icon.svg";
import XIcon from "../../../assets/icons/x-icon.svg";

const infoMessageVariants = cva(
  "flex items-center align-middle w-full text-xs font-bold leading-[1.2]",
  {
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
  },
);

const infoMessageIconVariants = cva(
  "flex items-center justify-center border rounded-full h-8 w-8 mr-2 ",
  {
    variants: {
      variant: {
        default: "border-gi-dark-gray/10",
        info: "border-gi-blue/10",
        error: "border-gi-red/10",
        warning: "border-gi-orange/10",
        success: "border-gi-green/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const variantIconMap = {
  default: InfoIcon,
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  error: XIcon,
} as const;

function InfoMessage({
  className,
  variant,
  children,
}: React.ComponentProps<"div"> & VariantProps<typeof infoMessageVariants>) {
  const Icon = variantIconMap[variant ?? "default"] ?? variantIconMap.default;
  return (
    <div
      data-slot="info-message"
      className={cn(infoMessageVariants({ variant, className }))}
    >
      <div className={infoMessageIconVariants({ variant })}>
        <Icon />
      </div>
      <div>{children}</div>
    </div>
  );
}

export { InfoMessage, infoMessageVariants };
