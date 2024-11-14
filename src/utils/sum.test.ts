import { sum } from "./sum";

describe("sum", () => {
  it("sum a + b", () => {
    expect(sum(2, 7)).toEqual(9);
  });
});
