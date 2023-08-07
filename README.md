- This is a [Next.js](https://nextjs.org/) project bootstrapped with.
- [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- [infura](https://app.infura.io/dashboard)

## Getting Started

First, run the development server:

```bash
npm run dev
```

### Some commands for working with the console

- Running console for goerli network

```bash
npm run truffle-con-goerli
```

- Get all account from wallet

```bash
const acc = await web3.eth.getAccounts()
```

- Check balance

```bash
await web3.eth.getBalance(acc[0])
```

- Get contract

```bash
const inst = await CourseMarketplace.deployed()
```

- Get the ether from the contract into the owner wallet
- 1 eth === 1000000000000000000 gwai
- withdraw work with gwai

```bash
inst.withdraw("7500000000000000")
```

```bash

```
