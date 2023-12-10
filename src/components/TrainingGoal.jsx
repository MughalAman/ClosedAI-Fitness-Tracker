import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../utils/api';

/**
 * Component for selecting the training goal.
 * @component
 * @param {Object} props - Component props.
 * @returns {JSX.Element} JSX element representing the TrainingGoal component.
 */
function TrainingGoal(props) {

    /**
     * State for the selected training goal.
     * @type {[string, function]}
     */
    const [selectedGoal, setSelectedGoal] = useState('');

    /**
     * React Router navigation hook.
     */
    const navigate = useNavigate();

    /**
     * Handles the selection of training goal.
     * @async
     * @param {string} goal - Selected training goal.
     * @returns {Promise<void>} A Promise that resolves once the selection is handled.
     */
    const handleGoalSelection = async (goal) => {
        setSelectedGoal(goal);
        // Save the selected goal to extra_data using API call
        const token = localStorage.getItem('token');
        await updateUserData(token, {extra_data: {training_goal: goal}});
        // Redirect to the next page
        navigate('/');
    };

    /**
     * Saves the training goal to the server.
     * @async
     * @param {string} goal - Training goal to save.
     * @returns {Promise<void>} A Promise that resolves once the goal is saved.
     */
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

    /**
     * Styles for the heading of the component.
     * @type {Object}
     */
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

    /**
     * Styles for the main container of the component.
     * @type {Object}
     */
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px 0',
    };

    /**
     * Common styles for inner containers representing each training goal option.
     * @type {Object}
     */
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


    /**
     * Styles for text inside each inner container.
     * @type {Object}
     */
    const txtStyle = {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: 700, // Text is bold
        lineHeight: 'normal',
    };

    /**
     * Styles for paragraph inside each inner container.
     * @type {Object}
     */
    const pStyle = {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        lineHeight: 'normal',
        textAlign: 'left',
    };

    /**
     * useEffect hook to set showExtraQuestions to false in localStorage.
     */
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
