import React from 'react';

function ExerciseComplete(props) {
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

  const titleStyle = {
    fontSize: '64px',
    fontWeight: 'bold',
    color: 'white',
  };

  const listStyle = {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '32px',
  };

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

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Exercise complete!</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ul style={listStyle}>
          <li>Duration: 30 min</li>
          <li>Sets: 999</li>
          <li>Reps: 999</li>
          <li>Weight: 99</li>
        </ul>
        <ul style={listStyle}>
          <li>RPE: 10</li>
          <li>Rating: 5⭐</li>
        </ul>
      </div>
      <button style={buttonStyle}>SAVE</button>
    </div>
  );
}

export default ExerciseComplete;
