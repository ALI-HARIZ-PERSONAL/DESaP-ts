'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LeaderDashboard = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(`/dashboard/leader/${path}`);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Community Leader Dashboard
            </h1>

            {/* Dashboard Containers */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: '20px'
            }}>
                {/* Container 1: View Community Members */}
                <div style={containerStyle}>
                    <h2>View Community Members</h2>
                    <p>View the list of all community members under your management.</p>
                    <button
                        onClick={() => handleNavigation('view-members')}
                        style={buttonStyle}
                    >
                        Go to View Members
                    </button>
                </div>

                {/* Container 2: Remove Community Members */}
                <div style={containerStyle}>
                    <h2>Remove Community Members</h2>
                    <p>Remove a member from the community if necessary.</p>
                    <button
                        onClick={() => handleNavigation('remove-members')}
                        style={buttonStyle}
                    >
                        Go to Remove Members
                    </button>
                </div>

                {/* Container 3: Verify Dengue Case Reports */}
                <div style={containerStyle}>
                    <h2>Verify Dengue Case Reports</h2>
                    <p>Review and verify reports of dengue cases submitted by community members.</p>
                    <button
                        onClick={() => handleNavigation('verify-reports')}
                        style={buttonStyle}
                    >
                        Go to Verify Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

// Container Styling
const containerStyle: React.CSSProperties = {
    flex: '1 1 300px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
};

// Button Styling
const buttonStyle: React.CSSProperties = {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default LeaderDashboard;
