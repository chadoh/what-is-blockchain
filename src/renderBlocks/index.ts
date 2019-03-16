import { openBlock, closeBlock, animationLength } from "./animations"
import formatEth from "./formatEth"

document.addEventListener("click", e => {
  const target = e.target as HTMLElement
  if (target.dataset.behavior === "open-block") {
    e.preventDefault()
    openBlock(target.closest(".block") as HTMLElement)
  }
  if (target.getAttribute("href") === "#close-block") {
    e.preventDefault()
    closeBlock(target.closest(".block") as HTMLElement)
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
      <div aria-hidden="true">
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
      </div>
      <div class="block-back">
        <div class="inner" data-behavior="inner-height">
          <header>
            <div>
              <h2 class="blockNumber">${blockNumber}</h2>
              <div class="dateMined">${dateMined}</div>
            </div>
            <a href="#close-block">&times;</a>
          </header>

          <div>${block.transactions.length} transaction${block.transactions.length > 1 ? 's' : ''}</div>
          <ul class="transactions">
            ${block.transactions.map((transaction, i) => {
              const amount = formatEth(parseInt(transaction.value, 16))

              return `
                <li class="transaction">
                  <div class="sender" data-behavior="identicon" title="${transaction.from}"></div>
                  <div class="sent">sent</div>
                  <div class="amount">${amount}</div>
                  <div class="to">to</div>
                  <div class="receiver" data-behavior="identicon" title="${transaction.to}"></div>
                </li>
              `
            }).join("")}
          </ul>
        </div>
      </div>
    </div>
  `
}).join("")
