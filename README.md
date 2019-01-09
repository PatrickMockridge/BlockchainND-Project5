# Ethereum-based Decentralized Token Notary Service App

The aim of this project is to buil __end-to-end Ethereum-based blockchain notary solution__ for an __ERC721 non-fungible token__ (i.e. a token whose instances have unique values, e.g. representing unique collectible assets).

The solution is a __decentralised application__, the components of which are:

- __A Smart contract deployed in Ethereum's Rinkeby test network:__ smart contract written in Solidity that implements key token transactional and registry methods, building on the ERC721 token standard. It is part of the Ethereum blockchain and can be executed by any of the Ethereum nodes participating in the Rinkeby network.

- __A JavaScript web application:__ which provides a convenient way through a front-end application to create a new token, query existing tokens and tranfer tokens to Ethereum Rinkeby test network addresses.

---
## __Prerequisites and installing__ _(examples for MacOS, but most of it should work on Windows as well)_

To install the software, you need to do the following:

**1.** Install Yarn on your computer - visit https://yarnpkg.com and choose installer for your system

**2.** Clone the project
```bash
git clone https://github.com/PatrickMockridge/BlockchainND-Project5
```
**3.** Install Docker to use the Docker Solidity compiler, which was found to be the most performant solution, visit https://docs.docker.com/install/ to get the correct instructions for your system

**4.** Pull the 0.4.24 Solidity compiler Docker image

```bash
docker pull ethereum/solc:0.4.24
```

**5.** Install and save dependencies to project folder:

```bash
yarn global add truffle      # install truffle globally
yarn add openzeppelin-solidity@2.0.0    # this is needed for ERC721 contracts
yarn add truffle-hdwallet-provider # wallet provider for deployment to Ethereum network
```
_You might run into trouble installing truffle globally. Alternatively to the above solution, you could use_

 ```bash
 sudo npm install -g truffle
 ```

__6.__ Install Ethereum wallet provider Metamask [(see instructions here)](https://metamask.io) plugin for your browser (Google Chrome or Brave)

__7.__ Create new account with Metamask (Metamask will take you through the process)

## Running and testing the smart contract and the web app

**1.** Once you have Truffle installed, you can start the Truffle develop console - this will initialize a local Ethereum blockchain at (http://127.0.0.1:9545) with 10 accounts, each with a balance of 100 ether and open the Truffle develop console for you.

```bash
truffle develop
```

**2.** Run test script against smart contract - this will show you what unit tests have been defined and whether they all pass on the contract:
```bash
test
```

**3.** Compile and migrate contracts to the local test network:
```bash
compile
migrate --reset --network develop # this will automatically target the development network as I already fixed its parameters in the config file truffle.js
```
__4.__ Set up Metamask to connect to local development network:
- Set the Custom RPC to http://127.0.0.1:9545 under Custom RPC settings
- please disable Privacy Mode under Settings.
- add one or multiple local development network accounts to Metamask from the details in the terminal window that truffle provides

**5.** Start web app on development network - open new bash Terminal window:
```bash
npm run dev
```
Launches the front end Web3 application on http://localhost:8080. Navigate to this page in a browser with the Metamask plugin installed.


## Built With

* [Yarn Pakage Manager](https://yarnpkg.com) - Yarn is an improved Node Package Manager for developing ES6 web applications
* [Truffle Framework](https://truffleframework.com) - Truffle is a system for writing, building, compiling and deploying smart contracts and building Web3 front end applications.
* [Web3.js](https://github.com/ethereum/web3.js/) - Web3 is the Ethereum JavaScript API; used as part of Truffle workflow to enable querying of accounts in network
* [Infura](https://infura.io) - Infura is an intermediary service used to delpoy and interact with contracts on the Ethereum blockchain
* [Metamask](https://metamask.io) - Metamask is an Ethereum wallet plugin
