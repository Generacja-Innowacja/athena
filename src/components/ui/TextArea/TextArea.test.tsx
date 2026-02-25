import { fireEvent, render, screen } from "@testing-library/react";
import { TextArea } from "./TextArea";

describe("<TextArea />", () => {
  const baseProps = {
    placeholder: "Type here...",
    onChange: vi.fn(),
  };

  beforeEach(() => {
    baseProps.onChange = vi.fn();
  });

  describe("rendering", () => {
    it("renders with default props and empty value", () => {
      render(<TextArea {...baseProps} />);

      const textarea = screen.getByRole("textbox", { name: "" });
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("data-slot", "textarea");
      expect(textarea).toHaveAttribute("placeholder", baseProps.placeholder);
      expect(textarea).toHaveValue("");
    });

    it("passes dataTestId to textarea as data-test-id", () => {
      render(<TextArea {...baseProps} dataTestId="my-textarea" />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("data-test-id", "my-textarea");
    });

    it("renders label and required asterisk when isRequired is true", () => {
      render(<TextArea {...baseProps} label="Opis" isRequired />);

      const label = screen.getByText("Opis", { selector: "p" });
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("*");
    });

    it("applies disabled label style when variant is disabled", () => {
      render(<TextArea {...baseProps} label="Opis" variant="disabled" />);

      const label = screen.getByText("Opis", { selector: "p" });
      expect(label).toHaveClass("text-gi-primary/50");
    });

    it("applies error label style when variant is error", () => {
      render(<TextArea {...baseProps} label="Opis" variant="error" />);

      const label = screen.getByText("Opis", { selector: "p" });
      expect(label).toHaveClass("text-gi-primary");
    });
  });

  describe("character limit", () => {
    it("does not apply character limit or show counter when characterLimit is not provided", () => {
      render(<TextArea {...baseProps} value="abc" />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).not.toHaveAttribute("maxLength");

      const counter = screen.queryByText("3/500");
      expect(counter).not.toBeInTheDocument();
    });

    it("shows character counter and maxLength when characterLimit is provided and characterLimitVisibility is true", () => {
      render(
        <TextArea
          {...baseProps}
          value="abc"
          characterLimit={10}
          characterLimitVisibility
        />,
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("maxLength", "10");

      const counter = screen.getByText("3/10");
      expect(counter).toBeInTheDocument();
    });

    it("does not show character counter when characterLimitVisibility is false, but still applies maxLength", () => {
      render(
        <TextArea
          {...baseProps}
          value="abc"
          characterLimit={10}
          characterLimitVisibility={false}
        />,
      );

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("maxLength", "10");

      const counter = screen.queryByText("3/10");
      expect(counter).not.toBeInTheDocument();
    });

    it("truncates initial value to the provided characterLimit and updates counter when visible", () => {
      const longValue = "a".repeat(20);
      render(
        <TextArea
          {...baseProps}
          value={longValue}
          characterLimit={10}
          characterLimitVisibility
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
      render(<TextArea {...baseProps} helper="Pomocniczy tekst" />);

      const footer = screen.getByText("Pomocniczy tekst");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("text-gi-primary/50");
    });

    it("shows error text and error styling when isError is true and errorText is provided", () => {
      render(<TextArea {...baseProps} isError errorText="Błąd pola" />);

      const footer = screen.getByText("Błąd pola");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("text-gi-red");

      const textarea = screen.getByRole("textbox");
      expect(textarea.className).toContain("border-gi-red");
    });
  });

  describe("onChange behavior", () => {
    it("calls onChange with new value when not disabled", () => {
      render(<TextArea {...baseProps} />);

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "nowy tekst" } });

      expect(baseProps.onChange).toHaveBeenCalledTimes(1);
      expect(baseProps.onChange).toHaveBeenCalledWith("nowy tekst");
    });

    it("truncates value passed to onChange according to characterLimit", () => {
      render(<TextArea {...baseProps} characterLimit={5} />);

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "123456789" } });

      expect(baseProps.onChange).toHaveBeenCalledTimes(1);
      expect(baseProps.onChange).toHaveBeenCalledWith("12345");
    });

    it("does not call onChange when isDisabled is true", () => {
      render(<TextArea {...baseProps} disabled />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();

      fireEvent.change(textarea, { target: { value: "próba zmiany" } });
      expect(baseProps.onChange).not.toHaveBeenCalled();
    });
  });
});
