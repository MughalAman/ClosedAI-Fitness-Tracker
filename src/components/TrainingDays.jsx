import React from 'react';

function TrainingDays(props) {
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

  // Common style for inner containers
  const innerContainerStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    borderRadius: '5px',
    background: '#404040',
    color: 'white',
    width: '350px', // Set a fixed width for all inner containers
    height: '324px',
    marginLeft: '40px', // Adjust the spacing between containers as needed
    marginRight: '40px', // Adjust the spacing between containers as needed
    marginBottom: '25px', // Adjust the spacing between containers as needed
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
    textAlign: 'center',
  };

  return (
    <div>
      <h1 style={headingStyle}>How many days per week would you like to train?</h1>
      <div style={containerStyle}>
        <a href="/traininggoal"> {/* Set a unique URL for each option */}
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>2</h2>
            <p style={pStyle}>Typically for beginners.</p>
          </div>
        </a>
        <a href="/traininggoal">
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>3</h2>
            <p style={pStyle}>Typically for novice to intermediate.</p>
          </div>
        </a>
        <a href="/traininggoal">
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>4</h2>
            <p style={pStyle}>Typically for intermediate.</p>
          </div>
        </a>
      </div>
      <div style={containerStyle}>
        <a href="/traininggoal">
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>5</h2>
            <p style={pStyle}>Typically for intermediate to advanced.</p>
          </div>
        </a>
        <a href="/traininggoal">
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>6</h2>
            <p style={pStyle}>Typically for intermediate to advanced.</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default TrainingDays;
