import blockies from "blockies-identicon"
import exampleData from "./exampleData"
import render from "./renderBlocks"
import renderIdenticons from "./renderIdenticons"

(() => {
  const example = document.getElementById("example");
  if (!example) return

  example.innerHTML = render(exampleData)
  renderIdenticons()
})();
