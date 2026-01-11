import { fireEvent, render, screen } from "@testing-library/react";
import { Switch } from "./Switch";

describe("<Switch />", () => {
  describe("when all provided props are valid", () => {
    it("should render with default props", () => {
      render(<Switch aria-label="Toggle switch" />);
      const switchElement = screen.getByRole("switch", {
        name: "Toggle switch",
      });
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveAttribute("data-slot", "switch");
    });

    it("should render with custom className", () => {
      render(<Switch className="custom-class" aria-label="Custom switch" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveClass("custom-class");
    });

    it("should render unchecked by default", () => {
      render(<Switch aria-label="Unchecked switch" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("data-state", "unchecked");
    });
  });

  describe("when checked state is controlled", () => {
    it("should render checked when checked prop is true", () => {
      render(<Switch checked={true} aria-label="Checked switch" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("data-state", "checked");
    });

    it("should render unchecked when checked prop is false", () => {
      render(<Switch checked={false} aria-label="Unchecked switch" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("data-state", "unchecked");
    });
  });

  describe("when is clicked", () => {
    it("should call onCheckedChange handler when clicked", () => {
      const handleChange = vi.fn();
      render(
        <Switch onCheckedChange={handleChange} aria-label="Toggle switch" />,
      );
      const switchElement = screen.getByRole("switch");
      fireEvent.click(switchElement);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("should toggle state when clicked in uncontrolled mode", () => {
      render(<Switch aria-label="Toggle switch" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("data-state", "unchecked");
      fireEvent.click(switchElement);
      expect(switchElement).toHaveAttribute("data-state", "checked");
    });
  });

  describe("when is disabled", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Switch disabled aria-label="Disabled switch" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeDisabled();
    });

    it("should not call onCheckedChange when disabled", () => {
      const handleChange = vi.fn();
      render(
        <Switch
          onCheckedChange={handleChange}
          disabled
          aria-label="Disabled switch"
        />,
      );
      const switchElement = screen.getByRole("switch");
      fireEvent.click(switchElement);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("when defaultChecked is provided", () => {
    it("should render checked by default when defaultChecked is true", () => {
      render(<Switch defaultChecked={true} aria-label="Default checked" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("data-state", "checked");
    });

    it("should render unchecked by default when defaultChecked is false", () => {
      render(<Switch defaultChecked={false} aria-label="Default unchecked" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("data-state", "unchecked");
    });
  });

  describe("when required is provided", () => {
    it("should have required attribute when required prop is true", () => {
      render(<Switch required aria-label="Required switch" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-required", "true");
    });
  });
});
