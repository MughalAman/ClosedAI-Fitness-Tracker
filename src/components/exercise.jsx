import React, {useState} from 'react';

const exercise = (props) => {

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
                        <button onClick={closeModal} style={closeButton}>Close</button>
                    </div>
                  <div style={{padding: "20px"}}>
                  <div style={video}><iframe width="100%" height="100%" src={props.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe><div style={exerciseInfo}><p>Sets: {props.sets}</p><p>Reps: {props.reps}</p><p>Weight: {props.weight}</p></div></div>
                  <div style={history}>
                    <ul>
                        <p>Exercise history</p>
                        <li>RECENT1</li>
                        <li>RECENT2</li>
                        <li>RECENT3</li>
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