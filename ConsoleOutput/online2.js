const { Web3 } = require("web3");
const { MNEMONIC, PROJECT_ID, PRIVATE_KEY } = process.env;

// Set up a connection to the Ganache network
const web3 = new Web3("https://eth-goerli.g.alchemy.com/v2/xNZWeUP0mAf0MZyBmh5QvVP5DG5qYPIf");

const abi = require("./pz2abi.json");
// Goerli
const contractAddress = "0xc91BD8097c1A33acc0F1F32516c39351e998AB02";

const MyContract = new web3.eth.Contract(abi, contractAddress);

async function interact() {
	const providersAccounts = await web3.eth.getAccounts();
	const defaultAccount = "0x34EE3291c50c6574b14e6648D2E740E8670891E4";
	const privateKey = PRIVATE_KEY;

	try {
		const tx = {
			from: defaultAccount,
			to: contractAddress,
			gas: 1000000,
			gasPrice: 10000000000,
			data: MyContract.methods.registerUser("Hello").encodeABI()
		};

		const signature = await web3.eth.accounts.signTransaction(tx, privateKey);

		const res = await web3.eth.sendSignedTransaction(signature.rawTransaction);
		console.log("res: ", res);

		const userData = await MyContract.methods.getUserData(defaultAccount).call();
		console.log("User name: " + userData[0]);
	} catch (error) {
		console.error(error);
	}
}

interact();
