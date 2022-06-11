import './index.css';
import React from 'react';
import Navbar from './Navbar';
import Locker from './Locker';
import Withdraw from './Withdraw';
import { Route, Routes as Switch } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" element={<Locker />} />
        <Route path="/withdraw" element={<Withdraw />} />
        </Switch>
    </div>
  ) 
}