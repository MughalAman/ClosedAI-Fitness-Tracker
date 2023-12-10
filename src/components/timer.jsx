import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';
import { getLanguage } from '../utils/api';

const Timer = (props) => {

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
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

  const timerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
    fontSize: "2vw",
    padding: "2vh", 
    minWidth: "30vw", 
  };

  const timerButton = {
    aspectRatio: "1/1",
    borderRadius: "50%",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "6vw",
  };

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [nextName, setNextName] = useState("name");

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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}${strings.min} ${seconds}${strings.sec}`;
  };

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