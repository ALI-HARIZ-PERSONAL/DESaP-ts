'use client'; 

import React from 'react';

const RegistrationPage = () => {
  
  return (
    <div style={{maxWidth: '400px', margin: 'auto', padding: '20px'}}>

      <h1>Register</h1>

      <form>
        <div>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                style={{ display: 'block', width: '100%', margin: '10px 0'}}
        />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                style={{ display: 'block', width: '100%', margin: '10px 0'}}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                style={{ display: 'block', width: '100%', margin: '10px 0'}}
            />
        </div>

        <button type="submit" style={{ marginTop: '20px'}}>Register</button>

      </form>
    </div>
    
)

};

export default RegistrationPage;