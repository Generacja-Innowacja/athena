import { render, screen } from "@testing-library/react";
import { RadioGroup } from "./RadioGroup";
import { RadioGroupItem } from "./RadioGroupItem/RadioGroupItem";

describe("<RadioGroup />", () => {
  it("should render with default props", () => {
    render(<RadioGroup>Children</RadioGroup>);
    const group = screen.getByRole("radiogroup");
    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute("data-slot", "radio-group");
  });

  it("should render with custom className", () => {
    render(<RadioGroup className="custom-class">Children</RadioGroup>);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveClass("custom-class");
  });

  it("should render children correctly", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="1" />
        <RadioGroupItem value="2" />
      </RadioGroup>,
    );
    const radioItems = screen.getAllByRole("radio");
    expect(radioItems).toHaveLength(2);
  });
});
