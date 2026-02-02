import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label: string;
  secondaryLabel?: string;
};

function Checkbox({
  className,
  label,
  secondaryLabel,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id ?? React.useId();
  return (
    <div className="flex">
      <CheckboxPrimitive.Root
        id={checkboxId}
        data-slot="checkbox"
        className={cn(
          "peer border-input dark:bg-gi-primary/30 data-[state=checked]:bg-gi-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-gi-primary data-[state=checked]:border-gi-dark-ash focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-gi-red/20 dark:aria-invalid:ring-gi-red/40 aria-invalid:border-gi-red size-3.5 shrink-0 rounded-xs border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current transition-none"
        >
          <CheckIcon className="size-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <div className="flex flex-col ml-2">
        <label
          htmlFor={checkboxId}
          className="font-medium text-sm leading-3.5 text-gi-primary mb-1.5"
        >
          {label}
        </label>
        {secondaryLabel && (
          <span className="text-gi-gray text-sm leading-5">
            {secondaryLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export { Checkbox };
