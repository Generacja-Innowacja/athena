import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import CheckIcon from "../../../assets/icons/check-icon.svg";
import InfoIcon from "../../../assets/icons/info-icon.svg";
import WarningIcon from "../../../assets/icons/warning-icon.svg";
import XIcon from "../../../assets/icons/x-icon.svg";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md font-medium [&_svg]:shrink-0 [&_svg]:size-[1em] [&_svg]:[color:inherit]",
  {
    variants: {
      type: {
        default:
          "bg-gi-dark-gray/10 text-gi-dark-gray border border-gi-dark-gray/10",
        info: "bg-gi-blue/10 text-gi-blue border border-gi-blue/10",
        success: "bg-gi-green/10 text-gi-green border border-gi-green/10",
        warning: "bg-gi-orange/10 text-gi-orange border border-gi-orange/10",
        error: "bg-gi-red/10 text-gi-red border border-gi-red/10",
      },
      variant: {
        primary: "",
        secondary: "",
        outlined: "bg-transparent",
        ghost: "bg-transparent border-transparent",
      },
      size: {
        regular: "h-7 px-2.5 text-xs gap-1.5",
        small: "h-5 px-2 text-[10px] gap-1 [&_svg]:size-3",
        big: "h-8 px-3 text-sm gap-2 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      type: "default",
      variant: "secondary",
      size: "regular",
    },
  },
);

const typeIconMap = {
  default: InfoIcon,
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  error: XIcon,
} as const;

export type BadgeType = "default" | "info" | "success" | "warning" | "error";
export type BadgeVariant = "primary" | "secondary" | "outlined" | "ghost";
export type BadgeSize = "regular" | "small" | "big";

export interface BadgeProps
  extends Omit<React.ComponentProps<"span">, "children">,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  LeftIcon?: React.ReactElement;
  isDismissible?: boolean;
  onDismiss?: () => void;
  dataTestId?: string;
}

function Badge({
  className,
  type,
  variant,
  size,
  children,
  LeftIcon,
  isDismissible = false,
  onDismiss,
  dataTestId,
  ...props
}: BadgeProps) {
  const DefaultIcon = type ? typeIconMap[type] : typeIconMap.default;
  const iconClassName = "size-[1em] [color:inherit]";

  const renderedIcon = LeftIcon ? (
    React.isValidElement(LeftIcon) ? (
      React.cloneElement(
        LeftIcon as React.ReactElement<{ className?: string }>,
        {
          className: cn(
            (LeftIcon as React.ReactElement<{ className?: string }>).props
              ?.className,
            iconClassName,
          ),
        },
      )
    ) : (
      LeftIcon
    )
  ) : (
    <span className={iconClassName}>
      <DefaultIcon />
    </span>
  );

  return (
    <span
      data-slot="badge"
      {...(dataTestId && { "data-test-id": dataTestId })}
      className={cn(badgeVariants({ type, variant, size, className }))}
      {...props}
    >
      {renderedIcon}
      {children}
      {isDismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="ml-0.5 -mr-0.5 flex items-center justify-center rounded p-0.5 transition-[filter] hover:brightness-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 [color:inherit]"
        >
          <X className="size-3.5" strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}

export { Badge, badgeVariants };
