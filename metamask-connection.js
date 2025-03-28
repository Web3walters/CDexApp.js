// Connect and get accounts
const accounts = await MMSDK.connect()

// Get provider for RPC requests
const provider = MMSDK.getProvider()

// Make an RPC request
const result = await provider.request({ 
  method: "eth_accounts",
  params: [] 
})

// Connect and sign in one step
const signResult = await MMSDK.connectAndSign({ 
  msg: "Sign in to Dapp" 
})

// Batch multiple RPC requests
const batchResults = await provider.request({
  method: "metamask_batch",
  params: [
    { method: "eth_accounts" },
    { method: "eth_chainId" }
  ]
})
