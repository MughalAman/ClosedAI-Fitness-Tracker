import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';


const exercise = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
    const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

  useEffect(() => {
    async function fetchData() {
        const lang = await getLanguage(); // Call the getLanguage function
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
                    <div style={{ padding: "20px" }}>
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
            <button onClick={props.clickable && openModal}>{props.name}</button>
        </div>
    );
}

export default exercise;
