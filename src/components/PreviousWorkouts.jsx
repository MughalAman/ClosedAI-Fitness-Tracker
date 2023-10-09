import React from 'react';

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

function PreviousWorkouts(props) {
  const { userData } = props;

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Previous Workouts</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {userData['workouts'].slice(0, 3).map((workout) => {
            // Calculate the total and average rating from the exercises' ratings
            let totalRating = 0;
            let ratedExercisesCount = 0;

            workout.exercises.forEach((exercise) => {
              if (exercise.ratings.length > 0) {
                const exerciseRating = exercise.ratings.reduce((acc, rating) => acc + rating.rating, 0) / exercise.ratings.length;
                totalRating += exerciseRating;
                ratedExercisesCount += 1;
              }
            });

            const averageRating = ratedExercisesCount > 0 
              ? (totalRating / ratedExercisesCount).toFixed(1) 
              : 'N/A';

          // Calculate the total workout duration from the exercises' durations
          const totalDuration = workout.exercises.reduce((acc, exercise) => acc + exercise.duration, 0);

          // Calculate the total rpe from the exercises' rpes
          const totalRpe = workout.exercises.reduce((acc, exercise) => acc + exercise.rpe, 0);
          const averageRpe = (totalRpe / workout.exercises.length).toFixed(1);

          return (
            <div key={workout.workout_id} style={boxStyles}>
              <div style={tableStyles}>
                <div style={tableRowStyles}>
                  <div style={tableCellStyles}>{workout.date}</div>
                  <div style={tableCellStyles}>Rating: {averageRating}⭐</div>
                </div>
                <div style={tableRowStyles}>
                  <div style={tableCellStyles}>{workout.name}</div>
                  <div style={tableCellStyles}>RPE: {averageRpe}⚡</div>
                </div>
                <div style={tableRowStyles}>
                  <div style={tableCellStyles}>{workout.workoutType}</div>
                  <div style={tableCellStyles}></div>
                </div>
                <div style={tableRowStyles}>
                  <div style={tableCellStyles}>Duration: {totalDuration / 60} min 🕛</div>
                  <div style={tableCellStyles}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default PreviousWorkouts;
