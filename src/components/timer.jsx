import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';
import { getLanguage } from '../utils/api';

/**
 * Timer component for managing workout timing.
 * @component
 * @param {Object} props - Component props.
 * @param {Function} props.nextExercise - Function to get the next exercise name based on elapsed time.
 * @returns {JSX.Element} JSX element representing the Timer component.
 */
const Timer = (props) => {

  /**
   * State for the selected language.
   * @type {[string, function]}
   */
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

  /**
   * Event handler for language change.
   * @param {Object} event - The event object.
   */
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    localStorage.setItem('selectedLanguage', event.target.value);
  };

  useEffect(() => {
    const storedSelectedLanguage = localStorage.getItem('selectedLanguage');

    if (!storedSelectedLanguage) {
      fetch('/api/language')
        .then(response => response.json())
        .then(data => {
          const selectedLanguage = data.language;
          setSelectedLanguage(selectedLanguage);
          localStorage.setItem('selectedLanguage', selectedLanguage);
        });
    } else {
      setSelectedLanguage(storedSelectedLanguage);
    }
  }, []);

  /**
   * State for localized strings.
   * @type {[Object, function]}
   */
  const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

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


  if (selectedLanguage === 'tr') {
    strings.setLanguage('tr');
  } else if (selectedLanguage === 'en') {
    strings.setLanguage('en');
  } else {
    strings.setLanguage('ru');
  }

  /**
   * Styles for the timer component.
   * @type {Object}
   */
  const timerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
    fontSize: "2vw",
    padding: "2vh",
    minWidth: "30vw",
  };

  /**
   * Styles for the timer button.
   * @type {Object}
   */
  const timerButton = {
    aspectRatio: "1/1",
    borderRadius: "50%",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "6vw",
  };

  /**
   * State for the start time of the timer.
   * @type {[number, function]}
   */
  const [startTime, setStartTime] = useState(null);

  /**
   * State for the elapsed time of the timer.
   * @type {[number, function]}
   */
  const [elapsedTime, setElapsedTime] = useState(0);

  /**
   * State for the running state of the timer.
   * @type {[boolean, function]}
   */
  const [isRunning, setIsRunning] = useState(false);

  /**
   * State for the name of the next exercise.
   * @type {[string, function]}
   */
  const [nextName, setNextName] = useState("name");

  /**
   * Color for the timer button based on the running state.
   * @type {string}
   */
  const buttonColor = isRunning ? "#0084CE" : "#00CE78";

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);

    } else {
      setNextName(props.nextExercise(elapsedTime));
      clearInterval(interval);
      setElapsedTime(0);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  /**
   * Format time function.
   * @param {number} timeInSeconds - Time in seconds.
   * @returns {string} Formatted time string.
   */
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}${strings.min} ${seconds}${strings.sec}`;
  };

  /**
   * Timer logic function to start/stop the timer.
   * @function
   */
  const timerLogic = () => {
    if (!isRunning) {
      setStartTime(Date.now() - elapsedTime);
    }
    setIsRunning(!isRunning);
  };

  return (
    <div style={timerStyle}>
      <p>{isRunning ? strings.currentexercise : strings.nextexercise}: {nextName}</p>
      <button style={{ ...timerButton, backgroundColor: buttonColor }} onClick={timerLogic}>
        {isRunning ? strings.stop : strings.start}
      </button>
      <p>{strings.currentexerciseduration}: {formatTime(Math.floor(elapsedTime / 1000))}</p>
    </div>
  );
};

export default Timer;