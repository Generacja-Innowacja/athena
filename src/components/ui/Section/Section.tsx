import * as React from "react";

import { cn } from "@/lib/utils";

export type SectionActionsPosition = "right" | "bottom";

export interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  actions?: React.ReactNode;
  actionsPosition?: SectionActionsPosition;
  children: React.ReactNode;
  dataTestId?: string;
}

export function Section({
  title,
  actions,
  actionsPosition = "right",
  children,
  className,
  dataTestId,
  ...rest
}: SectionProps) {
  const showInlineActions = actions && actionsPosition === "right";
  const showBottomActions = actions && actionsPosition === "bottom";

  return (
    <section
      data-test-id={dataTestId}
      className={cn("rounded-lg border bg-background p-4 shadow-xs", className)}
      {...rest}
    >
      <header className="mb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="text-base font-semibold text-foreground">{title}</div>
          {showInlineActions && (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          )}
        </div>
        {showBottomActions && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {actions}
          </div>
        )}
      </header>
      <div className="text-sm text-muted-foreground">{children}</div>
    </section>
  );
}
