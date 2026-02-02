import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("<Checkbox />", () => {
  it("should render with default props", () => {
    render(<Checkbox label="Label" />);
    const item = screen.getByRole("checkbox");
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute("data-slot", "checkbox");
  });

  it("should render with custom className", () => {
    render(<Checkbox className="custom-class" label="Label" />);
    const item = screen.getByRole("checkbox");
    expect(item).toHaveClass("custom-class");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Checkbox disabled label="Label" />);
    const item = screen.getByRole("checkbox");
    expect(item).toBeDisabled();
  });

  it("should render with label", () => {
    render(<Checkbox label="Keep me logged in" />);
    expect(screen.getByText("Keep me logged in")).toBeInTheDocument();
  });

  it("should render with secondary label", () => {
    render(
      <Checkbox
        label="Keep me logged in"
        secondaryLabel="Save your credentials for next time"
      />,
    );
    expect(screen.getByText("Keep me logged in")).toBeInTheDocument();
    expect(
      screen.getByText("Save your credentials for next time"),
    ).toBeInTheDocument();
  });

  it("should be accessible via its label", () => {
    render(<Checkbox label="Accept Terms" />);
    expect(screen.getByLabelText("Accept Terms")).toBeInTheDocument();
  });

  describe("when user interacts", () => {
    it("should become checked when clicked", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Label" />);
      const item = screen.getByRole("checkbox");

      expect(item).not.toBeChecked();

      await user.click(item);

      expect(item).toBeChecked();
    });

    it("should toggle checked state when label is clicked", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click Me" />);
      const label = screen.getByText("Click Me");
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();

      await user.click(label);
      expect(checkbox).toBeChecked();

      await user.click(label);
      expect(checkbox).not.toBeChecked();
    });

    it("should not become checked when disabled item is clicked", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Checkbox
            value="item-1"
            aria-label="Item 1"
            label="Accept terms and conditions"
          />
          <Checkbox
            value="item-2"
            aria-label="Item 2"
            disabled
            label="Accept terms and conditions"
          />
        </div>,
      );
      const item1 = screen.getByRole("checkbox", { name: "Item 1" });
      const item2 = screen.getByRole("checkbox", { name: "Item 2" });

      expect(item1).not.toBeChecked();
      expect(item2).not.toBeChecked();

      await user.click(item1);
      await user.click(item2);

      expect(item1).toBeChecked();
      expect(item2).not.toBeChecked();
    });
  });
});
