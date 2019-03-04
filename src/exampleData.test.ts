import exampleData from './exampleData';

test('should be an Array', () => {
  expect(Array.isArray(exampleData)).toBe(true)
})

test('should have ten items', () => {
  expect(exampleData.length).toBe(10)
});
