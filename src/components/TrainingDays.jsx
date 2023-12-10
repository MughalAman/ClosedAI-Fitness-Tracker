import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../utils/api';

/**
 * Component for selecting the number of training days per week.
 * @component
 * @param {Object} props - Component props.
 * @returns {JSX.Element} JSX element representing the TrainingDays component.
 */
function TrainingDays(props) {

  /**
   * State for the selected training days.
   * @type {[string, function]}
   */
  const [selectedDays, setSelectedDays] = useState('');

  /**
   * React Router navigation hook.
   */
  const navigate = useNavigate();

  /**
   * Handles the selection of training days.
   * @async
   * @param {string} days - Selected number of training days.
   * @returns {Promise<void>} A Promise that resolves once the selection is handled.
   */
  const handleDaysSelection = async (days) => {
    setSelectedDays(days);
    // Save the selected days to extra_data using API call
    const token = localStorage.getItem('token');
    await updateUserData(token, { extra_data: { training_days: days } });
    // Redirect to the next page or homepage
    navigate('/traininggoal');
  };

  const saveTrainingDays = async (days) => {
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
              training_days: days,
            },
          }),
        });

        if (!response.ok) {
          console.error('Failed to save training days');
        }
      } catch (error) {
        console.error('Error saving training days:', error);
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
    fontWeight: 'bold',
    lineHeight: 'normal',
    textAlign: 'center',
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
   * Common styles for inner containers representing each training day option.
   * @type {Object}
   */
  const innerContainerStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    borderRadius: '5px',
    background: selectedDays ? 'green' : '#404040', // Change background color based on selected days
    color: selectedDays ? 'white' : 'white', // Adjust text color based on selected days
    width: '350px', // Set a fixed width for all inner containers
    height: '324px',
    marginLeft: '40px', // Adjust the spacing between containers as needed
    marginRight: '40px', // Adjust the spacing between containers as needed
    marginBottom: '25px', // Adjust the spacing between containers as needed
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
    fontWeight: 700,
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
    textAlign: 'center',
  };

  return (
    <div>
      <h1 style={headingStyle}>How many days per week would you like to train?</h1>
      <div style={containerStyle}>
        <div
          style={innerContainerStyle}
          onClick={() => handleDaysSelection('2')}
        >
          <h2 style={txtStyle}>2</h2>
          <p style={pStyle}>Typically for beginners.</p>
        </div>
        <div
          style={innerContainerStyle}
          onClick={() => handleDaysSelection('3')}
        >
          <h2 style={txtStyle}>3</h2>
          <p style={pStyle}>Typically for novice to intermediate.</p>
        </div>
        <div
          style={innerContainerStyle}
          onClick={() => handleDaysSelection('4')}
        >
          <h2 style={txtStyle}>4</h2>
          <p style={pStyle}>Typically for intermediate.</p>
        </div>
      </div>
      <div style={containerStyle}>
        <div
          style={innerContainerStyle}
          onClick={() => handleDaysSelection('5')}
        >
          <h2 style={txtStyle}>5</h2>
          <p style={pStyle}>Typically for intermediate to advanced.</p>
        </div>
        <div
          style={innerContainerStyle}
          onClick={() => handleDaysSelection('6')}
        >
          <h2 style={txtStyle}>6</h2>
          <p style={pStyle}>Typically for intermediate to advanced.</p>
        </div>
      </div>
    </div>
  );
}

export default TrainingDays;