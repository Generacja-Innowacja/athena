import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Star } from "lucide-react";
import { vi } from "vitest";

import { Badge } from "./Badge";

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

const getBadgeContainer = (text: string) => {
  const container = screen.getByText(text).closest('[data-slot="badge"]');
  if (!container) {
    throw new Error(
      `Could not find element with [data-slot="badge"] for text "${text}".`,
    );
  }
  return container as HTMLElement;
};

describe("<Badge />", () => {
  describe("when all provided props are valid", () => {
    it("should render with default props", () => {
      render(<Badge>Badge content</Badge>);

      const container = getBadgeContainer("Badge content");

      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute("data-slot", "badge");
      expect(container).toHaveClass("text-gi-dark-gray");
      expect(container).toHaveClass("bg-gi-dark-gray/10");

      const icon = within(container).getByTestId("icon-info");
      expect(icon).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      render(<Badge className="custom-class">Badge</Badge>);
      const container = getBadgeContainer("Badge");
      expect(container).toHaveClass("custom-class");
    });

    it("should render with dataTestId", () => {
      render(<Badge dataTestId="badge-test">Badge</Badge>);
      const container = getBadgeContainer("Badge");
      expect(container).toHaveAttribute("data-test-id", "badge-test");
    });
  });

  describe("when type is provided as a prop", () => {
    it("should render default type", () => {
      render(<Badge type="default">Default</Badge>);
      const container = getBadgeContainer("Default");
      expect(container).toHaveClass("text-gi-dark-gray");
      expect(within(container).getByTestId("icon-info")).toBeInTheDocument();
    });

    it("should render info type", () => {
      render(<Badge type="info">Info</Badge>);
      const container = getBadgeContainer("Info");
      expect(container).toHaveClass("text-gi-blue");
      expect(within(container).getByTestId("icon-info")).toBeInTheDocument();
    });

    it("should render success type", () => {
      render(<Badge type="success">Success</Badge>);
      const container = getBadgeContainer("Success");
      expect(container).toHaveClass("text-gi-green");
      expect(within(container).getByTestId("icon-check")).toBeInTheDocument();
    });

    it("should render warning type", () => {
      render(<Badge type="warning">Warning</Badge>);
      const container = getBadgeContainer("Warning");
      expect(container).toHaveClass("text-gi-orange");
      expect(within(container).getByTestId("icon-warning")).toBeInTheDocument();
    });

    it("should render error type", () => {
      render(<Badge type="error">Error</Badge>);
      const container = getBadgeContainer("Error");
      expect(container).toHaveClass("text-gi-red");
      expect(within(container).getByTestId("icon-x")).toBeInTheDocument();
    });
  });

  describe("when variant is provided as a prop", () => {
    it("should render primary variant", () => {
      render(
        <Badge type="info" variant="primary">
          Primary
        </Badge>,
      );
      const container = getBadgeContainer("Primary");
      expect(container).toBeInTheDocument();
    });

    it("should render secondary variant (default)", () => {
      render(
        <Badge type="info" variant="secondary">
          Secondary
        </Badge>,
      );
      const container = getBadgeContainer("Secondary");
      expect(container).toHaveClass("bg-gi-blue/10");
    });

    it("should render outlined variant", () => {
      render(
        <Badge type="info" variant="outlined">
          Outlined
        </Badge>,
      );
      const container = getBadgeContainer("Outlined");
      expect(container).toHaveClass("bg-transparent");
    });

    it("should render ghost variant", () => {
      render(
        <Badge type="info" variant="ghost">
          Ghost
        </Badge>,
      );
      const container = getBadgeContainer("Ghost");
      expect(container).toHaveClass("bg-transparent");
      expect(container).toHaveClass("border-transparent");
    });
  });

  describe("when size is provided as a prop", () => {
    it("should render regular size", () => {
      render(
        <Badge type="info" size="regular">
          Regular
        </Badge>,
      );
      const container = getBadgeContainer("Regular");
      expect(container).toHaveClass("h-7");
      expect(container).toHaveClass("text-xs");
    });

    it("should render small size", () => {
      render(
        <Badge type="info" size="small">
          Small
        </Badge>,
      );
      const container = getBadgeContainer("Small");
      expect(container).toHaveClass("h-5");
      expect(container).toHaveClass("text-[10px]");
    });

    it("should render big size", () => {
      render(
        <Badge type="info" size="big">
          Big
        </Badge>,
      );
      const container = getBadgeContainer("Big");
      expect(container).toHaveClass("h-8");
      expect(container).toHaveClass("text-sm");
    });
  });

  describe("when LeftIcon is provided", () => {
    it("should render LeftIcon and replace default icon", () => {
      render(
        <Badge type="info" LeftIcon={<Star data-testid="custom-star" />}>
          Custom
        </Badge>,
      );
      const container = getBadgeContainer("Custom");
      expect(within(container).getByTestId("custom-star")).toBeInTheDocument();
      expect(
        within(container).queryByTestId("icon-info"),
      ).not.toBeInTheDocument();
    });
  });

  describe("when isDismissible is true", () => {
    it("should render dismiss button", () => {
      render(<Badge isDismissible>Dismissible</Badge>);
      const container = getBadgeContainer("Dismissible");
      const dismissButton = within(container).getByRole("button", {
        name: "Dismiss",
      });
      expect(dismissButton).toBeInTheDocument();
    });

    it("should call onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(
        <Badge isDismissible onDismiss={handleDismiss}>
          Dismissible
        </Badge>,
      );
      const dismissButton = screen.getByRole("button", { name: "Dismiss" });
      await user.click(dismissButton);
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("when isDismissible is false", () => {
    it("should not render dismiss button", () => {
      render(<Badge>Not dismissible</Badge>);
      expect(
        screen.queryByRole("button", { name: "Dismiss" }),
      ).not.toBeInTheDocument();
    });
  });
});
