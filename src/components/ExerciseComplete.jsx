import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';
import { getLanguage } from '../utils/api';

/**
 * React component for displaying completion details of an exercise.
 * @module ExerciseComplete
 * @param {Object} props - React component props.
 * @param {string} props.mills - Duration of the exercise in milliseconds.
 * @param {string} props.sets - Number of sets completed.
 * @param {string} props.reps - Number of repetitions completed.
 * @param {string} props.weight - Weight used during the exercise.
 * @param {string} props.rpe - Rating of Perceived Exertion for the exercise.
 * @param {string} props.rating - User rating for the exercise.
 * @param {function} props.closeWorkout - Function to close the workout.
 * @returns {JSX.Element} JSX element representing the ExerciseComplete component.
 */
function ExerciseComplete(props) {
  /**
   * State for the selected language and localized strings.
   * @type {[string, function]}
   */
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
  const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

  /**
   * Fetches data based on the selected language.
   * @async
   * @function
   */
  useEffect(() => {
    async function fetchData() {
      const lang = selectedLanguage; // Call the getLanguage function
      setSelectedLanguage(lang); // Set the selected language based on the result
      setStrings(prevStrings => {
        const newStrings = new LocalizedStrings(localizationData);
        newStrings.setLanguage(lang);
        return newStrings;
      });
    }

    fetchData();
  }, []);

  // Set the language based on the selectedLanguage state
  if (selectedLanguage === 'tr') {
    strings.setLanguage('tr');
  } else if (selectedLanguage === 'en') {
    strings.setLanguage('en');
  } else {
    strings.setLanguage('ru');
  }

  /**
   * Styles for the container.
   * @type {Object}
   */
  const containerStyle = {
    width: '862px',
    height: '764px',
    border: '1px solid #000',
    padding: '20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the box horizontally and vertically
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#121212',
  };

  /**
   * Styles for the title.
   * @type {Object}
   */
  const titleStyle = {
    fontSize: '64px',
    fontWeight: 'bold',
    color: 'white',
  };

  /**
   * Styles for the list.
   * @type {Object}
   */
  const listStyle = {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '32px',
  };

  /**
   * Styles for the button.
   * @type {Object}
   */
  const buttonStyle = {
    width: '750px',
    height: '175px',
    backgroundColor: '#1DAEFF',
    color: 'white',
    fontSize: '64px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: 'auto',
  };

  /**
   * Styles for the background.
   * @type {Object}
   */
  const background = {
    minWidth: "100%",
    minHeight: "100%",
    position: "fixed",
    backgroundColor: "black",
    opacity: 0.99,
    top: 0,
    left: 0,
  }

  /**
   * JSX representing the ExerciseComplete component.
   * @returns {JSX.Element} JSX element representing the ExerciseComplete component.
   */
  return (
    <div style={background}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Workout Complete</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <ul style={listStyle}>
            <li>Workout name: {props.name}</li>
            <li>Date: {`${(""+date.getDate()).length<2 ? "0"+date.getDate() : date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</li>
            <li>Rating: {props.rating}⭐</li>
            <li>RPE: {props.rpe}</li>
            <li>Duration: {Math.floor(props.mills / 1000 / 60)} min</li>
          </ul>
        </div>
        <button style={buttonStyle} onClick={props.closeWorkout}>Save</button>
      </div></div>
  );
}

export default ExerciseComplete;
