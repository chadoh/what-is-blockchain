import exampleData from "./exampleData"

(() => {
  console.log(exampleData)

  const example = document.getElementById("example");
  if (!example) return

  example.innerHTML = JSON.stringify(exampleData);
})();
