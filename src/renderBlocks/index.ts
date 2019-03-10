import "./blocks.css"
import renderShape from "./renderShape"
import cloneNode from "./cloneNode"

const animationLength = 0.5

document.addEventListener("click", e => {
  const target = e.target as HTMLElement
  if (target.dataset.behavior === "open-block") {
    e.preventDefault()
    openBlock(target.closest(".block") as HTMLElement)
  }
})

const openBlock = (block: HTMLElement): void => {
  // 1. duplicate the element, add to bottom of DOM, fix position above old element
  const clone = block.cloneNode(true) as HTMLElement
  const rect = block.getBoundingClientRect()
  let styles = `
    position: fixed;
    top: calc(${rect.top + window.scrollY}px + 1em);
    left: calc(${rect.left}px - 1.1em);
    width: ${block.offsetWidth}px;
    height: ${block.offsetHeight}px;
    transform: rotateY(-30deg) scaleX(1.1) translateZ(1em);
    transition: all ${animationLength}s;
  `
  clone.style.cssText = clone.style.cssText + ";" + styles

  // save values for closing block later
  clone.dataset.top = clone.style.top
  clone.dataset.left = clone.style.left
  clone.dataset.width = clone.style.width
  clone.dataset.height = clone.style.height

  document.body.appendChild(clone)

  // 2. set visibility=hidden using class which can be removed when closing
  block.className = block.className + " opened"

  // 3. make full screen
  styles = `
    position: fixed;
    top: calc(${window.scrollY}px + 1em);
    left: 1em;
    width: calc(100% - 2em);
    height: calc(100vh - 3em);
    transform: perspective(40em) rotateY(-180deg);
  `
  clone.style.cssText = clone.style.cssText + ";" + styles

  // TODO: remove me!
  setTimeout(() => closeBlock(clone), 2000)
}

const closeBlock = function(clone: HTMLElement): void {
  // 1. set back to original dimensions
  let styles = `
    position: fixed;
    top: ${clone.dataset.top};
    left: ${clone.dataset.left};
    width: ${clone.dataset.width};
    height: ${clone.dataset.height};
    transform: rotateY(-30deg) scaleX(1.1) translateZ(1em);
  `
  clone.style.cssText = clone.style.cssText + ";" + styles

  // 2. wait for animation to complete
  setTimeout(() => {
    // 3. remove fixed styling
    styles = `
      position: static;
      top: auto;
      left: auto;
      width: auto;
      height: auto;
    `
    clone.style.cssText = clone.style.cssText + ";" + styles

    // 4. make original block visible again
    const block = document.querySelector(".block.opened")
    block.className = block.className.replace(/ opened/, "")

    // 5. remove placeholder
    clone.remove()
  }, animationLength * 1000)
};

export default blocks => blocks.map(block => {
  const blockNumber = parseInt(block.number, 16)
  const dateMined = (new Date(parseInt(block.timestamp) * 1000)).toLocaleString()

  return renderShape({
    front: `
      <h2 class="blockNumber">${blockNumber}</h2>
      <div class="dateMined">${dateMined}</div>
      <div>
        ${block.transactions.length} transactions
        ${!block.transactions.length ? "" : `
          –
          <a
            href="#${block.number}"
            data-behavior="open-block"
          >
            View
          </a>
        `}
      </div>
    `,
    back: `
      <header>
        <span class="blockNumber">${blockNumber}</span>
        <span class="dateMined">${dateMined}</span>
      </header>
      <div class="transactions">
        ${block.transactions.map((transaction, i) => {
          const amount = parseInt(transaction.value, 16)

          return `
            <div class="transaction">
              <div class="from">${transaction.from}</div> sent
              <div class="amount">${amount}</div> to
              <div class="to">${transaction.to}</div>
            </div>
          `
        }).join("")}
      </div>
    `
  })
}).join("")
