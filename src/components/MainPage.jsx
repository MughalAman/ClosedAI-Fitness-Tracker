import React from 'react';
import Navbar from './Navbar';
import PreviousWorkouts from './PreviousWorkouts';

const parentContainerStyles = {
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const rootStyles = {
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
};

const friendActivityStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '398px',
  height: '668px',
  backgroundColor: '#404040',
  borderRadius: '4px',
  marginTop: '16px',
  textAlign: 'left',
};

const activityItemStyles = {
  display: 'flex',
  alignItems: 'left',
  marginBottom: '12px',
  backgroundColor: '#0F0E0E',
  color: 'white',
  textAlign: 'left',
  padding: '8px',
};

const titleStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '16px',
  textAlign: 'left',
  marginLeft: '12px',
};

const profilePictureStyles = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  cursor: 'pointer',
  marginRight: '4px',
};

const friendNameStyles = {
  fontWeight: 'bold',
  fontSize: '24px',
};

const rightContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 'auto',
};

const currentStreakStyles = {
  fontSize: '30px',
  fontWeight: 'bold',
  marginBottom: '16px',
  color: 'white',
};

const workoutStyles = {
  width: '478px',
  height: '619px',
  backgroundColor: '#404040',
  borderRadius: '4px',
  padding: '16px',
  color: 'white',
  textAlign: 'left',
  fontSize: '30px',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
};

const workoutTitleStyles = {
  color: 'white',
  textAlign: 'center',
  marginBottom: '12px',
  fontSize: '30px',
};

const exerciseListStyles = {
  marginBottom: '12px',
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
  padding: '8px',
};

const workoutLinkStyles = {
  textDecoration: 'underline',
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: 'auto', // Push "Click to see" to the bottom
};

const buttonStyles = {
  width: '478px',
  height: '162px',
  backgroundColor: 'white',
  borderRadius: '4px',
  fontSize: '32px',
  fontWeight: 'bold',
  textDecoration: 'underline',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'absolute', // Set the position to absolute
  bottom: '0px', // Adjust the distance from the bottom
  right: '0px', // Adjust the distance from the right
};

const sectionStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between', // Add this line to align items to the right
};

// Dataset for your workouts
const myWorkouts = [
  {
    id: 1,
    type: 'Push Pull Legs',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10' },
      { name: 'Incline Press', sets: 4, reps: '8-10' },
      { name: 'Dumbbell Fly', sets: 4, reps: '8-10' },
      { name: 'Peck Deck', sets: 4, reps: '8-10' },
      { name: 'Lying Extension', sets: 4, reps: '8-10' },
      { name: 'Rope Pushdown', sets: 4, reps: '8-10' },
    ],
  },
  // Add more workouts here
];

function MainPage() {
  const friendActivities = [
    {
      id: 1,
      profilePicture: '../screenshot-202309051321371.png',
      name: 'Friend 1',
      workoutName: 'Morning Jog',
      workoutType: 'Running',
      rating: 4.5,
      duration: '30 mins',
      rpe: 6,
    },
    // Add more friend activities here
  ];

  return (
    <div style={parentContainerStyles}>
      <Navbar />
      <div style={rootStyles}>
        <div style={friendActivityStyles}>
          <h2 style={titleStyles}>Friend Activity</h2>
          {friendActivities.map((activity) => (
            <div key={activity.id} style={activityItemStyles}>
              <a href="#">
                <img
                  src={activity.profilePicture}
                  alt={`${activity.name}'s profile`}
                  style={profilePictureStyles}
                />
              </a>
              <div>
                <p style={friendNameStyles}>{activity.name}</p>
                <p>{activity.workoutName}</p>
                <p>{activity.workoutType}</p>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <p>Rating: {activity.rating}⭐</p>
                <p>Duration: {activity.duration}🕛</p>
                <p>RPE: {activity.rpe}⚡</p>
              </div>
            </div>
          ))}
        </div>
        <div style={rightContainerStyles}>
          <div style={currentStreakStyles}>Current streak: 5🔥</div>
          <div style={workoutStyles}>
            <div style={workoutTitleStyles}>My workout</div>
            <div style={exerciseListStyles}>
              {myWorkouts.map((workout) => (
                <div key={workout.id}>
                  <p>Type: {workout.type}</p>
                  <div style={tableStyles}>
                    <div style={tableRowStyles}>
                      <div style={tableCellStyles}>Exercise:</div>
                      <div style={tableCellStyles}>Sets</div>
                      <div style={tableCellStyles}>Reps</div>
                    </div>
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} style={tableRowStyles}>
                        <div style={tableCellStyles}>{exercise.name}</div>
                        <div style={tableCellStyles}>{exercise.sets}</div>
                        <div style={tableCellStyles}>{exercise.reps}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={workoutLinkStyles}>
              <a href="#">Click to see</a>
            </div>
          </div>
        </div>
      </div>
      <div style={sectionStyles}>
        <PreviousWorkouts />
        <div style={buttonStyles}>
          <a href="#">Go to plan builder</a>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
