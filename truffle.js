// Allows us to use ES6 in our migrations and tests.
require('babel-register')

// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider('C02DD421E9E8A4D7EAAB06FA214B772B411157393ECBC0E1ABDD06E821E6BC3E', 'https://rinkeby.infura.io/v3/0c9165c8582f4f3abed7c07313d8ba7e')
      },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: "0.4.24",
      docker: true,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}
