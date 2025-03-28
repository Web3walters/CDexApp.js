// Initialize Web3
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Contract addresses and ABIs
const DEX_ADDRESS = '0xYourDexContractAddress';
const TOKEN_A_ADDRESS = '0xYourTokenAContractAddress';
const TOKEN_B_ADDRESS = '0xYourTokenBContractAddress';
const ERC20_ABI = [ /* Your ERC20 ABI here */ ];
const DEX_ABI = [ /* Your DEX contract ABI here */ ];

// Contract instances
const dexContract = new web3.eth.Contract(DEX_ABI, DEX_ADDRESS);
const tokenAContract = new web3.eth.Contract(ERC20_ABI, TOKEN_A_ADDRESS);
const tokenBContract = new web3.eth.Contract(ERC20_ABI, TOKEN_B_ADDRESS);

// Function to fetch token balances
async function getTokenBalances(account) {
    const balanceA = await tokenAContract.methods.balanceOf(account).call();
    const balanceB = await tokenBContract.methods.balanceOf(account).call();
    return {
        tokenA: web3.utils.fromWei(balanceA),
        tokenB: web3.utils.fromWei(balanceB)
    };
}

// Function to perform a token swap
async function swapTokens(fromToken, toToken, amount, account) {
    const amountInWei = web3.utils.toWei(amount.toString());
    await fromToken.methods.approve(DEX_ADDRESS, amountInWei).send({ from: account });
    await dexContract.methods.swap(fromToken.options.address, toToken.options.address, amountInWei).send({ from: account });
}

// Event listeners
document.getElementById('getBalances').addEventListener('click', async () => {
    const account = document.getElementById('account').value;
    const balances = await getTokenBalances(account);
    document.getElementById('balances').innerText = `Token A: ${balances.tokenA}, Token B: ${balances.tokenB}`;
});

document.getElementById('swapTokens').addEventListener('click', async () => {
    const account = document.getElementById('account').value;
    const amount = document.getElementById('amount').value;
    await swapTokens(tokenAContract, tokenBContract, amount, account);
    alert('Swap completed.');
});

