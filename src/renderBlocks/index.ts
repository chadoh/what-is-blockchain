import "./blocks.scss"
import { openBlock, closeBlock, animationLength } from "./animations"

document.addEventListener("click", e => {
  const target = e.target as HTMLElement
  if (target.dataset.behavior === "open-block") {
    e.preventDefault()
    openBlock(target.closest(".block") as HTMLElement)
  }
})

let closedAt = new Date().getTime()
document.addEventListener("keyup", e => {
  if (e.key !== "Escape") return

  const now = new Date().getTime()
  if (now < closedAt + animationLength) return

  const block = document.querySelector("#opened-block .block") as HTMLElement
  if (!block) return

  closeBlock(block)
  closedAt = now
})

export default blocks => blocks.map(block => {
  const blockNumber = parseInt(block.number, 16)
  const dateMined = (new Date(parseInt(block.timestamp) * 1000)).toLocaleString()

  return `
    <div class="block">
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
      <div class="block-back">
        <div class="inner" data-behavior="inner-height">
          <h2 class="blockNumber">${blockNumber}</h2>
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
        </div>
      </div>
    </div>
  `
}).join("")
