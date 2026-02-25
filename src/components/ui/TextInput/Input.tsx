import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = {
  dataTestId?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helper?: React.ReactNode;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  errorText?: string;
  isError?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  wrapperClassName?: string;
} & Omit<React.ComponentProps<"input">, "value" | "onChange" | "placeholder">;

function Input({
  dataTestId,
  value,
  onChange,
  label,
  placeholder,
  helper,
  LeftIcon,
  RightIcon,
  prefix,
  suffix,
  errorText,
  isError,
  isRequired,
  isDisabled,
  wrapperClassName,
  id,
  className,
  type = "text",
  ...inputProps
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const showError = isError;
  const disabled = isDisabled 
  const required = isRequired 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={cn("flex flex-col gap-1", wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 text-sm font-medium leading-3.5 text-gi-primary"
        >
          {label}
          {isRequired && <span className="ml-0.5 text-gi-red">*</span>}
        </label>
      )}

   <div
     className={cn(
       "flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 transition-colors duration-300 ease-in-out focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] hover:border-ring/70",
       isError && "border-gi-red",
       disabled &&
         "bg-muted text-muted-foreground border-input/60 cursor-not-allowed hover:border-input/60 opacity-60",
     )}
   >
        {LeftIcon && (
          <span className="flex items-center justify-center text-muted-foreground">
            {LeftIcon}
          </span>
        )}

        {prefix && (
          <span className="text-sm text-muted-foreground">{prefix}</span>
        )}

        <input 
         id={inputId}
         type={type}
        value={value}
       onChange={handleChange}
       placeholder={placeholder}
      required={required}
       disabled={disabled}
         data-test-id={dataTestId}
         aria-invalid={isError || undefined}
        className={cn("flex-1 border-0 bg-transparent px-0 py-0", className)}
         {...inputProps}
         />
                {suffix && (
          <span className="text-sm text-muted-foreground">{suffix}</span>
        )}

        {RightIcon && (
          <span className="flex items-center justify-center text-muted-foreground">
            {RightIcon}
          </span>
        )}
      </div>

      <div className="mt-1 min-h-[1rem] text-xs leading-[1.2]">
        {showError ? (
          <span className="text-gi-red">{errorText}</span>
        ) : (
          helper && <span className="text-gi-gray">{helper}</span>
        )}
      </div>
    </div>
  );
}

export { Input };
