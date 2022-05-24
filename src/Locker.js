import React, { useState, useEffect } from 'react';
import hodlBankAbi from './hodlBankAbi.json';
import {BigNumber, ethers} from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils'; 

function Locker() {
    
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(prev => event.target.value)}
    const [time, setTime] = useState('');
    const handleTime = (event) => {setTime(prev => event.target.value)}
    const [account, setAccount] = useState('Connect Wallet');
    const [wallAddrStr, setWallAddrStr] = useState('0x0000');
    const [errorMessage, setErrorMessage] = useState(null);
    

    // Connect Wallet Functionality
    // Web3 Browswer Detection & Read-Write Functionality

        let contractAddress = "0x416d9DEA938Fc866Ecf87F46EC880157188D7031";
        const [provider, setProvider] = useState(null);
        const [signer, setSigner] = useState(null);
        const [contract, setContract] = useState(null);

        const connectWallet = () => {
            if (window.ethereum && window.ethereum.isMetaMask) {

                window.ethereum.request({ method: 'eth_requestAccounts'})
                .then(accounts => {
                    contractInit(accounts[0])
                    const accountStr = account.substring(0,7) + "..."
                    setAccount(accountStr);
                    setWallAddrStr(accountStr);

                })
                .catch(error => {
                    setErrorMessage(error.message);
                
                });
    
            } else {
                console.log('Need to install MetaMask');
                setErrorMessage('Please install MetaMask browser extension to interact');
            }
        }

        const contractInit = (newAccount) => {
            let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		    setProvider(tempProvider);

		    let tempSigner = tempProvider.getSigner();
		    setSigner(tempSigner);

		    let tempContract = new ethers.Contract(contractAddress, hodlBankAbi, tempSigner);
		    setContract(tempContract);
        }
    

    const handleSubmit = async () => {
    }


    return (
        <div className="flex justify-center text-sm">
        <div className='pt-5 pb-5 backdrop-blur-sm rounded-lg border-solid border-2 border-zinc-400 max-w-xl bg-gradient-to-r from-gray-100 to-gray-300 drop-shadow-2xl  '>
        <h4 className="text-center">Hello Hodler! You are {wallAddrStr}</h4>
        <div className="flex justify-center p-5">
            <p>You Lock:</p>
           <input className='ml-4 mr-4 border-solid border-2 border-indigo-600 text-center' onChange={handleChange} type="number" placeholder="Ex. 0.01 or 100 ETH" />
           <p>ETH</p>
        </div>
        <div className="flex justify-center">
        <p>Until: </p>
        <input className='ml-4 mr-4 border-solid border-2 border-indigo-600 text-center' onChange={handleTime} type="date" />
        </div>
        <div className="flex justify-center pt-5">
        <button onClick={handleSubmit} className="pl-0.5 pr-0.5 text-xs rounded bg-gradient-to-r from-blue-400 to-emerald-400 px-4 py-1"> LFG!!! </button>
        </div>
        <div className="flex justify-center pt-2">
        <button onClick={connectWallet} className="pl-0.5 pr-0.5 text-xs rounded bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1"> {account} </button>
        </div>
        </div>
        </div>
    )

}

export default Locker;