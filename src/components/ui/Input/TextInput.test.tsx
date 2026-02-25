import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";

import { Input } from "./Input";

describe("<Input />", () => {
  const setup = (
    overrideProps?: Partial<React.ComponentProps<typeof Input>>,
  ) => {
    const onChange = vi.fn();

    const props: React.ComponentProps<typeof Input> = {
      value: "",
      onChange,
      label: "Label",
      placeholder: "Placeholder",
      ...overrideProps,
    };

    render(<Input {...props} />);

    const input = screen.getByPlaceholderText(
      props.placeholder ?? "Placeholder",
    ) as HTMLInputElement;

    return { input, onChange, props };
  };

  it("should render with default props", () => {
    const { input } = setup();

    expect(input).toBeInTheDocument();
  });

  it("should render label when provided", () => {
    setup({ label: "First name" });

    expect(screen.getByText("First name")).toBeInTheDocument();
  });

  it("should render helper text when provided and no error", () => {
    setup({ helper: "This is helper text" });

    expect(screen.getByText("This is helper text")).toBeInTheDocument();
  });

  it("should render error text instead of helper when isError is true", () => {
    setup({
      helper: "This is helper text",
      errorText: "This is error text",
      isError: true,
    });

    expect(screen.queryByText("This is helper text")).not.toBeInTheDocument();
    expect(screen.getByText("This is error text")).toBeInTheDocument();
  });

  it("should call onChange with new value when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Controlled() {
      const [value, setValue] = React.useState("");
      return (
        <Input
          label="Label"
          placeholder="Placeholder"
          value={value}
          onChange={(next) => {
            setValue(next);
            onChange(next);
          }}
        />
      );
    }

    render(<Controlled />);
    const input = screen.getByPlaceholderText(
      "Placeholder",
    ) as HTMLInputElement;

    await user.type(input, "abc");

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith("abc");
  });

  it("should not call onChange when disabled via isDisabled", async () => {
    const user = userEvent.setup();
    const { input, onChange } = setup({ isDisabled: true });

    expect(input).toBeDisabled();

    await user.type(input, "a");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should not call onChange when disabled via native prop", async () => {
    const user = userEvent.setup();
    const { input, onChange } = setup({ disabled: true });

    expect(input).toBeDisabled();

    await user.type(input, "a");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("should render required indicator when isRequired is true", () => {
    setup({ isRequired: true });

    const asterisk = screen.getByText("*");
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass("text-gi-red");
  });

  it("should mark input as required when isRequired is true", () => {
    const { input } = setup({ isRequired: true });

    expect(input).toBeRequired();
  });

  it("should set aria-invalid when in error state", () => {
    const { input } = setup({ isError: true });

    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("should render prefix and suffix when provided", () => {
    setup({ prefix: "$", suffix: "USD" });

    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("should render LeftIcon and RightIcon when provided", () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    const RightIcon = () => <span data-testid="right-icon">R</span>;

    setup({
      LeftIcon: <LeftIcon />,
      RightIcon: <RightIcon />,
    });

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("should pass dataTestId to input as data-test-id", () => {
    const { input } = setup({ dataTestId: "my-input" });

    expect(input).toHaveAttribute("data-test-id", "my-input");
  });

  it("should accept additional native input props", () => {
    const { input } = setup({
      maxLength: 10,
      autoComplete: "email",
      type: "email",
    });

    expect(input).toHaveAttribute("maxlength", "10");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveAttribute("type", "email");
  });
});
