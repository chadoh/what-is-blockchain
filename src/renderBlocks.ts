import "./blocks.css"

export default blocks => `<ol>${blocks.map(block => {
  const blockNumber = parseInt(block.number, 16)
  const dateMined = (new Date(parseInt(block.timestamp) * 1000)).toLocaleString()

  return `
    <li>
      <header>
        <span class="blockNumber">${blockNumber}</span>
        <span class="dateMined">${dateMined}</span>
      </header>
      <button class="transactionCount">${block.transactions.length} transactions</button>
    </li>
  `
}).join("")}</ol>`
