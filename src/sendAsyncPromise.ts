// util to wrap `window.ethereum.sendAsync` in a Promise
// TODO: find typedefs for Ethereum RPC return values
export default function sendAsyncPromise(method: string, params: any[]): Promise<{result: any}> {
  return new Promise((resolve, reject) => {
    window.ethereum.sendAsync({ method, params }, (error, response) => {
      if (error) reject(error)
      else resolve(response)
    })
  })
}
