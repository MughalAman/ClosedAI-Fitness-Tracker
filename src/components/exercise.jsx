import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';


const exercise = (props) => {



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
            close: "Close",
            exercisehistory: "Exercise history",
            sets: "Sets",
            reps: "Reps",
            weight: "Weight",
            RECENT: "RECENT",

         
        },
        tr: {
            close: "Kapat",
            exercisehistory: "Egzersiz geçmişi",
            sets: "Setler",
            reps: "Tekrarlar",
            weight: "Ağırlık",
            RECENT: "SON",


         
        },
          ru: {
            close: "Закрыть",
            exercisehistory: "История упражнений",
            sets: "Наборы",
            reps: "Повторы",
            weight: "Вес",
            RECENT: "ПОСЛЕДНИЕ",

           
          }
      });
      if (selectedLanguage === 'tr') {
          strings.setLanguage('tr');
        } else if (selectedLanguage === 'en') {
          strings.setLanguage('en');
        } else {
          strings.setLanguage('ru');
        }
  
  
  










    const exerciseStyle = {
        color: "white",
    }

    const modalStyle = {
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        zIndex: 1,
        left: 0, 
        top: 0,
        position: "fixed",
        fontSize: "32px",
        fontWeight: 300,
        fontFamily: "Inter",
    }

    const modalContent = {
        backgroundColor: "#0F0E0E",
        width: "100%",
        height: "100%",
        margin: "auto",

    }

    const history = {
        margin: "10px",
        float: "left",
    }

    const description = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "black",
        width: "100%",
        minHeight: "100px",
        overflowY: "auto",
        overflowX: "hidden",
        bottom: 0,
        left: 0,
        
    }

    const video = {
        margin: "10px",
        backgroundColor: "black",
        float: "right",
        width: "50%",
        minWidth: "300px",
        maxWidth: "1500px",
        aspectRatio: "16/9",

    }

    const exerciseName = {
        margin: "auto",
        top: "15px",
        textAlign: "center",
    }

    const topBar = {
        backgroundColor: "black",
        width: "100%",
        padding: "15px",
    }

    const closeButton = {
        position: "absolute",
        top: "15px",
        left: "15px",
    }

    const exerciseInfo = {
        display: "flex", 
        justifyContent: "space-between", 
        padding: "15px"
    }


    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
    };

    const Modal = () => {
        
    return (
            <div style={modalStyle}>
                <div style={modalContent}>
                    <div style={topBar}>
                        <h2 style={exerciseName}>{props.name}</h2>
                        <button onClick={closeModal} style={closeButton}>{strings.close}</button>
                    </div>
                  <div style={{padding: "20px"}}>
                  <div style={video}><iframe width="100%" height="100%" src={props.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe><div style={exerciseInfo}><p>{strings.sets}: {props.sets}</p><p>{strings.reps}: {props.reps}</p><p>{strings.weight}: {props.weight}</p></div></div>
                  <div style={history}>
                    <ul>
                        <p>{strings.exercisehistory}</p>
                        <li>{strings.RECENT}1</li>
                        <li>{strings.RECENT}2</li>
                        <li>{strings.RECENT}3</li>
                    </ul>
                  </div>
                  </div>
                  <div style={description}>{props.description}</div>
                </div>
            </div>
        );
    }

    return (
        <div style={exerciseStyle}>
            {isModalOpen && <Modal isOpen={isModalOpen} />}
            <button onClick={props.clickable ? openModal : ()=>{}}>{props.name}</button>
        </div>
    );
}

export default exercise;