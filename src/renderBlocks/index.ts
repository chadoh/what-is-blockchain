import "./blocks.scss"
import { openBlock, closeBlock } from "./animations"

document.addEventListener("click", e => {
  const target = e.target as HTMLElement
  if (target.dataset.behavior === "open-block") {
    e.preventDefault()
    openBlock(target.closest(".block") as HTMLElement)
  }
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
      </div>
    </div>
  `
}).join("")
