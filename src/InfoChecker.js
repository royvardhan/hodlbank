import React, {useState} from "react";
import "./index.css"
import {ethers} from "ethers";
import hodlBankAbi from "./hodlBankAbi.json"; 


export default function InfoChecker (props) {

    const [address, setAddress] = useState("");
    const [lockedEther, setLockedEther] = useState(null);
    const [timeMinutes, setTimeMinutes] = useState("");
    const [timeDays, setTimeDays] = useState("");
    const [timeHours, setTimeHours] = useState("");
    const [time, setTime] = useState(null);

    const contract = new ethers.Contract(props.state.address, hodlBankAbi, props.state.signer);
    
    function handleChange(e) {
        setAddress(e.target.value);
    }

    const checkLocked = async () => {
        const query = await contract.addressToHodler(address);
        const queryEth = ethers.utils.formatEther(query.amount)
        if (queryEth > 0) {
            setLockedEther((ethers.utils.formatEther(query.amount)) + " ETH");
            const getTime = new Date(query.unlockDate * 1000);
            const humanDateFormat = getTime.toLocaleString();
            setTime(humanDateFormat);
            const timeMin = getTime.getMinutes();
            setTimeMinutes(timeMin);
            const timeDays = getTime.getDay();
            setTimeDays(timeDays);
            const timeHours = getTime.getHours();
            setTimeHours(timeHours);
        } else {
            setLockedEther("0");
            setTimeMinutes("0");
            setTimeDays("0");
            setTimeHours("0");
        }
    }

    function handleClick() {
        checkLocked()
    }
    
    

    return (
        <div className="flex justify-center text-sm pt-5 ">
        <div className='min-w-fit pt-5 pb-5 backdrop-blur-sm rounded-lg border-solid border-2 border-zinc-400 max-w-xl bg-gradient-to-r from-gray-100 to-gray-300 drop-shadow-2xl  '>
        <h4 className="text-center">InfoChecker</h4>
        <div className="flex justify-center p-5">
            <p>Your</p>
           <input className='ml-4 mr-4 border-solid border-2 border-indigo-600 text-center' onChange={handleChange} type="text" placeholder="Paste Address" />
           <p>Address</p>
        </div>
        <div className="flex justify-center">
        <button className='pl-0.5 pr-0.5 text-xs rounded bg-gradient-to-r from-blue-400 to-emerald-400 px-4 py-1' onClick={handleClick} type="date"> Check </button>
        </div>
        <div className="pt-3 text-center">
            <p>You have locked: {lockedEther}</p>
            <p>Until: {time} </p>
        </div>
        </div>
        </div>
    )
}