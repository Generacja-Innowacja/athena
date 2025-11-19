import { addTwoNumbers } from "./addTwoNumbers";

describe("addTwoNumbers", () => {
  describe("when both numbers are provided", () => {
    it("should return the correct sum", () => {
      const result = addTwoNumbers(3, 5);
      expect(result).toBe(8);
    });
  });
});
