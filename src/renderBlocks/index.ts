import "./blocks.css"
import renderShape from "./renderShape"

export default blocks => blocks.map(block => {
  const blockNumber = parseInt(block.number, 16)
  const dateMined = (new Date(parseInt(block.timestamp) * 1000)).toLocaleString()

  return renderShape({
    front: `
      <h2 class="blockNumber">${blockNumber}</h2>
      <div class="dateMined">${dateMined}</div>
      <div>${block.transactions.length} transactions</div>
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
