import React, { useState } from 'react';
import Exercise from './exercise';
import Workout from './workout';
import { getLanguage } from '../utils/api';

//ei ole vielä toteutettu
const exerciseList = [1, 2, 3, 4, 5, 6];

const suggestedWorkout = (props) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const modalStyle = {
        color: "white",
        width: "100%",
        height: "100%",
        zIndex: 1,
        left: 0,
        top: 0,
        position: "fixed",
        margin: "auto",
        fontSize: "32px",
        fontWeight: 300,
        fontFamily: "Inter",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
    }

    const modalContent = {
        backgroundColor: "#0F0E0E",
        width: "auto",
        maxWidth: "90%",
        height: "330px",
        margin: "auto",
        display: "flex",
        justifyContent: "space-evenly",
        gap: "15px",
        padding: "15px",
    }

    const skip = {
        position: "relative",
        alignSelf: "end",
        padding: "15px",
    }

    const modalBackground = {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.7,
        zIndex: -1,
    }


    const Modal = () => {
        //max 5 workouttia
        return (
            <div style={modalStyle}>
                <div style={modalBackground}></div>
                <div style={modalContent}>
                    <Workout name={"Workout"} />
                    <Workout name={"Workout"} />
                    <Workout name={"Workout"} />
                    <Workout name={"Workout"} />
                    <Workout name={"Workout"} />
                </div>
                <button onClick={closeModal} style={skip}>skip</button>
            </div>
        );
    }

    return (
        <>
            <button onClick={openModal} style={{ color: "white" }}>Click for cookie</button>
            {isModalOpen && <Modal />}
        </>
    );
}
export default suggestedWorkout;