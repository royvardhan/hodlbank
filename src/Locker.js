import React, { useState, useEffect } from 'react';

function Locker() {
    
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(prev => event.target.value)}
    const handleSubmit  = (event) => {event.preventDefault()}

    // Connect Wallet Functionality
        // Web3 Browswer Detection
                async function getAccount() {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const account = accounts[0]
                return account;

     }
        const connect = () => { 
            if (typeof window !== "undefined") {
                getAccount().then(response => {
                    const accountStr = response.substring(0,7) + "..."
                    setAccount(accountStr);
                setWallAddrStr(accountStr)})
                    
            }
        };

        const [account, setAccount] = useState('Connect Wallet');
        const [wallAddrStr, setWallAddrStr] = useState('0x0000');
        

    // 


    return (
        <div className="flex justify-center text-sm">
        <div className='pt-5 pb-5 backdrop-blur-sm rounded-lg border-solid border-2 border-zinc-400 max-w-xl bg-gradient-to-r from-gray-100 to-gray-300 drop-shadow-2xl  '>
        <h4 className="text-center">Hello Hodler! You are {wallAddrStr}</h4>
        <div className="flex justify-center p-5">
            <p>You Lock:</p>
           <input className='ml-4 mr-4 border-solid border-2 border-indigo-600 text-center' onChange={handleChange} type="number" placeholder="Ex. 0.01 or 100 ETH" />
           <p>ETH</p>
        </div>
        <div className="flex justify-center ">
        <button onClick={handleSubmit} className="pl-0.5 pr-0.5 text-xs rounded bg-gradient-to-r from-blue-400 to-emerald-400 px-4 py-1"> LFG!!! </button>
        </div>
        <div className="flex justify-center pt-2">
        <button onClick={connect} className="pl-0.5 pr-0.5 text-xs rounded bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1"> {account} </button>
        </div>
        </div>
        </div>
    )

}

export default Locker;