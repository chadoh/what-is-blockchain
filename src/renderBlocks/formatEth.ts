export default function formatEth(amountInWei: number): string {
  const options = {
    style: "decimal",
    minimumFractionDigits: 3
  }

  // if its a whole, eth amount, leave off the .000
  if (amountInWei % 1e18 === 0) options.minimumFractionDigits = 0
  const formatter = new Intl.NumberFormat("en-US", options)
  return formatter.format(amountInWei / 1e18)
}
