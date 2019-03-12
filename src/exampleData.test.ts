import { threeConsecutive, genesis } from './exampleData';

describe("threeConsecutive", () => {
  test("should be an Array", () => {
    expect(Array.isArray(threeConsecutive)).toBe(true)
  })

  test("should have three items", () => {
    expect(threeConsecutive.length).toBe(3)
  });
});

describe("genesis", () => {
  test("should be an object", () => {
    expect(Object.prototype.toString.call(genesis)).toBe("[object Object]")
  })

  test("should have block number 0", () => {
    expect(genesis.number).toBe("0x0")
  })
})
