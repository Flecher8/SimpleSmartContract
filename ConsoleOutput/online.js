const { ethers } = require("ethers");
require("dotenv").config();
const { MNEMONIC, PROJECT_ID, PRIVATE_KEY } = process.env;

// Connect to Alchemy
const alchemyUrl = `https://eth-goerli.g.alchemy.com/v2/${PROJECT_ID}`;
const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

// Create a wallet using your private key
const privateKey = PRIVATE_KEY; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Load the contract
const abi = require("./pz2abi.json");
const contractAddress = "0xc91BD8097c1A33acc0F1F32516c39351e998AB02";
const MyContract = new ethers.Contract(contractAddress, abi, wallet);

async function interact() {
	try {
		const tx = await MyContract.registerUser("123");
		await tx.wait();

		const userData = await MyContract.getUserData(wallet.address);
		console.log("User name: " + userData[0]);
	} catch (error) {
		console.error(error);
	}
}

interact();
