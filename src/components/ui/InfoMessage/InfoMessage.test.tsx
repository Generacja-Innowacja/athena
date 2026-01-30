import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { InfoMessage } from "./InfoMessage";

vi.mock("../../../assets/icons/check-icon.svg", () => ({
  default: () => <svg data-testid="icon-check" />,
}));
vi.mock("../../../assets/icons/info-icon.svg", () => ({
  default: () => <svg data-testid="icon-info" />,
}));
vi.mock("../../../assets/icons/warning-icon.svg", () => ({
  default: () => <svg data-testid="icon-warning" />,
}));
vi.mock("../../../assets/icons/x-icon.svg", () => ({
  default: () => <svg data-testid="icon-x" />,
}));

describe("<InfoMessage />", () => {
  const getContainer = (text: string) =>
    screen.getByText(text).closest('[data-slot="info-message"]');

  describe("when all provided props are valid", () => {
    it("should render with default props", () => {
      render(<InfoMessage>Message content</InfoMessage>);

      const container = getContainer("Message content");

      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("data-slot", "info-message");
      expect(container).toHaveClass("text-gi-dark-gray");
    });

    it("should render with custom className", () => {
      render(
        <InfoMessage className="custom-class">Message content</InfoMessage>,
      );
      const container = getContainer("Message content");
      expect(container).toHaveClass("custom-class");
    });
  });

  describe("when variant is provided as a prop", () => {
    it("should render default variant", () => {
      render(<InfoMessage variant="default">Default</InfoMessage>);
      const container = getContainer("Default");
      expect(container).toHaveClass("text-gi-dark-gray");
    });

    it("should render info variant", () => {
      render(<InfoMessage variant="info">Info</InfoMessage>);
      const container = getContainer("Info");
      expect(container).toHaveClass("text-gi-blue");
    });

    it("should render error variant", () => {
      render(<InfoMessage variant="error">Error</InfoMessage>);
      const container = getContainer("Error");
      expect(container).toHaveClass("text-gi-red");
    });

    it("should render warning variant", () => {
      render(<InfoMessage variant="warning">Warning</InfoMessage>);
      const container = getContainer("Warning");
      expect(container).toHaveClass("text-gi-orange");
    });

    it("should render success variant", () => {
      render(<InfoMessage variant="success">Success</InfoMessage>);
      const container = getContainer("Success");
      expect(container).toHaveClass("text-gi-green");
    });
  });
});
