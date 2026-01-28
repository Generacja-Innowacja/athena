import { render, screen } from "@testing-library/react";
import { InfoMessage } from "./InfoMessage";

describe("<InfoMessage />", () => {
  describe("when all provided props are valid", () => {
    it("should render with default props", () => {
      render(<InfoMessage>Message content</InfoMessage>);
      const message = screen.getByText("Message content");
      expect(message).toBeInTheDocument();
      expect(message).toHaveAttribute("data-slot", "info-message");
    });

    it("should render with custom className", () => {
      render(
        <InfoMessage className="custom-class">Message content</InfoMessage>,
      );
      const message = screen.getByText("Message content");
      expect(message).toHaveClass("custom-class");
    });
  });

  describe("when variant is provided as a prop", () => {
    it("should render default variant", () => {
      render(<InfoMessage variant="default">Default</InfoMessage>);
      const message = screen.getByText("Default");
      expect(message).toBeInTheDocument();
    });

    it("should render info variant", () => {
      render(<InfoMessage variant="info">Info</InfoMessage>);
      const message = screen.getByText("Info");
      expect(message).toBeInTheDocument();
    });

    it("should render error variant", () => {
      render(<InfoMessage variant="error">Error</InfoMessage>);
      const message = screen.getByText("Error");
      expect(message).toBeInTheDocument();
    });

    it("should render warning variant", () => {
      render(<InfoMessage variant="warning">Warning</InfoMessage>);
      const message = screen.getByText("Warning");
      expect(message).toBeInTheDocument();
    });

    it("should render success variant", () => {
      render(<InfoMessage variant="success">Success</InfoMessage>);
      const message = screen.getByText("Success");
      expect(message).toBeInTheDocument();
    });
  });
});
