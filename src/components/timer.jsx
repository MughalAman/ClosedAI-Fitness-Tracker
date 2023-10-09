import React, { useState, useEffect } from 'react';

const Timer = (props) => {

  const timerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
    fontSize: "30px",
  };

  const timerButton = {
    aspectRatio: "1/1",
    borderRadius: "50%",
    textAlign: "center",
    cursor: "pointer",
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
    return `${minutes}min ${seconds}s`;
  };

  const timerLogic = () => {
    if (!isRunning) {
      setStartTime(Date.now() - elapsedTime);
    }
    setIsRunning(!isRunning);
  };

  return (
    <div style={timerStyle}>
      <p>{isRunning ? "Current exercise" : "Next exercise"}: {nextName}</p>
      <button style={{ ...timerButton, backgroundColor: buttonColor }} onClick={timerLogic}>
        {isRunning ? "STOP" : "START"}
      </button>
      <p>Current exercise duration: {formatTime(Math.floor(elapsedTime / 1000))}</p>
    </div>
  );
};

export default Timer;