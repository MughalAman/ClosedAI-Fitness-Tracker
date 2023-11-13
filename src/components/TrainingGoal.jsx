import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../utils/api';

function TrainingGoal(props) {
    const [selectedGoal, setSelectedGoal] = useState('');
    const navigate = useNavigate();

    const handleGoalSelection = async (goal) => {
        setSelectedGoal(goal);
        // Save the selected goal to extra_data using API call
        const token = localStorage.getItem('token');
        await updateUserData(token, {extra_data: {training_goal: goal}});
        // Redirect to the next page
        navigate('/');
    };

    const saveTrainingGoal = async (goal) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('https://fitness-api-wlzk.onrender.com/user/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        extra_data: {
                            training_goal: goal,
                        },
                    }),
                });

                if (!response.ok) {
                    console.error('Failed to save training goal');
                }
            } catch (error) {
                console.error('Error saving training goal:', error);
            }
        }
    };

    const headingStyle = {
        color: 'white',
        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.56)',
        fontFamily: 'Inter',
        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: 'bold', // Teksti lihavoitu
        lineHeight: 'normal',
        textAlign: 'center', // Center the text horizontally
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px 0',
    };

    const innerContainerStyle = {
        display: 'inline-flex',
        padding: '0px 10px 19px 8px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        borderRadius: '5px',
        background: selectedGoal ? 'green' : '#404040', // Change background color based on selected goal
        color: selectedGoal ? 'white' : 'white', // Adjust text color based on selected goal
        width: '440px',
        height: '324px',
        marginLeft: '100px',
        marginRight: '100px',
        marginBottom: '25px',
        cursor: 'pointer',
    };

    // Define txtStyle with the desired styling properties
    const txtStyle = {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: 700, // Text is bold
        lineHeight: 'normal',
    };

    const pStyle = {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        lineHeight: 'normal',
        textAlign: 'left',
    };

    useEffect(() => {
        localStorage.setItem('showExtraQuestions', false);
    }
        , []);

    return (
        <div>
            <h1 style={headingStyle}>What is your training goal?</h1>
            <div style={containerStyle}>
                <div
                    style={innerContainerStyle}
                    onClick={() => handleGoalSelection('Bodybuilding')}
                >
                    <h2 style={txtStyle}>Bodybuilding</h2>
                    <p style={pStyle}>Build muscle for the entire body.</p>
                </div>
                <div
                    style={innerContainerStyle}
                    onClick={() => handleGoalSelection('Powerlifting')}
                >
                    <h2 style={txtStyle}>Powerlifting</h2>
                    <p style={pStyle}>Increase strength for squat, bench, and deadlift.</p>
                </div>
            </div>
            <div style={containerStyle}>
                <div
                    style={innerContainerStyle}
                    onClick={() => handleGoalSelection('Powerbuilding')}
                >
                    <h2 style={txtStyle}>Powerbuilding</h2>
                    <p style={pStyle}>Gain both strength and muscle.</p>
                </div>
            </div>
        </div>
    );
}

export default TrainingGoal;
