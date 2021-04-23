//CONNECT TO ABI CONTRACT

export const ABI_ADDRESS = '0x75372E5EE5eB616E7e64156Bcae5294FA8F0c319'

export const ABI_CONTRACT = [
	{
		"inputs": [],
		"name": "decrement",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "increment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]