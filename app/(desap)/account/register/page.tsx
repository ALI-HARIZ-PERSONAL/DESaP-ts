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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password){
            alert('All fields are required!');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                alert('Failed to register!');
                return;
            }

            const data = await response.json();
            console.log('Registration Successful:', data);
            alert('Registration Successful!');
        } catch(error){
            console.error('Error:', error);
            alert('Something went wrong!');
        }
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