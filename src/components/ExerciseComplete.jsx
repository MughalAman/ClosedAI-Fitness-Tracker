import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';


function ExerciseComplete(props) {



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


     let strings = new LocalizedStrings({
      en: {
        ExerciseComplete: "Exercise Complete!",
        Duration: "Duration",
        Sets: "Sets",
        Reps: "Reps",
        Weight: "Weight",
        RPE: "RPE",
        Rating: "Rating",
        Save: "SAVE",
        min: "min",
      },
      tr: {
        ExerciseComplete: "Egzersiz Tamamlandı!",
        Duration: "Süre",
        Sets: "Setler",
        Reps: "Tekrarlar",
        Weight: "Ağırlık",
        RPE: "RPE",
        Rating: "Değerlendirme",
        Save: "KAYDET",
        min: "dakika",
       
      },
        ru: {
          ExerciseComplete: "Упражнение завершено!",
          Duration: "Продолжительность",
          Sets: "Наборы",
          Reps: "Повторы",
          Weight: "Вес",
          RPE: "RPE",
          Rating: "Рейтинг",
          Save: "СОХРАНИТЬ",
          min: "минут",
         
        }
    });
    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
      } else if (selectedLanguage === 'en') {
        strings.setLanguage('en');
      } else {
        strings.setLanguage('ru');
      }




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

  const background = {
    minWidth: "100%", 
    minHeight: "100%", 
    position: "fixed",
    backgroundColor: "black",
    opacity: 0.99,
    top: 0,
    left: 0,
}

  return (
    <div style={background}>
    <div style={containerStyle}>
      <h1 style={titleStyle}>{strings.ExerciseComplete}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ul style={listStyle}>
          <li>{strings.Duration} {Math.floor(props.mills/1000/60)} {strings.min}</li>
          <li>{strings.Sets}  {props.sets}</li>
          <li>{strings.Reps} {props.reps}</li>
          <li>{strings.Weight} {props.weight}</li>
        </ul>
        <ul style={listStyle}>
          <li>{strings.RPE}  {props.rpe}</li>
          <li>{stringsr.rating}{props.rating}⭐</li>
        </ul>
      </div>
      <button style={buttonStyle} onClick={props.closeWorkout}>SAVE</button>
    </div></div>
  );
}

export default ExerciseComplete;