import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("<Checkbox />", () => {
  it("should render with default props", () => {
    render(<Checkbox />);
    const item = screen.getByRole("checkbox");
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute("data-slot", "checkbox");
  });

  it("should render with custom className", () => {
    render(<Checkbox className="custom-class" />);
    const item = screen.getByRole("checkbox");
    expect(item).toHaveClass("custom-class");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Checkbox disabled />);
    const item = screen.getByRole("checkbox");
    expect(item).toBeDisabled();
  });

  describe("when user interacts", () => {
    it("should become checked when clicked", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Checkbox />
        </div>,
      );
      const item = screen.getByRole("checkbox");

      expect(item).not.toBeChecked();

      await user.click(item);

      expect(item).toBeChecked();
    });
    it("should not become checked when disabled item is clicked", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Checkbox value="item-1" aria-label="Item 1" />
          <Checkbox value="item-2" aria-label="Item 2" disabled />
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
