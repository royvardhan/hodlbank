import React from "react";
import './index.css';
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <div className="flex justify-center ">
        <div className="max-w-xs m-auto pt-20 pb-5 text-sm">
        <Link to="/"><button className="mr-10 rounded bg-gradient-to-r from-blue-400 to-emerald-400 px-5 py-1  "> Lock </button></Link>
        <Link to="/withdraw"><button className="rounded bg-gradient-to-r from-blue-400 to-emerald-400 px-4 py-1"> Unlock </button></Link>
        </div>
        </div>
        
        
    )
}

export default Navbar;

