import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const TextAreaVariants = cva(
  "px-3 py-2 w-[346px] h-[122px] text-gi-primary rounded-3xl  h-30.5 border-[1px] ",
  {
    variants: {
      variant: {
        default:
          "border-gi-primary/10 hover:border-gi-primary/20 focus:border-gi-primary/20 focus:outline-1 duration-300 ease-in-out",
        disabled: "focus:ring-0 focus:outline-none text-gi-gray cursor-not-allowed",
        error: "border-gi-red focus:ring-0 focus:outline-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const labelVariants: Record<string, string> = {
  default: "text-gi-primary",
  error: "text-gi-primary",
  disabled: "text-gi-primary/50",
};

export interface TextAreaProps
  extends Omit<React.ComponentProps<"textarea">, "onChange"> {
  className?: string;
  value?: string;
  characterLimitVisibility?: boolean;
  characterLimit?: number;
  label?: string;
  disabled?: boolean;
  isRequired?: boolean;
  isError?: boolean;
  errorText?: string;
  helper?: React.ReactNode;
  onChange: (value: string) => void;
  placeholder?: string;
  dataTestId?: string;
}

export function TextArea({
  className,
  isError,
  label,
  disabled,
  errorText,
  helper,
  isRequired,
  value,
  onChange,
  characterLimit,
  characterLimitVisibility,
  dataTestId,
  ...props
}: TextAreaProps) {
  const shouldShowErrorText = Boolean(isError && errorText);
  const footerText = shouldShowErrorText ? errorText : helper;
  const hasCharacterLimit = typeof characterLimit === "number";
  const effectiveCharacterLimit = hasCharacterLimit
    ? characterLimit
    : undefined;
  const rawValue = value ?? "";
  const normalizedValue =
    hasCharacterLimit && typeof effectiveCharacterLimit === "number"
      ? rawValue.slice(0, effectiveCharacterLimit)
      : rawValue;
  const currentLength = normalizedValue.length;
  const isFooterError = shouldShowErrorText;
  const shouldShowCounter =
    Boolean(characterLimitVisibility) && hasCharacterLimit;
  const computedVariant = disabled ? "disabled" : isError ? "error" : "default"

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    if (disabled) {
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
      <p className={cn("font-bold", labelVariants[computedVariant ?? "default"])}>
        {label}
        {isRequired && <span className="text-gi-red ml-1 size-4">*</span>}
        {""}
      </p>
      <textarea
        disabled={disabled}
        value={normalizedValue}
        required={isRequired}
        onChange={handleChange}
        maxLength={hasCharacterLimit ? characterLimit : undefined}
        data-slot="textarea"
        data-test-id={dataTestId}
        className={cn(
          TextAreaVariants({
            variant: disabled
              ? "disabled"
              : isError
                ? "error"
                : computedVariant || "default",
            className,
          }),
        )}
        {...props}
      />
      <div className="flex justify-between items-start text-[14px] mt-1 min-h-4">
        <p className={footerClassName}>{footerText}</p>
        {shouldShowCounter ? (
          <p className="text-gi-primary/50 text-[14px]">
            {currentLength}/{effectiveCharacterLimit}
          </p>
        ) : null}
      </div>
    </div>
  );
}
