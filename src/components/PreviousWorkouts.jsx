import { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';


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
  const { userData, showAsColumn } = props;

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    localStorage.setItem('selectedLanguage', event.target.value);
  };
  useEffect(() => {
    const storedSelectedLanguage = localStorage.getItem('selectedLanguage');

    if (!storedSelectedLanguage) {
      fetch('/api/language')
        .then(response => response.json())
        .then(data => {
          const selectedLanguage = data.language;
          setSelectedLanguage(selectedLanguage);
          localStorage.setItem('selectedLanguage', selectedLanguage);
        });
    } else {
      setSelectedLanguage(storedSelectedLanguage);
    }
  }, []);

  


  const strings = new LocalizedStrings({
    en: {
      previousWorkouts: 'Previous Workouts',
      date: 'Date',
      rating: 'Rating',
      rpe: 'RPE',
      duration: 'Duration',
      time: 'mins',
    },
    tr: {
      previousWorkouts: 'Önceki Antrenmanlar',
      date: 'Tarih',
      rating: 'Değerlendirme',
      rpe: 'RPE',
      duration: 'Süre',
      time: 'dakika',
    },
    ru: {
      previousWorkouts: 'Предыдущие тренировки',
      date: 'Дата',
      rating: 'Рейтинг',
      rpe: 'RPE',
      duration: 'Продолжительность',
      time: 'минут',
    }
  });

  if (selectedLanguage === 'tr') {
    strings.setLanguage('tr');
  } else if (selectedLanguage === 'en') {
    strings.setLanguage('en');
  } else {
    strings.setLanguage('ru');
  }
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{strings.previousWorkouts}</h2>
      <div style={{ display: 'flex', flexDirection: showAsColumn ? 'column': 'row', gap: '1em', justifyContent: 'space-between' }}>
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
                  <div style={tableCellStyles}>{workout.date}</div>
                  <div style={tableCellStyles}>{strings.rating} {averageRating}⭐</div>
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
