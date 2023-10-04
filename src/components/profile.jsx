import React, { useState } from 'react';

function Profile(props) {
    const [unit, setUnit] = useState('kg');

    const profileTxtStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: 'normal',
    };

    const buttonStyle = {
        backgroundColor: '#4CAF50', // Green
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        transitionDuration: '0.4s',
        cursor: 'pointer',
    };

    const buttonStyleHover = {
        ...buttonStyle,
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid #4CAF50',
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#333' }}>
            <h1 style={profileTxtStyle}>
                Profile: <br />
                Workout Settings
            </h1>
            <p>Weight measurement:</p>

            <button style={buttonStyle} onClick={() => setUnit('kg')}>
                kg
            </button>
            <button style={buttonStyle} onClick={() => setUnit('lbs')}>
                lbs
            </button>

            <p>Smallest Plate:</p>
            {unit === 'kg' && (
                <>
                    <button style={buttonStyle}>2.5kg</button>
                    <button style={buttonStyle}>1.25kg</button>
                    <button style={buttonStyle}>1kg</button>
                    <button style={buttonStyle}>0.5kg</button>
                    <p>kg</p>
                </>
            )}
            {unit === 'lbs' && (
                <>
                    <button style={buttonStyle}>5.51lbs</button>
                    <button style={buttonStyle}>2.76lbs</button>
                    <button style={buttonStyle}>2.20lbs</button>
                    <button style={buttonStyle}>1.10lbs</button>
                    <p>lbs</p>
                </>
            )}

            <div>
                <p>Profile id</p>
                <p>Name</p>
                <p>Age</p>
                <p>Sex</p>
                <p>Weight</p>
                <p>Height</p>
                <p>Profile Visibility:</p>

                <button style={buttonStyleHover}>Private</button>
                <button style={buttonStyleHover}>Public</button>
            </div>
        </div>
    );
}

export default Profile;
