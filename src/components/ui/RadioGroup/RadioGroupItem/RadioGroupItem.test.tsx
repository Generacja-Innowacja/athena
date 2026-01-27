import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { RadioGroup } from "../RadioGroup";
import { RadioGroupItem } from "./RadioGroupItem";

describe("<RadioGroupItem />", () => {
  it("should render with default props", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="item-1" />
      </RadioGroup>,
    );
    const item = screen.getByRole("radio", { name: "" });
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute("value", "item-1");
    expect(item).toHaveAttribute("data-slot", "radio-group-item");
  });

  it("should render with custom className", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="item-1" className="custom-class" />
      </RadioGroup>,
    );
    const item = screen.getByRole("radio");
    expect(item).toHaveClass("custom-class");
  });

  it("should be disabled when disabled prop is true", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="item-1" disabled />
      </RadioGroup>,
    );
    const item = screen.getByRole("radio");
    expect(item).toBeDisabled();
  });

  describe("when user interacts", () => {
    it("should become checked when clicked", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup defaultValue="item-2">
          <RadioGroupItem value="item-1" aria-label="Item 1" />
          <RadioGroupItem value="item-2" aria-label="Item 2" />
        </RadioGroup>,
      );

      const item1 = screen.getByRole("radio", { name: "Item 1" });
      const item2 = screen.getByRole("radio", { name: "Item 2" });

      expect(item1).not.toBeChecked();
      expect(item2).toBeChecked();

      await user.click(item1);

      expect(item1).toBeChecked();
      expect(item2).not.toBeChecked();
    });

    it("should not change selection when disabled item is clicked", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup defaultValue="item-2">
          <RadioGroupItem value="item-1" disabled aria-label="Item 1" />
          <RadioGroupItem value="item-2" aria-label="Item 2" />
        </RadioGroup>,
      );

      const item1 = screen.getByRole("radio", { name: "Item 1" });
      const item2 = screen.getByRole("radio", { name: "Item 2" });

      await user.click(item1);

      expect(item1).not.toBeChecked();
      expect(item2).toBeChecked();
    });
  });
});
