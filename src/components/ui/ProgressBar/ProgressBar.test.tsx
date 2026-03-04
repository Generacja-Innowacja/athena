import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("<ProgressBar />", () => {
  describe("when all provided props are valid", () => {
    it("should render with default props", () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute("data-slot", "progress-bar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "50");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    });

    it("should render with custom className", () => {
      render(<ProgressBar value={30} className="custom-class" />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass("custom-class");
    });

    it("should render with dataTestId", () => {
      render(<ProgressBar value={75} dataTestId="test-progress" />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("data-test-id", "test-progress");
    });
  });

  describe("when value is provided as a prop", () => {
    it("should clamp values below 0 to 0", () => {
      render(<ProgressBar value={-10} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveStyle({ width: "0%" });
    });

    it("should clamp values above 100 to 100", () => {
      render(<ProgressBar value={150} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveStyle({ width: "100%" });
    });

    it("should render exact value when between 0 and 100", () => {
      render(<ProgressBar value={42} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "42");

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveStyle({ width: "42%" });
    });

    it("should render 0% when value is exactly 0", () => {
      render(<ProgressBar value={0} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "0");

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveStyle({ width: "0%" });
    });

    it("should render 100% when value is exactly 100", () => {
      render(<ProgressBar value={100} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "100");

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveStyle({ width: "100%" });
    });
  });

  describe("when size is provided as a prop", () => {
    it("should render regular size by default", () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass("h-4");
    });

    it("should render small size", () => {
      render(<ProgressBar value={50} size="small" />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass("h-2");
    });

    it("should render regular size when specified", () => {
      render(<ProgressBar value={50} size="regular" />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveClass("h-4");
    });
  });

  describe("when variant is provided as a prop", () => {
    it("should render default variant by default", () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveClass("bg-primary");
    });

    it("should render info variant", () => {
      render(<ProgressBar value={50} variant="info" />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveClass("bg-gi-blue");
    });

    it("should render success variant", () => {
      render(<ProgressBar value={50} variant="success" />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveClass("bg-gi-green");
    });

    it("should render warning variant", () => {
      render(<ProgressBar value={50} variant="warning" />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveClass("bg-gi-orange");
    });

    it("should render error variant", () => {
      render(<ProgressBar value={50} variant="error" />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeInTheDocument();

      const fillElement = progressBar.firstChild as HTMLElement;
      expect(fillElement).toHaveClass("bg-gi-red");
    });
  });

  describe("accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<ProgressBar value={75} />);
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("role", "progressbar");
      expect(progressBar).toHaveAttribute("aria-valuenow", "75");
      expect(progressBar).toHaveAttribute("aria-valuemin", "0");
      expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    });
  });

  describe("when additional HTML attributes are provided", () => {
    it("should pass through other props to the root element", () => {
      render(
        <ProgressBar value={50} id="test-id" data-custom="custom-value" />,
      );
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveAttribute("id", "test-id");
      expect(progressBar).toHaveAttribute("data-custom", "custom-value");
    });
  });
});
