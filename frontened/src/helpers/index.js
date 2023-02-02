module.exports = {
    CONTRACT: '0xb5624c7A3ed6E24Fbd4691eF8B2004287b2926D6',
    ABI: [
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
}
