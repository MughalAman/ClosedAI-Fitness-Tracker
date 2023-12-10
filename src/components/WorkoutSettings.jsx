import React, { useState } from 'react';

function WorkoutSettings(props) {
  const [selectedWeightUnit, setSelectedWeightUnit] = useState('lbs');
  const [selectedSmallestPlate, setSelectedSmallestPlate] = useState(null);

  const headingStyle = {
    color: 'white',
    textShadow: '0px 0px 4px rgba(0, 0, 0, 0.56)',
    fontFamily: 'Inter',
    fontSize: '64px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    textAlign: 'left',
    marginBottom: '60px',
  };

  const titleStyle = {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: '32px',
    fontStyle: 'normal',
    lineHeight: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
    margin: '50px 0',
  };

  const innerContainerStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    backgroundColor: '#404040',
    color: 'white',
    width: '95px',
    height: '77px',
    marginRight: '40px',
    marginBottom: '25px',
    cursor: 'pointer',
  };

  const kgContainerStyle = {
    ...innerContainerStyle,
    backgroundColor: selectedWeightUnit === 'kgs' ? 'white' : '#404040',
    color: selectedWeightUnit === 'kgs' ? 'black' : 'white',
  };

  const txtStyle = {
    fontFamily: 'Inter',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
  };

  const buttonStyle = {
    width: '313px',
    height: '100px',
    backgroundColor: '#FFFFFF',
    color: 'black',
    fontFamily: 'Inter',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };

  const handleWeightUnitClick = (unit) => {
    setSelectedWeightUnit(unit);
    setSelectedSmallestPlate(null); // Reset the smallest plate selection when changing weight units
  };

  const handleSmallestPlateClick = (plateValue) => {
    setSelectedSmallestPlate(plateValue);
  };

  // Define "Smallest plate" options based on selected weight measurement
  const smallestPlateOptions =
    selectedWeightUnit === 'lbs'
      ? [7.5, 5, 2.5, 1.25]
      : [2.5, 1.25, 1, 0.5];

  return (
    <div>
      <h1 style={headingStyle}>Choose your default workout settings</h1>

      <h2 style={titleStyle}>Weight measurement:</h2>

      <div style={containerStyle}>
        <div
          style={{
            ...innerContainerStyle,
            backgroundColor: selectedWeightUnit === 'lbs' ? 'white' : '#404040',
            color: selectedWeightUnit === 'lbs' ? 'black' : 'white',
          }}
          onClick={() => handleWeightUnitClick('lbs')}
        >
          <h2 style={txtStyle}>lbs</h2>
        </div>
        <div
          style={kgContainerStyle}
          onClick={() => handleWeightUnitClick('kgs')}
        >
          <h2 style={txtStyle}>kgs</h2>
        </div>
      </div>

      <h2 style={titleStyle}>Smallest plate:</h2>

      <div style={containerStyle}>
        {smallestPlateOptions.map((plateValue) => (
          <div
            key={plateValue}
            style={{
              ...innerContainerStyle,
              backgroundColor:
                selectedSmallestPlate === plateValue ? 'white' : '#404040',
              color:
                selectedSmallestPlate === plateValue ? 'black' : 'white',
            }}
            onClick={() => handleSmallestPlateClick(plateValue)}
          >
            <h2 style={txtStyle}>{plateValue}</h2>
          </div>
        ))}
        <div
          style={{
            ...innerContainerStyle,
            backgroundColor:
              selectedSmallestPlate === 'lbs' || selectedSmallestPlate === 'kgs'
                ? 'black'
                : 'black',
            color: 'white',
          }}
          onClick={() =>
            handleSmallestPlateClick(
              selectedWeightUnit === 'lbs' ? 'lbs' : 'kgs'
            )
          }
        >
          <h2 style={txtStyle}>
            {selectedWeightUnit === 'lbs' ? 'lb' : 'kg'}
          </h2>
        </div>
      </div>
      <button style={buttonStyle}>Next</button>
    </div>
  );
}

export default WorkoutSettings;
