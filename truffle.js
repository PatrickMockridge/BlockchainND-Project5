// Allows us to use ES6 in our migrations and tests.
require('babel-register')

// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider('switch current current usual mutual close awesome broccoli salon coast clutch knee', 'https://rinkeby.infura.io/v3/0c9165c8582f4f3abed7c07313d8ba7e')
      },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: './node_modules/solc', // Version is managed in package.json as an NPM dependency.
			optimizer: {
				enabled: true,
			},
    }
  }
}
