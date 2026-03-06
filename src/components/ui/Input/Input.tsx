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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)} >
      {label && (
        <label
          htmlFor={inputId}
          className="font-bold leading-[1.2] text-[#005F60]"
        >
          {label}
          {isRequired && <span className="ml-0.5 text-gi-red">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={isRequired}
        disabled={isDisabled}
        data-test-id={dataTestId}
        aria-invalid={isError || undefined}
        className={cn(
          "h-8 rounded-full border border-[#D1D5DB] bg-transparent px-3 py-1 text-base text-[#005F60] placeholder:text-[#005F60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1D5DB] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...inputProps} 
        />
      {helper && (
      <p className="text-sm text-[#005F60]">
    {helper}
  </p>
)}
