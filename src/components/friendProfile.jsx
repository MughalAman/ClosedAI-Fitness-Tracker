import React, { useState } from 'react';
import PreviousWorkout2 from './PreviousWorkout2';

function FriendProfile(props) {
    const [profilePicture, setProfilePicture] = useState('/pic.jpg');

    const profileTxtStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '50px',
        fontWeight: 1000,
        textAlign: 'left',
    };

    const profileTxtStyle1 = {
        ...profileTxtStyle,
        fontSize: '46px',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        color: '#FFF',
    };

    const leftContentStyle = {
        marginRight: '20px',
    };

    const rightContentStyle = {
        marginTop: '50px',
        marginLeft: '600px',
        lineHeight: '3',
    };

    const textStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontWeight: 900,
        lineHeight: '2',
        marginLeft: '10px',
        textAlign: 'center',

    };
    
    
    return (
        <div style={containerStyle}>
            <div style={leftContentStyle}>
                <h1 style={profileTxtStyle}>Juha's Profile:</h1>
                <h1 style={profileTxtStyle1}>Previous workouts:</h1>
                <PreviousWorkout2 />
            </div>
            <div style={rightContentStyle}>
                <h1 style={{ fontSize: '45px', marginBottom: '180px', marginTop: '-30px', fontFamily: 'Inter', fontWeight: 900 }}>Profile information</h1>
                <img 
                    src={profilePicture} 
                    alt="Profile" 
                    style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '75px',
                        cursor: 'pointer',
                        marginLeft: '115px',
                        marginBottom: '30px',
                        marginTop: '-170px'
                    }}
                />
                <p style={textStyle}>Friend Code</p>
                <p style={textStyle}>Name</p>
                <p style={textStyle}>Age</p>
                <p style={textStyle}>Sex</p>
                <p style={textStyle}>Weight</p>
                <p style={textStyle}>Height</p>
            </div>
        </div>
    );
}

export default FriendProfile;
