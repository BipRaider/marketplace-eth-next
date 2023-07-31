require('dotenv').config();
const { MNEMONIC, INFURA_PROJECT_ID } = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // Setting where to save contracts
  contracts_build_directory: './public/contracts',
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
      // ropsten: {
      //   provider: () =>
      //     new HDWalletProvider({
      //       mnemonic: {
      //         phrase: MNEMONIC,
      //       },
      //       providerOrUrl: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      //       addressIndex: 0,
      //     }),
      //   network_id: 3,
      //   gas: 5500000, // Gas Limit, How much gas we are willing to spent
      //   gasPrice: 20000000000, // how much we are willing to spent for unit of gas
      //   confirmations: 2, // number of blocks to wait between deployment
      //   timeoutBlocks: 200, // number of blocks before deployment times out
      // },
    },
    // Useful for deploying to a public network.
    // Note: It's important to wrap the provider as a function to ensure truffle uses a new provider every time.
    // goerli: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
    //   network_id: 5,       // Goerli's id
    //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    //
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.19',
    },
  },
};
