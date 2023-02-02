const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const weiAmount = (await deployer.getBalance()).toString();
  console.log("Account balance:", (await hre.ethers.utils.formatEther(weiAmount)));
  const MessageInfo = await hre.ethers.getContractFactory("MessageInfo");
  const messageInfo = await MessageInfo.deploy();
  await messageInfo.deployed();

  //   gasPrice: { BigNumber: "23610503242" },

  // log the address of the Contract in our console
  console.log("Token address:", messageInfo.address);
  await messageInfo.connect(deployer).store("Carolina");
}

// run main, catch error, if any, and log in console
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });