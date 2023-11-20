import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';


function addExercise(props) {
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
        name: "Name",
        description: "Description",
        video_url: "Video URL(YouTube)",
        set: "Sets",
        repetition: "Reps",
        duration: "Duration",
        weight: "Weight",
        rpe: "RPE",

       
     
    },
    tr: {
      
        name: "İsim",
        description: "Açıklama",
        video_url: "Video URL(YouTube)",
        set: "Setler",
        repetition: "Tekrarlar",
        duration: "Süre",
        weight: "Ağırlık",
        rpe: "RPE",

    },
    ru: {
        name: "Имя",
        description: "Описание",
        video_url: "Видео URL(YouTube)",
        set: "Наборы",
        repetition: "Повторы",
        duration: "Продолжительность",
        weight: "Вес",
        rpe: "RPE",

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
    width: '1662px',
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
    color: 'black',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '32px',
    width: '400px',
    height: '150px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#EAEAEA',
    margin: '9px 9px',

    

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
        <h1 style={titleStyle}>Add Exercise</h1>
        <div>
        <input style={listStyle} type="text" placeholder={strings.name} />
        <input style={listStyle} type="text" placeholder={strings.description} />
        <input style={listStyle} type="text" placeholder={strings.video_url} />
        <input style={listStyle} type="text" placeholder={strings.set} />
        <input style={listStyle} type="text" placeholder={strings.repetition} />
        <input style={listStyle} type="text" placeholder={strings.duration} />
        <input style={listStyle} type="text" placeholder={strings.weight} />
        <input style={listStyle} type="text" placeholder={strings.rpe} />
        
        </div>
      

        
        <button style={buttonStyle}>ADD</button>
      </div></div>
  );
}

export default addExercise;
