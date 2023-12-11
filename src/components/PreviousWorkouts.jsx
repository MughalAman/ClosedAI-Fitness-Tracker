import { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';
import { getLanguage } from '../utils/api';

/**
 * Styles for the workout box.
 * @type {Object}
 */
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

/**
 * Styles for the table layout.
 * @type {Object}
 */
const tableStyles = {
  display: 'table',
  width: '100%',
};

/**
 * Styles for the table row.
 * @type {Object}
 */
const tableRowStyles = {
  display: 'table-row',
};

/**
 * Styles for the table cell.
 * @type {Object}
 */
const tableCellStyles = {
  display: 'table-cell',
  padding: '4px 8px',
  verticalAlign: 'top',
};

/**
 * Component for displaying previous workouts.
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.userData - User data including workouts.
 * @param {boolean} props.showAsColumn - Flag to display workouts in a column.
 * @returns {JSX.Element} JSX element representing the PreviousWorkouts component.
 */
function PreviousWorkouts(props) {

  /**
   * Destructuring props for userData and showAsColumn.
   * @type {Object}
   */
  const { userData, showAsColumn } = props;

  /**
   * State for the selected language.
   * @type {[string, function]}
   */
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

  /**
   * Handler for changing the selected language.
   * @function
   * @param {Object} event - The event object.
   */
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    localStorage.setItem('selectedLanguage', event.target.value);
  };

  /**
   * State for localized strings using the selected language.
   * @type {[Object, function]}
   */
  const [strings, setStrings] = useState(new LocalizedStrings(localizationData));


  useEffect(() => {
    /**
     * Fetch localized strings based on the selected language.
     * @function
     */
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

  /**
   * Render the PreviousWorkouts component.
   * @returns {JSX.Element} JSX element representing the PreviousWorkouts component.
   */
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{strings.previousWorkouts}</h2>
      <div style={{ display: 'flex', flexDirection: showAsColumn ? 'column' : 'row', gap: '1em', justifyContent: 'space-between' }}>
        {userData['workouts'].slice(0, 3).map((workout) => {
          // Calculate the total and average rating from the exercises' ratings
          let totalRating = 0;
          let ratedExercisesCount = 0;

          workout.exercises.forEach((exercise) => {
            if (exercise.ratings && exercise.ratings.length > 0) {
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
                  <div style={tableCellStyles}>{workout.dates[0]?.date}</div>
                  {/* <div style={tableCellStyles}>{strings.rating} {averageRating}⭐<div> */}
                </div>
                <div style={tableRowStyles}>
                  <div style={tableCellStyles}>{workout.name}</div>
                  <div style={tableCellStyles}>{strings.rpe} {averageRpe}⚡</div>
                </div>
                <div style={tableRowStyles}>
                  <div style={tableCellStyles}>{workout.workoutType}</div>
                  <div style={tableCellStyles}></div>
                </div>
                <div style={tableRowStyles}>
                  <div style={tableCellStyles}>{strings.duration} {totalDuration / 60} {strings.time} 🕛</div>
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
