import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        danger:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      isIconButton: {
        true: "p-0",
      },
    },
    compoundVariants: [
      {
        isIconButton: true,
        size: "default",
        className: "w-10 h-10",
      },
      {
        isIconButton: true,
        size: "sm",
        className: "w-8 h-8",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isIconButton,
      asChild = false,
      leftIcon,
      rightIcon,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

  if (asChild) {
  return (
    <Slot
      className={cn(
        buttonVariants({ variant, size, isIconButton, className }),
        isLoading && "opacity-70 cursor-wait",
      )}
      ref={ref}
      data-slot="button"
      {...props}
      {...({ disabled: isDisabled } as any)}
    >
      {React.isValidElement(children) ? (
        React.cloneElement(children as React.ReactElement<any>, {
          children: (
            <>
              {isLoading ? <Loader2 className="animate-spin" /> : leftIcon}
              {(children as React.ReactElement<any>).props.children}
              {!isLoading && rightIcon}
            </>
          ),
        })
      ) : (
        children
      )}
    </Slot>
  );
}  

    const content = (
      <>
        {isLoading ? <Loader2 className="animate-spin" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </>
    );

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, isIconButton, className }),
          isLoading && "opacity-70 cursor-wait",
        )}
        ref={ref}
        disabled={isDisabled}
        data-slot="button"
        {...props}
      >
        {content}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
