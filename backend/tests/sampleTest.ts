import { Calculator } from "../src/calculator"

describe('calculate', function () {
  it('add', function () {
    let result = Calculator.Sum(5, 2);
    expect(result).toBe(7);
  });
});