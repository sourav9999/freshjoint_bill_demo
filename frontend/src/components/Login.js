import React, { useState } from 'react';

export default function Login({ onLogin }){
  const [pin, setPin] = useState('');
  return (
    <div className="login">
      <h2>FreshJoint barBill — Login</h2>
      <input placeholder="Enter PIN" value={pin} onChange={e => setPin(e.target.value)} />
      <button onClick={() => onLogin(pin)}>Login</button>
    </div>
  );
}