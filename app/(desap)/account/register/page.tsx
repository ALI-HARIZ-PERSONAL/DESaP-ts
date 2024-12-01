'use client'; 

import React, { useState} from 'react';

const RegistrationPage = () => {
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password){
            alert('All fields are required!');
            return;
        }
        console.log('Form Data: ', formData);
    };
  
  return (
    <div style={{maxWidth: '400px', margin: 'auto', padding: '20px'}}>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                style={{ display: 'block', width: '100%', margin: '10px 0'}}
            />
        </div>

        <button type="submit" style={{ marginTop: '20px'}}>Register</button>

      </form>
    </div>
    
)

};

export default RegistrationPage;