import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const TextareaVariants = cva(
  "px-3 py-2 w-[346px] h-[122px] text-gi-primary rounded-3xl  h-30.5 ",
  {
    variants: {
      variant: {
        default:
          "text-gi-primary border-[1px] border-gi-primary/10 focus:ring-0 focus:outline-none",
        hover:
          "text-gi-primary border-[1px] border-gi-primary/10 hover:border-gi-primary/20 transition-all duration-300 ease-in-out focus:ring-0 focus:outline-none",
        focus:
          "text-gi-primary border-[1px] border-gi-primary/10 hover:border-gi-primary/20 transition-all duration-300 ease-in-out focus:border-gi-primary/20 focus:ring-0 focus:outline-1",
        disabled:
          "text-gi-primary border-[1px] focus:ring-0 focus:outline-none cursor-not-allowed",
        error:
          "text-gi-primary border-[1px] border-gi-red focus:ring-0 focus:outline-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TextareaVariant = VariantProps<typeof TextareaVariants>["variant"];

const labelVariants: Record<string, string> = {
  default: "text-gi-primary",
  error: "text-gi-primary",
  disabled: "text-gray-400",
};

export interface TextAreaProps {
  className?: string
  characterLimitVisibility?: boolean;
  characterLimit?: number;
  label?: string;
  isRequired?: boolean;
  isError?: boolean;
  errorText?: string;
  helper?: string;
  isDisabled?: boolean;
  variant?: TextareaVariant;
  value?: string;
  onChange: (value: string) => void
  placeholder: string;
}


export function Textarea({
  className,
  variant,
  isError,
  label,
  isDisabled,
  errorText,
  helper,
  isRequired,
  value,
  onChange,
  characterLimit,
  characterLimitVisibility,
  ...props
}: TextAreaProps) {
  const shouldShowErrorText = Boolean(isError && errorText);
  const footerText = shouldShowErrorText ? errorText : helper;
  const effectiveCharacterLimit = typeof characterLimit === "number" ? characterLimit : 500;
  const hasCharacterLimit = typeof effectiveCharacterLimit === "number";
  const rawValue = value ?? "";
  const normalizedValue = hasCharacterLimit ? rawValue.slice(0, effectiveCharacterLimit) : rawValue;
  const currentLength = normalizedValue.length;
  const isFooterError = shouldShowErrorText;

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void {
    if (isDisabled) {
      return;
    }
    const nextRawValue = event.target.value;
    if (hasCharacterLimit && typeof characterLimit === "number") {
      const limitedValue = nextRawValue.slice(0, characterLimit);
      onChange(limitedValue);
      return;
    }

    onChange(nextRawValue);
  }
  const footerClassName = cn(
    "text-[14px]",
    isFooterError ? "text-gi-red" : "text-gi-primary/50",
  );

  return (
    <div>
      <p className={cn("text-[16px]", labelVariants[variant ?? "default"])}>
        {label}
        {isRequired && <span className="text-red-500 ml-1 size-4">*</span>}{""}
      </p>
      <textarea
        value={normalizedValue}
        onChange={handleChange}
        maxLength={hasCharacterLimit ? characterLimit : undefined}
        data-slot="textarea"
        disabled={isDisabled}
        className={cn(TextareaVariants({ variant: isError ? "error" : "default", className }))}
        {...props}
      />
      <div className="flex justify-between items-start text-[14px] mt-1 min-h-4">
        <p className={footerClassName}>{footerText}</p>
        {hasCharacterLimit ? (
          <p className="text-gi-primary/50 text-[14px]">
            {currentLength}/{effectiveCharacterLimit}
          </p>
        ) : null}
      </div>
    </div>
  );
}
