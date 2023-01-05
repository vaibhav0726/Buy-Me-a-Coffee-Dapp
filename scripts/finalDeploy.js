const hre = require("hardhat");

async function main() {
  const coffee = await hre.ethers.getContractFactory("buyACoffee");
  const contract = await coffee.deploy();

  await contract.deployed();
  console.log("Address of contract deployed", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
