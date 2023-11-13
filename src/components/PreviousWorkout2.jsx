import React from 'react';



//FRIENDS PREVIOUS WORKOUTS COMPONENT (COPY OF PREVIOUS WORKOUTS COMPONENT) NAMED AS PREVIOUS WORKOUTS 2
const workoutHistory = [
  {
    id: 1,
    date: '2023-10-01',
    workoutName: 'Chest Day',
    workoutType: 'Strength Training',
    duration: '1 h',
    rating: 4.5,
    rpe: 7,
  },
  {
    id: 2,
    date: '2023-09-28',
    workoutName: 'Morning Run',
    workoutType: 'Running',
    duration: '30 mins',
    rating: 4.0,
    rpe: 6,
  },
  {
    id: 3,
    date: '2023-09-25',
    workoutName: 'Leg Day',
    workoutType: 'Strength Training',
    duration: '1.5 h',
    rating: 4.7,
    rpe: 8,
  },
];

const boxStyles = {
  width: '400px',
  height: '162px',
  backgroundColor: '#404040',
  borderRadius: '4px',
  padding: '16px',
  color: 'white',
  textAlign: 'left',
  fontSize: '20px',
  fontWeight: 'bold',
  marginRight: '16px',
  marginBottom: '16px',  // Add space below each box
};


const tableStyles = {
  display: 'table',
  width: '100%',
};

const tableRowStyles = {
  display: 'table-row',
};

const tableCellStyles = {
  display: 'table-cell',
  padding: '4px 8px',
  verticalAlign: 'top',
};

function PreviousWorkout2() {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Previous Workouts</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {workoutHistory.slice(0, 3).map((workout) => (
          <div key={workout.id} style={boxStyles}>
            <div style={tableStyles}>
              <div style={tableRowStyles}>
                <div style={tableCellStyles}>{workout.date}</div>
                <div style={tableCellStyles}>Rating: {workout.rating}⭐</div>
              </div>
              <div style={tableRowStyles}>
                <div style={tableCellStyles}>{workout.workoutName}</div>
                <div style={tableCellStyles}>RPE: {workout.rpe}⚡</div>
              </div>
              <div style={tableRowStyles}>
                <div style={tableCellStyles}>{workout.workoutType}</div>
                <div style={tableCellStyles}></div>
              </div>
              <div style={tableRowStyles}>
                <div style={tableCellStyles}>Duration: {workout.duration}🕛</div>
                <div style={tableCellStyles}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default PreviousWorkout2;
