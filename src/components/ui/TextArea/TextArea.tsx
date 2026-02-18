import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <div>
      <label
        htmlFor="textarea"
        className={cn("font-sans text-gi-primary line-clamp-1")}
      >
        Label
      </label>
      <textarea
        id="textarea"
        data-slot="textarea"
        className={cn(
          "px-3 py-2 border-2 border-[rgba(0,69,84,0.12)] rounded-3xl w-86.5 h-30.5  text-gi-primary",
        )}
        {...props}
      />
    </div>
  );
}

function RequiredTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <div>
      <label
        htmlFor="textarea"
        className={cn("font-sans text-gi-primary line-clamp-1")}
      >
        Label<label className={cn("text-gi-red")}>*</label>
      </label>
      <textarea
        id="textarea"
        data-slot="textarea"
        className={cn(
          "px-3 py-2 border-2 border-[rgba(0,69,84,0.12)] rounded-3xl w-86.5 h-30.5  text-gi-primary",
        )}
        {...props}
      />
    </div>
  );
}

export { Textarea, RequiredTextarea };
