import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Counter from "./Counter";

describe("<Counter />", () => {
  describe("when the component is first rendered", () => {
    it("shows `count is 0`", () => {
      render(<Counter />);
      expect(
        screen.getByRole("button", { name: /count is 0/i }),
      ).toBeInTheDocument();
    });
  });

  describe("when the button is clicked once", () => {
    it("updates the label to `count is 1`", () => {
      render(<Counter />);
      const button = screen.getByRole("button", { name: /count is 0/i });
      fireEvent.click(button);
      expect(
        screen.getByRole("button", { name: /count is 1/i }),
      ).toBeInTheDocument();
    });
  });

  describe("when the button is clicked multiple times", () => {
    it("increments the count by 1 on each click", () => {
      render(<Counter />);
      const button = screen.getByRole("button", { name: /count is 0/i });

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(
        screen.getByRole("button", { name: /count is 3/i }),
      ).toBeInTheDocument();
    });
  });
});
