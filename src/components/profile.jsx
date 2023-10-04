import React, { useState } from 'react';

function Profile(props) {
    const [unit, setUnit] = useState('kg');
    const [selectedWeightUnit, setSelectedWeightUnit] = useState(null);
    const [selectedPlate, setSelectedPlate] = useState(null);
    const [profileVisibility, setProfileVisibility] = useState('private');

    const profileTxtStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: 'normal',
    };

    const buttonStyle = {
        backgroundColor: '#404040',
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

    const buttonStyleActive = {
        ...buttonStyle,
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid #404040',
    };

    const radioStyle = {
        margin: '0 8px',
    };

    const labelStyle = {
        color: '#FFF',
        fontSize: '16px',
        margin: '0 8px',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#FFF', 
    };

    const leftContent = (
        <div>
            <h1 style={profileTxtStyle}>
                Profile: <br />
                Workout Settings
            </h1>
            <p>Weight measurement:</p>
            <button 
                style={selectedWeightUnit === 'kg' ? buttonStyleActive : buttonStyle} 
                onClick={() => {
                    setUnit('kg');
                    setSelectedWeightUnit('kg');
                }}
            >
                kg
            </button>
            <button 
                style={selectedWeightUnit === 'lbs' ? buttonStyleActive : buttonStyle} 
                onClick={() => {
                    setUnit('lbs');
                    setSelectedWeightUnit('lbs');
                }}
            >
                lbs
            </button>

            <p>Smallest Plate:</p>
            {unit === 'kg' && (
                <>
                    {['2.5', '1.25', '1', '0.5'].map((value) => (
                        <button 
                            key={value}
                            style={selectedPlate === `${value}kg` ? buttonStyleActive : buttonStyle} 
                            onClick={() => setSelectedPlate(`${value}kg`)}
                        >
                            {value}kg
                        </button>
                    ))}
                </>
            )}
            {unit === 'lbs' && (
                <>
                    {['5.51', '2.76', '2.20', '1.10'].map((value) => (
                        <button 
                            key={value}
                            style={selectedPlate === `${value}lbs` ? buttonStyleActive : buttonStyle} 
                            onClick={() => setSelectedPlate(`${value}lbs`)}
                        >
                            {value}lbs
                        </button>
                    ))}
                </>
            )}
        </div>
    );

    const rightContent = (
        <div>
            <p>Profile id</p>
            <p>Name</p>
            <p>Age</p>
            <p>Sex</p>
            <p>Weight</p>
            <p>Height</p>
            <p>Profile Visibility:</p>
            <input 
                type="radio" 
                value="private" 
                checked={profileVisibility === 'private'} 
                onChange={() => setProfileVisibility('private')} 
                style={radioStyle} 
            />
            <label style={labelStyle}>Private</label>
            <input 
                type="radio" 
                value="public" 
                checked={profileVisibility === 'public'} 
                onChange={() => setProfileVisibility('public')} 
                style={radioStyle} 
            />
            <label style={labelStyle}>Public</label>
        </div>
    );

    return (
        <div style={containerStyle}>
            {leftContent}
            {rightContent}
        </div>
    );
}

export default Profile;
