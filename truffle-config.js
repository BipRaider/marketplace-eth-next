require('dotenv').config();
const {
  MNEMONIC,
  INFURA_PROJECT_ID,
} = process.env;

const keys = require('./keys.json');

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // Setting where to save contracts
  contracts_build_directory: './public/contracts',
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
    // main: {
    //   provider: () => {
    //     return new HDWalletProvider({
    //       mnemonic: { phrase: MNEMONIC },
    //       providerOrUrl: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    //       addressIndex: 0,
    //     });
    //   },
    //   network_id: 1, // eslint-disable-line camelcase
    //   gas: 3000000,
    //   gasPrice: 10000000000,
    // },
    goerli: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic: { phrase: keys.MNEMONIC_GEORLI },
          providerOrUrl: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
          addressIndex: 0,
        });
      },
      network_id: '5',
      gas: 4465030, // Gas Limit, How much gas we are willing to spent
      gasPrice: 10000000000, // how much we are willing to spent for unit of gas
      confirmations: 2, // number of blocks to wait between deployment
      timeoutBlocks: 200, // number of blocks before deployment times out
      networkCheckoutTimeout: 10000,
    },
    // sepolia: {
    //   provider: () =>
    //     new HDWalletProvider({
    //       mnemonic: {
    //         phrase: MNEMONIC,
    //       },
    //       providerOrUrl: `wss://sepolia.infura.io/ws/v3/${keys.INFURA_PROJECT_ID}`,
    //       addressIndex: 0,
    //     }),
    //   network_id: '11155111',
    //   gasPrice: 2500000000,
    //   networkCheckoutTimeout: 10000,
    //   timeoutBlocks: 200,
    // },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.19',
    },
  },
};

// BASE FEE (determnd by ethereum) => 39.791392694

// Max Priority Fee Per Gas(tip) => 2

// GAS PRICE = BASE FEE + TIP => 41.791392694

// GAS USED 21000

// Transaction Fee = GAS USED * GAS PRICE =
//                   41.791392694 * 21000

// BURNT FEE => BASE FEE * GAS USED
//           39.791392694 * 21000

// REST TO MINER => TIP * GAS USED
//                   2  * 21000
