'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        profilePicture: null,
        username: '',
        email: '',
        mobileNumber: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
        role: 'member',  // Default role
        termsAccepted: false,
    });

    const [ageError, setAgeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

         // Validate birth date for age restriction
         if (name === 'birthDate') {
            const age = calculateAge(new Date(value));
            if (age < 18) {
                setAgeError('You must be at least 18 years old to register.');
            } else {
                setAgeError('');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
};


    const calculateAge = (birthDate: Date) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Trim spaces from password fields before comparing
        const trimmedPassword = formData.password.trim();
        const trimmedConfirmPassword = formData.confirmPassword.trim();
    
        // Validate password confirmation before submitting
        if (trimmedPassword !== trimmedConfirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        } else {
            setPasswordError('');
        }
    
        if (!formData.username || !formData.email || !formData.password || !formData.mobileNumber) {
            alert('All fields are required!');
            return;
        }
    
        if (passwordError || ageError) {
            alert('Please fix the errors before submitting.');
            return;
        }

        if (!formData.termsAccepted) {
            alert('You must agree to the Terms and Conditions to register.');
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
                case 'operation-team':
                    router.push('/dashboard/operation-team');
                    break;
                case 'community-member':
                    router.push('/dashboard/community-member');
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
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '50px' }}>Register</h1>
            
            <form onSubmit={handleSubmit}>

            {/*Profile Picture*/}    
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>
                Profile Picture
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'block', margin: '0 auto' }}
                />
                {formData.profilePicture && (
                <div style={{ marginTop: '10px' }}>
                    <img
                        src={URL.createObjectURL(formData.profilePicture)}
                        alt="Profile Preview"
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            display: 'block',
                            margin: '0 auto',
                            border: '2px solid #ccc',
                        }}
                    />
                </div>
                )}
            </div>
                
                {/*Mobile Number Field*/}
                <div style={{ marginTop: '30px',marginBottom: '30px' }}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', margin: '8px 0' }}
                    />
                </div>

                {/*Mobile Number Field*/}
                <div style={{ marginBottom: '30px' }}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', margin: '8px 0'}}
                    />
                </div>

                {/*Mobile Number Field*/}
                <div style={{ marginBottom: '30px' }}>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="Enter your mobile number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', margin: '8px 0' }}
                    />
                </div>
                
                {/*BirthDate field*/}
                <div style={{ marginBottom: '30px' }}>
                    <label htmlFor="birthDate">Birth Date</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', margin: '8px 0' }}
                    />
                    {ageError && <p style={{ color: 'red' }}>{ageError}</p>}
                </div>

                {/*Password Field*/}
                <div style={{ marginBottom: '30px' }}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', margin: '8px 0' }}
                    />
                </div>

                {/* Password Confirmation Field */}
                <div style={{ marginBottom: '30px' }}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', margin: '10px 0' }}
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>


                {/* Role Dropdown */}
                <div style={{ marginBottom: '30px' }}>
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
                        <option value="community-member">Community Member</option>
                        <option value="operation-team">Operation Team</option>
                    </select>
                </div>

                {/*TnC checkbox */}
                <div>
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        onChange={(e) =>
                            setFormData({ ...formData, termsAccepted: e.target.checked })
                        }
                    />
                    <label htmlFor="terms">
                        I agree to the <a href="/terms">Terms and Conditions</a>.
                    </label>
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
