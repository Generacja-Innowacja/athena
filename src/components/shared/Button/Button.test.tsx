import { render } from "@testing-library/react";
import Button from "./Button";
import { BUTTON_TEST_ID } from "./Button.constants";

describe("Button", () => {
  describe("when all props are provided", () => {
    it("should render", () => {
      const { getByTestId } = render(
        <Button onClick={() => {}}>Click me</Button>,
      );
      const button = getByTestId(BUTTON_TEST_ID);
      expect(button).toBeInTheDocument();
    });
  });

  describe("when button is clicked", () => {
    it("should call onClick handler", () => {
      const handleClick = vi.fn();
      const { getByTestId } = render(
        <Button onClick={handleClick}>Click me</Button>,
      );
      const button = getByTestId(BUTTON_TEST_ID);
      button.click();
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
