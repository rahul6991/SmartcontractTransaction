import React, { useState, createContext, useEffect } from 'react'
import Web3 from "web3";
import { ABI, CONTRACT } from '../helpers';

const Web3Context = createContext({})

function Web3Provider({ children }) {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    const [isActive, setActive] = useState(true);
    const [isLoading, setLoading] = useState(true);

    function handleAccount(accounts) {
        setAccount(accounts.length ? accounts[0] : '');
    }

    const getTransactions = () => {
        try {
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(ABI, String(CONTRACT));
            contract.methods.retrieve().call().then(transactions => {
                console.log(transactions)

                setTransactions(transactions);
            });
            contract.events.MessageEvent().on('data', (trans) => {
                console.log("=====trans.returnValues[0],", trans, trans.returnValues[0], trans.returnValues[1], trans.returnValues[2], trans.returnValues[3], "-----", trans.returnValues._str, trans.returnValues._from, trans.returnValues._time, trans.returnValues.block_number)
                const newObj = [trans.returnValues[0], trans.returnValues[1], trans.returnValues[2], trans.returnValues[3]]
                setTransactions((e) => [...e, newObj])
            })
        }
        catch (e) {
            console.log("----222----", e)
        }
    }

    const updateTransaction = (data, callback) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(ABI, String(CONTRACT));
        contract.methods.store(data).send({ from: account }).then(res => {
            callback(true)
        }).catch(e => {
            callback(false)
        })
    }

    const connectToWallet = () => {
        try {
            if (window.ethereum) {
                window.ethereum.on('accountsChanged', handleAccount);
                window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(handleAccount)
                    .catch((error) => {
                        console.log('Please connect to wallet.')
                    });
            } else {
                setActive(false);
            }
            setLoading(false);
        }
        catch (e) {
            setActive(false);
            setLoading(false);

        }
    }

    const getBalance = () => {
        const web3 = new Web3(window.ethereum);
        web3.eth.getBalance(account).then(res => {
            setBalance(web3.utils.fromWei(res))
        })
    }
    useEffect(() => {
        connectToWallet();
    }, []);

    useEffect(() => {
        if (account) {
            getBalance();
            getTransactions();
        }
    }, [account]);

    const value = { account, connectToWallet, balance, transactions, updateTransaction }
    return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

function useWeb3Context() {
    const context = React.useContext(Web3Context)
    return context
}

export { Web3Provider, useWeb3Context }