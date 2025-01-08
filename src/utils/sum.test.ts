import { /* describe, */ expect, test } from "@jest/globals";
import { sum } from "./sum";

test("хочу сложить 2 + 2", () => {
  expect(sum(2, 2)).toBe(4);
});
