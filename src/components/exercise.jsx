import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';
import { getLanguage, deleteExercise, getUser } from '../utils/api';

/**
 * React component for displaying exercise information and details in a modal.
 * @module Exercise
 * @param {Object} props - React component props.
 * @param {string} props.name - Exercise name.
 * @param {string} props.videoUrl - URL of the exercise video.
 * @param {number} props.sets - Number of sets for the exercise.
 * @param {number} props.reps - Number of repetitions for the exercise.
 * @param {string} props.weight - Weight used for the exercise.
 * @param {string} props.description - Description of the exercise.
 * @param {boolean} props.clickable - Flag indicating whether the exercise is clickable.
 * @returns {JSX.Element} JSX element representing the Exercise component.
 */
const exercise = (props) => {
    /**
     * State for the selected language and localized strings.
     * @type {[string, function]}
     */
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
    const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

    /**
       * Fetches data based on the selected language.
       * @async
       * @function
       */
    useEffect(() => {
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

    // Set the language based on the selectedLanguage state
    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
    } else if (selectedLanguage === 'en') {
        strings.setLanguage('en');
    } else {
        strings.setLanguage('ru');
    }

    /**
     * Styles for the exercise component.
     * @type {Object}
     */
    const exerciseStyle = {
        color: "white",
    }

    /**
     * Styles for the modal.
     * @type {Object}
     */
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

    /**
     * Styles for the modal content.
     * @type {Object}
     */
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

    /**
     * State for controlling the modal's open/closed state.
     * @type {[boolean, function]}
     */
    const [isModalOpen, setModalOpen] = useState(false);
    const [historyData, setHistoryData] = useState("");

    /**
     * Opens the modal.
     * @function
     */
    const openModal = () => {
        getHistory();
        setModalOpen(true);
    };

    /**
     * Closes the modal.
     * @function
     */
    const closeModal = () => {
        setModalOpen(false);
    };

    const getHistory = () => {
        let historyList = [];
        getUser(localStorage.getItem("token")).then(userData => {
            for(const workout in userData.workouts) {
                for(const exercise in workout.exercises) {
                     if(exercise.name === props.name) {
                         workout.dates.forEach(e=> e.completed && (
                             historyList.push(<li><p>In {workout.name}</p><br /><p>On the date {e.date}</p></li>)
                         ));
                     }
                } 
            }
            setHistoryData(historyList.length>0 ? historyList : <p>No history yet</p>)
        });
    }


    /**
     * Modal component for displaying detailed exercise information.
     * @returns {JSX.Element} JSX element representing the Modal component.
     */
    const Modal = () => {
        return (
          <div style={modalStyle}>
                <div style={modalContent}>
                    <div style={topBar}>
                        <h2 style={exerciseName}>{props.name}</h2>
                        <button onClick={closeModal} style={closeButton}>{strings.close}</button>
                        <button onClick={()=>{closeModal(), deleteExercise(props.id), props.setTrigger(true)}} style={deleteButton}>Delete Exercise</button>
                    </div>
                    <div style={{ padding: "20px" }}>
                        <div style={video}><iframe width="100%" height="100%" src={props.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe><div style={exerciseInfo}><p>{strings.sets}: {props.sets}</p><p>{strings.reps}: {props.reps}</p><p>{strings.weight}: {props.weight}</p></div></div>
                        <div style={history}>
                            <ul>
                                <p>{strings.exercisehistory}</p>
                                {historyData}
                            </ul>
                        </div>
                    </div>
                    <div style={description}>{props.description}</div>
                </div>
            </div>
        );
    }

    /**
     * JSX representing the Exercise component.
     * @returns {JSX.Element} JSX element representing the Exercise component.
     */
    return (
        <div style={exerciseStyle}>
            {isModalOpen && <Modal isOpen={isModalOpen} />}
            <button onClick={props.clickable && openModal}>{props.name}</button>
        </div>
    );
}

export default exercise;
