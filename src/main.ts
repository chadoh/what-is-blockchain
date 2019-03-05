import exampleData from "./exampleData"
import render from "./renderBlocks"

(() => {
  const example = document.getElementById("example");
  if (!example) return

  example.innerHTML = render(exampleData)
})();
