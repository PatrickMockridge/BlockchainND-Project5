//import 'babel-polyfill';
const StarNotary = artifacts.require('./StarNotary.sol')

let instance;
let accounts;

contract('StarNotary', async (accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
  });

  it('can Create a Star', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
  });

  it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let amount = 0.01
    let starPriceWei = web3.utils.toWei(amount.toString(), "ether")
    let starPrice = web3.utils.toBN(starPriceWei)
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
  });

  it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    let amount = 0.01
    let starPriceWei = web3.utils.toWei(amount.toString(), "ether")
    let starPrice = web3.utils.toBN(starPriceWei)
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1).toNumber()
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1).toNumber()
    assert.equal(BigInt(balanceOfUser1BeforeTransaction.add(starPrice)), BigInt(balanceOfUser1AfterTransaction.toNumber()));
  });

  it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let amount = 0.01
    let starPriceWei = web3.utils.toWei(amount.toString(), "ether")
    let starPrice = web3.utils.toBN(starPriceWei)
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2).toNumber()
    await instance.buyStar(starId, {from: user2, value: starPrice});
    assert.equal(await instance.ownerOf.call(starId), user2);
  });

  it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let amount = 0.01
    let starPriceWei = web3.utils.toWei(amount.toString(), "ether")
    let starPrice = web3.utils.toBN(starPriceWei)
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2).toNumber()
    const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2).toNumber()
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = web3.eth.getBalance(user2).toNumber()
    assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
  });

  // Write Tests for:

  // 1) The token name and token symbol are added properly.
  it('The token name and token symbol are added properly', async() => {
    assert.equal(await instance.name.call(), 'The Patrick Mockridge Blazing Amazing Supersaiyan Star Token');
    assert.equal(await instance.symbol.call(), 'PMBASST');
  });

  // 2) 2 users can exchange their stars.
  it('lets 2 users can exchange their stars', async() => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId1 = 6;
    let starId2 = 7;
    await instance.createStar('awesome star 1', starId1, {from: user1});
    await instance.createStar('awesome star 2', starId2, {from: user2});
    await instance.exchangeStars(user2, starId1, {from: user1});
    await instance.exchangeStars(user1, starId2, {from: user2});
    assert.equal(await instance.ownerOf.call(starId1), user2);
    assert.equal(await instance.ownerOf.call(starId2), user1);
  });

  // 3) Stars Tokens can be transferred from one address to another.
  it('Stars Tokens can be transferred from one address to another.', async() => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 8;
    await instance.createStar('awesome star 1', starId, {from: user1});
    await instance.transferStar(user2, starId, {from: user1});
    assert.equal(await instance.ownerOf.call(starId), user2);
  });
