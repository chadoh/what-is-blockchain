import blockies from "blockies-identicon"
import { threeConsecutive, genesis } from "./exampleData"
import renderBlocks from "./renderBlocks"
import renderIdenticons from "./renderIdenticons"
import send from "./sendAsyncPromise"
import spacer from "./spacer"

document.addEventListener("click", async e => {
  const target = e.target as HTMLElement
  if (target.getAttribute("href") === "#fetch-latest") {
    const div = document.getElementById("recent-blocks")
    if (!div) return
    div.innerHTML = `<p>Fetching...</p>`

    e.preventDefault()
    await window.ethereum.enable()

    const block1 = (await send("eth_getBlockByNumber", ["latest", true])).result
    const mostRecentBlockNumber = parseInt(block1.number)
    const nextNineQueries = []
    for (let i = 1; i < 10; i++) {
      nextNineQueries.push(
        send("eth_getBlockByNumber", [
          "0x" + (mostRecentBlockNumber - i).toString(16),
          true,
        ])
      )
    }
    const nextNineBlocks = (await Promise.all(nextNineQueries)).map(
      r => r.result
    )
    div.innerHTML = renderBlocks([block1, ...nextNineBlocks])
    renderIdenticons()
  }
})

declare global {
  interface Window {
    ethereum: any; // No available typedefs for MetaMask?
  }
};

(() => {
  const example = document.getElementById("example");
  if (!example) return

  example.innerHTML = `
    ${spacer}
    ${renderBlocks(threeConsecutive)}
    ${spacer}
    ${renderBlocks([genesis])}
  `
  renderIdenticons()

  if (window.ethereum) {
    const div = document.getElementById("recent-blocks")
    div.innerHTML = `
      <p style="text-align: center">
        <a href="#fetch-latest">Fetch latest blocks</a>
      </p>
    `
  }
})();
