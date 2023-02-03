const ethers = require('ethers');
const PRIVATE_KEY = ''
const CONTRACT = '0xb5624c7A3ed6E24Fbd4691eF8B2004287b2926D6';
const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "_str",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_time",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "block_number",
                "type": "uint256"
            }
        ],
        "name": "MessageEvent",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "_str",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "block_number",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MessageInfo.msgInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_str",
                "type": "string"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "str",
        "outputs": [
            {
                "internalType": "string",
                "name": "_str",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "block_number",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const { MongoClient } = require('mongodb');


async function fetchLatestTransaction(client) {
    return await client.db().collection("smart").findOne({}, { "sort": ['blockNumber', 'desc'] })
}

function filterTransaction(transactions, latestTransaction) {
    if (latestTransaction) {
        const newlist = (transactions || []).filter(eachTrans => eachTrans.blockNumber > latestTransaction.blockNumber);
        return newlist
    }
    return transactions
}

async function getTransaction() {
    const provider = new ethers.providers.EtherscanProvider('goerli', 'ITA45KD196IFK4QD8PTA6PKG3E6QEJUVZA')
    const signer = new ethers.Wallet(`0x${PRIVATE_KEY}`, provider);
    const contract = new ethers.Contract(CONTRACT, ABI, signer);
    const transactions = await contract.callStatic.retrieve();
    return transactions.map(eachTrans => {
        return {
            data: eachTrans._str,
            sender: eachTrans.sender,
            time: Number(eachTrans.time._hex),
            blockNumber: Number(eachTrans.block_number._hex),

        }
    })
}

async function insertData(client, data) {
    if (data.length) {
        await client.db().collection("smart").insertMany(data)
    }
}

async function main() {
    const uri = "mongodb://127.0.0.1:27017/smart?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const transactions = await getTransaction();
        const latestTransaction = await fetchLatestTransaction(client);
        const filterList = filterTransaction(transactions, latestTransaction)
        await insertData(client, filterList)
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
