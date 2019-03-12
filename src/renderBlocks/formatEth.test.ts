import formatEth from './formatEth';

test.each`
  input       | output
  ${1}        | ${"0.000"}
  ${1e15}     | ${"0.001"}
  ${1e18}     | ${"1"}
  ${2.187e17} | ${"0.219"}
`("when given $input, returns $output", ({ input, output }) => {
  expect(formatEth(input)).toEqual(output)
});
