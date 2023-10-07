import React, { useState, useRef  } from 'react';

function friendProfile(props) {
    const [unit, setUnit] = useState('kg');
    const [selectedWeightUnit, setSelectedWeightUnit] = useState(null);
    const [selectedPlate, setSelectedPlate] = useState(null);
    const [profileVisibility, setProfileVisibility] = useState('private');
    const [profilePicture, setProfilePicture] = useState('/pic.jpg'); // Set default picture path

    const fileInput = useRef();  // Define the ref


    const onImageClick = () => {
        fileInput.current.click(); // Trigger the file input when the image is clicked
    };

    const profileTxtStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '50px',
        fontStyle: 'normal',
        fontWeight: 1000,
        lineHeight: 'normal',
        textAlign: 'left',
    };

    const profileTxtStyle1 = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '46px',
        fontStyle: 'normal',
        fontWeight: 1000,
        lineHeight: 'normal',
        textAlign: 'left',
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
        margin: '40px 2px',
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
        justifyContent: 'flex-start',
        color: '#FFF',
    };

    const leftContentStyle = {
        marginRight: '20px',
        justifyContent: 'flex-start',
    };

    const rightContentStyle = {
        marginLeft: '300px',
        justifyContent: 'flex-end',lineHeight: '3',

    };

    const buttonContainerStyle = {
        textAlign: 'left',
    };

    const txtStyle = {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: '22px',
        fontStyle: 'normal',
        textAlign: 'left',
        fontWeight: '700',
        lineHeight: 'normal',
    };

    const leftContent = (
        <div>
            <h1 style={profileTxtStyle}>Juha's Profile:</h1>
            <h1 style={profileTxtStyle1}>Previous workouts:</h1>
   
                ///Add previous workouts here
            
        </div>
    );
const saveButtonStyle = {
    width: '253px',
    height: '90px',
    flexShrink: 0,
    color: 'black',
    fontFamily: 'Inter',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    background: '#D9D9D9',
    marginRight: '164px',
    justifyContent: 'flex-start',
};

// ...

const textStyle = {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '2',
    
};
    
    const rightContent = (
        <div>
          <h1 style={{ 
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '45px',
                fontStyle: 'normal',
                fontWeight: 1000,
                marginBottom: '180px',
                marginTop: '-30px',
            }}>Profile information</h1>

            <img 
                src={profilePicture} 
                alt="Profile" 
                onClick={onImageClick} // Add the onClick handler here
                style={{width: '150px', height: '150px', borderRadius: '75px', cursor: 'pointer', justifyContent: 'flex-wrap', marginLeft: '115px', marginBottom: '30px', marginTop: '-170px'}}
            />
          


        <p style={textStyle}>Friend Code</p>
        <p style={textStyle}>Name</p>
        <p style={textStyle}>Age</p>
        <p style={textStyle}>Sex</p>
        <p style={textStyle}>Weight</p>
        <p style={textStyle}>Height</p>
        
        </div>
    );

    return (
        <div style={containerStyle}>
            <div style={leftContentStyle}>
                {leftContent}
            </div>
            <div style={rightContentStyle}>
                {rightContent}
            </div>
        </div>
    );
}

export default friendProfile;
