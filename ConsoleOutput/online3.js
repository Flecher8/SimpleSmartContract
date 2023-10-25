const { Web3 } = require("web3");
const { MNEMONIC, PROJECT_ID, PRIVATE_KEY } = process.env;

const web3 = new Web3("https://eth-goerli.g.alchemy.com/v2/xNZWeUP0mAf0MZyBmh5QvVP5DG5qYPIf");

// Load the contract ABI and address
const abi = require("./pz2abi.json");
const contractAddress = "0xc91BD8097c1A33acc0F1F32516c39351e998AB02";

const MyContract = new web3.eth.Contract(abi, contractAddress);

async function interact() {
	const defaultAccount = "0x34EE3291c50c6574b14e6648D2E740E8670891E4";
	const privateKey = PRIVATE_KEY;

	try {
		// Get the gas price
		const gasPrice = await web3.eth.getGasPrice();

		// Prepare the transaction object
		const txObject = MyContract.methods.registerUser("Hello");
		const tx = {
			to: contractAddress,
			data: txObject.encodeABI(),
			gas: 200000, // Set an appropriate gas limit
			gasPrice: gasPrice,
			from: defaultAccount,
			nonce: await web3.eth.getTransactionCount(defaultAccount, "latest")
		};

		// Sign and send the transaction
		const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
		const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		console.log("Transaction receipt: ", receipt);

		const userData = await MyContract.methods.getUserData(defaultAccount).call();
		console.log("User name: " + userData[0]);
	} catch (error) {
		console.error(error);
	}
}

interact();
