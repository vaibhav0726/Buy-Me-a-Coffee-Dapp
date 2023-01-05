// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance`, await getBalance(address));
    counter += 1;
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timeStamp = memo.timeStamp;
    const from = memo.from;
    const name = memo.name;
    const message = memo.message;
    console.log(`At ${timeStamp}, ${name} , ${from} , ${message}`);
  }
}

async function main() {
  // everyone will get their address
  const [ownerAddress, user1Address, user2Address, user3Address] =
    await hre.ethers.getSigners();
  const coffee = await hre.ethers.getContractFactory("buyACoffee");
  // smart contract instance
  const contract = await coffee.deploy();

  // it will be deployed on the hardhat local blockchain
  await contract.deployed();
  console.log("Address of contract deployed", contract.address);
  console.log("Address of owner who deployed", ownerAddress.address);

  const addresses = [
    ownerAddress.address,
    user1Address.address,
    user2Address.address,
    user3Address.address,
  ];

  console.log("before buying coffee:- ");
  await printBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  // connecting the address from address1
  // calling smart contact function with connect function using different addresses
  await contract
    .connect(user1Address)
    .buyCoffee("from1", "nice application", amount);
  await contract.connect(user2Address).buyCoffee("from2", "nice tut", amount);
  await contract
    .connect(user3Address)
    .buyCoffee("from3", "awesome application video", amount);

  console.log("After buying coffee:- ");
  await printBalances(addresses);

  const memos = await contract.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
