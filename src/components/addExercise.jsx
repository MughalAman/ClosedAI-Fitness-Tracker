import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import { createExercise } from '../utils/api';


function addExercise(props) {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

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
  } else if (selectedLanguage === 'ru') {
    strings.setLanguage('ru');
  } else {
    strings.setLanguage('en');
  }

  const containerStyle = {
    width: '1662px',
    height: '764px',
    border: '1px solid #000',
    padding: '20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', 
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
    width: '500px',
    height: '80px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#EAEAEA',
    margin: '9px 9px',

};

  const buttonStyle = {
    width: '500px',
    height: '80px',
    backgroundColor: '#1DAEFF',
    color: 'white',
    fontSize: '32px',
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
    userDrag: "none",
    draggable: "none"
  }

  const tagsStyle = {
    fontSize: "15px",
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    width: "1000px",
    margin: "auto"

  }

  const tagItem = {
    backgroundColor: 'black',
    border: 'none',
    borderRadius: '15px',
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "10px",
    paddingRight: "15px",
    margin: '2px 8px',
  }

  const tagsX = {
    margin: "auto",
    display: "inline-block",
    paddingRight: "8px",
    cursor: "pointer",
  }

  const handleDragStart = (event) => {
    event.preventDefault();
  };

  const handleAddExercise = () =>{
    const nameInput = document.getElementById('name');
    const setInput = document.getElementById('set');
    const repetitionInput = document.getElementById('repetition');
    const weightInput = document.getElementById('weight');
    const rpeInput = document.getElementById('rpe');
    const descriptionInput = document.getElementById('description');
    const urlInput = document.getElementById('url');

    const uncutUrl = urlInput.value;
    const startIndex = uncutUrl.indexOf("watch?v=");

    let video = "";
    if (startIndex !== -1) {
      const videoId = uncutUrl.substring(startIndex + "watch?v=".length);
      video = "https://www.youtube.com/embed/"+videoId;
    } else if(urlInput.value!=="") {
      alert("Invalid YouTube link");
    }

    console.log(video)

    switch("") {
      case nameInput.value: alert("Name cannot be empty");
        break;
      case setInput.value: alert("Sets cannot be empty");
        break;
      case repetitionInput.value: alert("Repetitions cannot be empty");
        break;
      case weightInput.value: alert("Weight cannot be empty");
        break;
      case rpeInput.value: alert("RPE cannot be empty"); 
        break;
      case descriptionInput.value: alert("Description cannot be empty");
        break;
      default: createExercise(nameInput.value, descriptionInput.value, video, props.userId, setInput.value, repetitionInput.value, 0, weightInput.value, rpeInput.value, props.workoutId, tags);
               props.closeModal();
    }
    
  }

  const [tags, setTags] = useState([]);

  const handleSubmit = () => {
    let tagsCopy = tags;
    const value = document.getElementById("tagInput").value;
    let ignore = false;
    if(value.trim() === "") {
      alert("Empty tag cannot be submitted");
      ignore = true;
    } else if(!/^[A-Za-z]+$/.test(value)) {
      alert("Tag can contain characters only");
      ignore = true;
    } 
    else {
      tagsCopy.forEach(tag=>tag === value && (alert("Tag already submitted"), ignore = true));
    }
    ignore || (tagsCopy[tagsCopy.length] = value.toLowerCase());
    setTags(tagsCopy);
    setTrigger(true);
  }

  const deleteTag = (tag) => {
    let tagsCopy = tags;
    tagsCopy = tagsCopy.filter(item => item !== tag);
    setTags(tagsCopy);
    setTrigger(true);
  }

  const createTag = (tag, key) => {
    return (
      <li style={tagItem} key={key}><p style={tagsX} onClick={(e)=>{e.stopPropagation(), deleteTag(tag)}}>x</p>{tag}</li>
    );
  }
  const [tagElements, setTagElements] = useState([]);
  const [update, setTrigger] = useState(false);

  useEffect(()=>{
    setTagElements(tags.map((tag, key)=>createTag(tag, key)));
    setTrigger(false)

  }, [update]);

  return (
    <div style={background} onDragStart={handleDragStart}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Add Exercise</h1>
        <div >
        <input style={listStyle} id='name' type="text" placeholder={strings.name} />
        <input style={listStyle} id='set' type="number" min="1" placeholder={strings.set} />
        <input style={listStyle} id='repetition' type="number" min="1" placeholder={strings.repetition} />
        <input style={listStyle} id='duration' type="number" min="1" placeholder={strings.duration} />
        <input style={listStyle} id='weight' type="number" min="1" placeholder={strings.weight} />
        <input style={listStyle} id='rpe' type="number" min="1" placeholder={strings.rpe} />
        <input style={{...listStyle, width: "47%"}} id='description' type="text" placeholder={strings.description} />
        <input style={{...listStyle, width: "47%"}} id='url' type="text" placeholder={strings.video_url} />
        </div>
        <div style={{display: "inline-block", flexDirection: "column"}}>
        <input style={listStyle} id="tagInput" type="text" placeholder="tags" />
        <button style={buttonStyle} type="text" onClick={handleSubmit}>Submit Tag</button>
        <ul style={tagsStyle}>
        {tagElements}
        </ul>
        </div>
          <button style={buttonStyle} onClick={handleAddExercise}>Add</button>
          <button style={{...buttonStyle, position: "absolute", right: "20px", bottom: "20px", width: "200px", backgroundColor: "red"}} onClick={e=>{e.preventDefault(), props.closeModal()}}>Cancel</button>
      </div>
    </div>
  );
}

export default addExercise;
