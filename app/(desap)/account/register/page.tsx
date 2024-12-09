'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'member',  // Default role
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await fetch('/api/account/register', {
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
            console.log('Selected role:', formData.role);


            alert('Registration Successful!');

            // Redirect based on role
            switch (formData.role) {
                case 'community-leader':
                    router.push('/dashboard/council-leader');
                    break;
                case 'admin':
                    router.push('/dashboard/admin');
                    break;
                case 'member':
                    router.push('/dashboard/member');
                    break;
                default:
                    router.push('/dashboard/member'); // Default redirection if role is not recognized
                    break;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '40px auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
            }}
        >
            <h1 style={{ textAlign: 'center', color: '#333' }}>Register</h1>

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
                        style={{ display: 'block', width: '100%', margin: '10px 0' }}
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
                        style={{ display: 'block', width: '100%', margin: '10px 0' }}
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
                        style={{ display: 'block', width: '100%', margin: '10px 0' }}
                    />
                </div>

                {/* Role Dropdown */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="role" style={{ fontWeight: 'bold', display: 'block' }}>
                        Role
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                        }}
                    >
                        <option value="community-leader">Community Leader</option>
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        borderRadius: '4px',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationPage;
