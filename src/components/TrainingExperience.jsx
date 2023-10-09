import React from 'react';

function TrainingExperience(props) {
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
    background: '#404040',
    color: 'white',
    width: '440px',
    height: '324px',
    marginLeft: '100px',
    marginRight: '100px',
    marginBottom: '25px',
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
        <a href="/trainingdays" style={{ textDecoration: 'none' }}>
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>Beginner</h2>
            <p style={pStyle}>You have not lifted consistently at all and you would like to learn the fundamentals.</p>
          </div>
        </a>
        <a href="/trainingdays" style={{ textDecoration: 'none' }}>
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>Novice</h2>
            <p style={pStyle}>Under a year of consistent lifting or have trained before but you have taken a break for more than half a year.</p>
          </div>
        </a>
      </div>
      <div style={containerStyle}>
        <a href="/trainingdays" style={{ textDecoration: 'none' }}>
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>Intermediate</h2>
            <p style={pStyle}>1-3 years of consistent lifting and you want to take it to the next level.</p>
          </div>
        </a>
        <a href="/trainingdays" style={{ textDecoration: 'none' }}>
          <div style={innerContainerStyle}>
            <h2 style={txtStyle}>Advanced</h2>
            <p style={pStyle}>Over 3 years of consistent lifting and have completed many trainings in the past.</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default TrainingExperience;
