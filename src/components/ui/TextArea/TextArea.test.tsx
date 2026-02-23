import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "./TextArea";

describe("<Textarea />", () => {
  const baseProps = {
    placeholder: "Type here...",
    onChange: vi.fn(),
  };

  beforeEach(() => {
    baseProps.onChange = vi.fn();
  });

  describe("rendering", () => {
    it("renders with default props and empty value", () => {
      render(<Textarea {...baseProps} />);

      const textarea = screen.getByRole("textbox", { name: "" });
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("data-slot", "textarea");
      expect(textarea).toHaveAttribute("placeholder", baseProps.placeholder);
      expect(textarea).toHaveValue("");
    });

    it("renders label and required asterisk when isRequired is true", () => {
      render(
        <Textarea
          {...baseProps}
          label="Opis"
          isRequired
        />,
      );

      const label = screen.getByText("Opis", { selector: "p" });
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("*");
    });

    it("applies disabled label style when variant is disabled", () => {
      render(
        <Textarea
          {...baseProps}
          label="Opis"
          variant="disabled"
        />,
      );

      const label = screen.getByText("Opis", { selector: "p" });
      expect(label).toHaveClass("text-gray-400");
    });

    it("applies error label style when variant is error", () => {
      render(
        <Textarea
          {...baseProps}
          label="Opis"
          variant="error"
        />,
      );

      const label = screen.getByText("Opis", { selector: "p" });
      expect(label).toHaveClass("text-gi-primary");
    });
  });

  describe("character limit", () => {
    it("uses default 500 character limit when characterLimit is not provided", () => {
      render(
        <Textarea
          {...baseProps}
          value="abc"
        />,
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).not.toHaveAttribute("maxLength");

      const counter = screen.getByText("3/500");
      expect(counter).toBeInTheDocument();
    });

    it("shows character counter and maxLength when characterLimit is provided", () => {
      render(
        <Textarea
          {...baseProps}
          value="abc"
          characterLimit={10}
        />,
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("maxLength", "10");

      const counter = screen.getByText("3/10");
      expect(counter).toBeInTheDocument();
    });

    it("truncates initial value to the provided characterLimit", () => {
      const longValue = "a".repeat(20);
      render(
        <Textarea
          {...baseProps}
          value={longValue}
          characterLimit={10}
        />,
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveValue("a".repeat(10));

      const counter = screen.getByText("10/10");
      expect(counter).toBeInTheDocument();
    });
  });

  describe("footer text and error state", () => {
    it("shows helper text when not in error state", () => {
      render(
        <Textarea
          {...baseProps}
          helper="Pomocniczy tekst"
        />,
      );

      const footer = screen.getByText("Pomocniczy tekst");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("text-gi-primary/50");
    });

    it("shows error text and error styling when isError is true and errorText is provided", () => {
      render(
        <Textarea
          {...baseProps}
          isError
          errorText="Błąd pola"
        />,
      );

      const footer = screen.getByText("Błąd pola");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("text-gi-red");

      const textarea = screen.getByRole("textbox");
      expect(textarea.className).toContain("border-gi-red");
    });
  });

  describe("onChange behavior", () => {
    it("calls onChange with new value when not disabled", () => {
      render(<Textarea {...baseProps} />);

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "nowy tekst" } });

      expect(baseProps.onChange).toHaveBeenCalledTimes(1);
      expect(baseProps.onChange).toHaveBeenCalledWith("nowy tekst");
    });

    it("truncates value passed to onChange according to characterLimit", () => {
      render(
        <Textarea
          {...baseProps}
          characterLimit={5}
        />,
      );

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "123456789" } });

      expect(baseProps.onChange).toHaveBeenCalledTimes(1);
      expect(baseProps.onChange).toHaveBeenCalledWith("12345");
    });

    it("does not call onChange when isDisabled is true", () => {
      render(
        <Textarea
          {...baseProps}
          isDisabled
        />,
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();

      fireEvent.change(textarea, { target: { value: "próba zmiany" } });
      expect(baseProps.onChange).not.toHaveBeenCalled();
    });
  });
});

