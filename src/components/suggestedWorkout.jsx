import React, { useState } from 'react';
import Exercise from './exercise';
import Workout from './workout';

/**
 * Component for displaying a suggested workout.
 * @component
 * @param {Object} props - Component props.
 * @returns {JSX.Element} JSX element representing the suggestedWorkout component.
 */
const suggestedWorkout = (props) => {

    /**
     * State for controlling the visibility of the modal.
     * @type {[boolean, function]}
     */
    const [isModalOpen, setModalOpen] = useState(false);

    /**
     * Function to open the modal.
     * @function
     */
    const openModal = () => {
        setModalOpen(true);
    };

    /**
     * Function to close the modal.
     * @function
     */
    const closeModal = () => {
        setModalOpen(false);
    };

    /**
     * Styles for the modal.
     * @type {Object}
     */
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

    /**
     * Styles for the modal content.
     * @type {Object}
     */
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

    /**
     * Styles for the skip button.
     * @type {Object}
     */
    const skip = {
        position: "relative",
        alignSelf: "end",
        padding: "15px",
    }

    /**
     * Styles for the modal background.
     * @type {Object}
     */
    const modalBackground = {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.7,
        zIndex: -1,
    }

    /**
     * Modal component to display suggested workouts.
     * @component
     * @returns {JSX.Element} JSX element representing the Modal component.
     */
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