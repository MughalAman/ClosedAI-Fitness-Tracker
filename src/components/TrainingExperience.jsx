import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../utils/api';

function TrainingExperience(props) {
  const [selectedExperience, setSelectedExperience] = useState('');
  const navigate = useNavigate();

  const handleExperienceSelection = async (experience) => {
    setSelectedExperience(experience);
    // Save the selected experience to extra_data using API call
    const token = localStorage.getItem('token');
    await updateUserData(token, {extra_data: {training_experience: experience}});
    // Redirect to the next page or homepage
    navigate('/trainingdays');
  };

  const saveTrainingExperience = async (experience) => {
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
              training_experience: experience,
            },
          }),
        });

        if (!response.ok) {
          console.error('Failed to save training experience');
        }
      } catch (error) {
        console.error('Error saving training experience:', error);
      }
    }
  };

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
    background: selectedExperience  ? 'green' : '#404040', // Change background color based on selected experience
    color: selectedExperience ? 'white' : 'white', // Adjust text color based on selected experience
    width: '440px',
    height: '324px',
    marginLeft: '100px',
    marginRight: '100px',
    marginBottom: '25px',
    cursor: 'pointer',
  };

  const txtStyle = {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 700,
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

  return (
    <div>
      <h1 style={headingStyle}>What is your training experience?</h1>
      <div style={containerStyle}>
        <div
          style={innerContainerStyle}
          onClick={() => handleExperienceSelection('Beginner')}
        >
          <h2 style={txtStyle}>Beginner</h2>
          <p style={pStyle}>You have not lifted consistently at all and you would like to learn the fundamentals.</p>
        </div>
        <div
          style={innerContainerStyle}
          onClick={() => handleExperienceSelection('Novice')}
        >
          <h2 style={txtStyle}>Novice</h2>
          <p style={pStyle}>Under a year of consistent lifting or have trained before but you have taken a break for more than half a year.</p>
        </div>
      </div>
      <div style={containerStyle}>
        <div
          style={innerContainerStyle}
          onClick={() => handleExperienceSelection('Intermediate')}
        >
          <h2 style={txtStyle}>Intermediate</h2>
          <p style={pStyle}>1-3 years of consistent lifting and you want to take it to the next level.</p>
        </div>
        <div
          style={innerContainerStyle}
          onClick={() => handleExperienceSelection('Advanced')}
        >
          <h2 style={txtStyle}>Advanced</h2>
          <p style={pStyle}>Over 3 years of consistent lifting and have completed many trainings in the past.</p>
        </div>
      </div>
    </div>
  );
}

export default TrainingExperience;