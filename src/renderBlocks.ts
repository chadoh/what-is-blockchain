import "./blocks.css"

export default blocks => `<ol>${blocks.map(block => {
  const blockNumber = parseInt(block.number, 16)
  const dateMined = (new Date(parseInt(block.timestamp) * 1000)).toLocaleString()

  return `
    <li class="block">
      <header>
        <span class="blockNumber">${blockNumber}</span>
        <span class="dateMined">${dateMined}</span>
      </header>
      <h2 class="blockNumber">${blockNumber}</h2>
      <div class="dateMined">${dateMined}</div>
      <div>${block.transactions.length} transactions</div>
      <div class="transactions">
        ${block.transactions.map((transaction, i) => {
          const amount = parseInt(transaction.value, 16)

          return `
            <div class="transaction" style="transform: translateZ(calc(.2em * ${i}))">
              <div class="from">${transaction.from}</div> sent
              <div class="amount">${amount}</div> to
              <div class="to">${transaction.to}</div>
            </div>
          `
        }).join("")}
      </div>
    </li>
  `
}).join("")}</ol>`
