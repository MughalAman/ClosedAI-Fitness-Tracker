import React, { useState } from 'react';



function TrainingGoal(props) {


    const headingStyle = {
        color: '#1DAEFF',
        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.56)',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 'bold', // Teksti lihavoitu
        lineHeight: 'normal',
    };


    return ( 

        <div>
            <h1 style={headingStyle}>What is your training goal?</h1>
        </div>


    );


}



export default TrainingGoal; 