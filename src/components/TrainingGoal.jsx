import {useEffect} from 'react';

function TrainingGoal(props) {
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
        marginLeft: '100px', // Adjust the spacing between containers as needed
        marginRight: '100px', // Adjust the spacing between containers as needed
        marginBottom: '25px', // Adjust the spacing between containers as needed
      };

      // Define txtStyle with the desired styling properties
      const txtStyle = {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: 700, // Text is bold
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

    useEffect(() => {
        localStorage.setItem('showExtraQuestions', false);
    }
    , []);

    return (
      <div>
          <h1 style={headingStyle}>What is your training goal?</h1>
          <div style={containerStyle}>
              <a href="/" style={{ textDecoration: 'none' }}>
                  <div style={innerContainerStyle}>
                      <h2 style={txtStyle}>Bodybuilding</h2>
                      <p style={pStyle}>Build muscle for the entire body.</p>
                  </div>
              </a>
              <a href="/" style={{ textDecoration: 'none' }}>
                  <div style={innerContainerStyle}>
                      <h2 style={txtStyle}>Powerlifting</h2>
                      <p style={pStyle}>Increase strength for squat, bench, and deadlift.</p>
                  </div>
              </a>
          </div>
          <div style={containerStyle}>
              <a href="/" style={{ textDecoration: 'none' }}>
                  <div style={innerContainerStyle}>
                      <h2 style={txtStyle}>Powerbuilding</h2>
                      <p style={pStyle}>Gain both strength and muscle.</p>
                  </div>
              </a>
          </div>
      </div>
  );


}

export default TrainingGoal;
