const { Web3 } = require("web3");

// Set up a connection to the Ganache network
const web3 = new Web3("http://127.0.0.1:7545");

const abi = require("./pz2abi.json");
// new!!!
// 0xAB450e08824fe1FC80258aD68A908e9291952a39
const contractAddress = "0x28dFC116472Aa555812186a938100CE457a8bf1d";

const MyContract = new web3.eth.Contract(abi, contractAddress);

async function interact() {
	const providersAccounts = await web3.eth.getAccounts();
	const defaultAccount = providersAccounts[0];

	try {
		const receipt = await MyContract.methods.registerUser("John").send({
			from: defaultAccount,
			gas: 1000000,
			gasPrice: 10000000000
		});
		console.log("Transaction Hash: " + receipt.transactionHash);

		const userData = await MyContract.methods.getUserData(defaultAccount).call();
		console.log("User name: " + userData[0]);
	} catch (error) {
		console.error(error);
	}
}

interact();
