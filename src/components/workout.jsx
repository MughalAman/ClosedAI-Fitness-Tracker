import React, { useState, useEffect, useRef } from 'react';
import Exercise from './exercise';
import Timer from './timer';
import ExerciseComplete from './ExerciseComplete';
import AddExercise from './addExercise';
import { getWorkout, cloneExercise, getLanguage } from '../utils/api';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';

/**
 * Functional component representing a workout.
 * @component
 * @param {Object} props - Component props.
 * @returns {JSX.Element} JSX element representing the Workout component.
 */
const Workout = (props) => {

    /**
     * State for the selected language.
     * @type {[string, function]}
     */
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

    /**
     * State for the localized strings.
     * @type {[LocalizedStrings, function]}
     */
    const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

    /**
     * useEffect hook to fetch data and set the selected language.
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

    /**
     * Set the language based on the selectedLanguage state.
     */
    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
    } else if (selectedLanguage === 'en') {
        strings.setLanguage('en');
    } else {
        strings.setLanguage('ru');
    }

    /**
     * State for controlling the modal visibility.
     * @type {[boolean, function]}
     */
    const [isModalOpen, setModalOpen] = useState(false);

    /**
     * State for controlling the new exercise modal visibility.
     * @type {[boolean, function]}
     */
    const [isNewExerciseModalOpen, setNewExerciseModal] = useState(false);

    /**
     * State for storing the total milliseconds of completed exercises.
     * @type {[number, function]}
     */
    const [getMills, setMills] = useState(0);

    /**
     * Function to open the main modal.
     */
    const openModal = () => {
        setModalOpen(true);
        props.setDraggable(false);
    };

    /**
     * Function to close the main modal.
     */
    const closeModal = () => {
        setModalOpen(false);
        setMills(0);
        props.setDraggable(true);
    };

    /**
     * Function to open the new exercise modal.
     */
    const openNewExerciseModal = () => {
        setNewExerciseModal(true);
    };

    /**
     * Function to close the new exercise modal.
     */
    const closeNewExerciseModal = () => {
        setNewExerciseModal(false);
        setTrigger(true);
    };

    /**
     * Style object for the main modal.
     * @type {Object}
     */
    const modalStyle = {
        backgroundColor: "black",
        color: "white",
        width: "100%",
        minWidth: "1100px",
        height: "100%",
        zIndex: 1,
        left: 0,
        top: 0,
        position: "fixed",
        fontSize: "2vw",
        fontWeight: 300,
        fontFamily: "Inter",
        draggable: false,
    }

    /**
     * Style object for the content inside the main modal.
     * @type {Object}
     */
    const modalContent = {
        backgroundColor: "#0F0E0E",
        width: "100%",
        height: "100%",
        minHeight: "80vh",
        margin: "auto",

    }

    /**
     * Style object for the top bar of the main modal.
     * @type {Object}
     */
    const topBar = {
        backgroundColor: "black",
        width: "100%",
        padding: "2vh",
        display: "flex",
        alignItems: "center",
    }

    /**
     * Style object for the workout name.
     * @type {Object}
     */
    const workoutName = {
        top: "15px",
        fontSize: "15px",
        position: "relative",
    }

    /**
     * Style object for the workout name inside the modal.
     * @type {Object}
     */
    const workoutModalName = {
        position: "relative",
        fontSize: "2vw",
    }

    /**
     * Style object for the search field in the main modal.
     * @type {Object}
     */
    const searchField = {
        color: "black",
        padding: "5px",
        fontFamily: "Inter",
    }

    /**
     * Style object for the list of exercises inside the main modal.
     * @type {Object}
     */
    const exerciseListStyle = {
        width: "50%",
        minWidth: "500px",
        overflow: "auto",
        margin: "auto",
    }

    /**
     * Style object for each list item in the main modal.
     * @type {Object}
     */
    const listItem = {
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr",
        width: "100%",
        fontFamily: "Inter",
    }

    /**
     * Style object for the workout label.
     * @type {Object}
     */
    const workoutLabel = {
        draggable: "false",
        backgroundColor: "#404040",
        color: "#ffffff",
        padding: "5px",
        fontSize: "12px",
        textAlign: "center",
        width: "200px",
        height: "300px",
        position: "relative",
        cursor: "pointer",
    }

    /**
     * Style object for the full workout text.
     * @type {Object}
     */
    const fullWorkoutText = {
        fontSize: "15px",
        position: "relative",
        top: "230px",
    }

    /**
     * Style object for the timer.
     * @type {Object}
     */
    const timerStyle = {
        float: "right",
        position: "relative",
        margin: "auto",
        width: "30%",
        padding: "2vh",
        minWidth: "30vw",
    }

    /**
         * State for storing the workout data.
         * @type {[Object, function]}
         */
    const [data, setData] = useState(null);

    /**
         * State for storing the exercise data.
         * @type {[Array, function]}
         */
    const [exerciseData, setExercises] = useState([]);

    /**
         * State for triggering updates.
         * @type {[boolean, function]}
         */
    const [update, setTrigger] = useState(false);

    /**
         * Function to fetch workout data.
         */
    const fetchData = async () => {
        const response = await getWorkout(props.id);
        //    \|/tänne se MAIN workoutin id, josta otetaan kaikki valmiit exerciset
        const exercises = await getWorkout(6).then((data) => { return data?.exercises.map((e, i) => React.createElement("option", { value: e.exercise_id, key: i }, e.name)) });
        setData(response);
        setExercises(exercises);
    };

    /**
         * useEffect hook to fetch data and trigger updates.
         */
    useEffect(() => {
        fetchData();
        setTrigger(false);
    }, [update]);

    /**
         * Ref for the workout component.
         */
    const workoutRef = useRef();

    /**
     * Function to get an exercise JSX element.
     * @param {number} e - Exercise ID.
     * @param {string} name - Exercise name.
     * @param {string} description - Exercise description.
     * @param {number} sets - Number of sets.
     * @param {number} reps - Number of reps.
     * @param {number} weight - Weight.
     * @param {string} url - Video URL.
     * @param {boolean} isClickable - Indicates whether the exercise is clickable.
     * @returns {JSX.Element} JSX element representing the exercise.
     */
    const getExercise = (e, name = "NAME", description = "DESCRIPTION", sets = 99, reps = 99, weight = 99, url = "https://www.youtube.com/embed/9t5G5XwDzmk?si=MfoSymK0c0m7corR", isClickable) => {
        return React.createElement(
            'li',
            { style: listItem, key: e },
            React.createElement('div', { style: { textAlign: "left" } }, <Exercise name={name} description={description} sets={sets} reps={reps} weight={weight} videoUrl={url} clickable={isClickable} />),
            <p style={{ textAlign: "center" }}>{sets}</p>,
            <p style={{ textAlign: "center" }}>{reps}</p>,
        );
    }

    /**
     * Function to handle exercise option selection.
     * @param {string|number} option - Selected exercise option.
     */
    const handleExerciseOption = (option) => {
        option === Math.floor(option) ? cloneExercise(option, props.id, data.user_id) : option === "new" && openNewExerciseModal();
    }

    /**
     * Modal component.
     * @returns {JSX.Element} JSX element representing the modal.
     */
    const Modal = () => {
        let i = -2;
        const names = data.exercises.map((exercise) => exercise.name);

        /**
             * Function to handle exercise completion.
             * @param {number} mills - Milliseconds.
             * @returns {string} Name of the completed exercise.
             */
        const exerciseDone = (mills) => {
            i++
            if (i >= names.length) setMills(getMills + mills);
            return names[i];
        };

        return (
            <>
                <div style={modalStyle}>
                    <div style={modalContent}>
                        <div style={topBar}>
                            <button onClick={closeModal} style={{ flex: 1, textAlign: "left" }}>{strings.close}</button>
                            <h2 style={{ ...workoutModalName, flex: 1, textAlign: "center" }}>{props.data.name}</h2>
                            <div style={{ flex: 1, textAlign: "right" }}>
                                <select style={{ ...searchField, fontFamily: 'Inter' }} id="nameOfExercise" name="nameOfExercise">
                                    <option style={{ fontFamily: 'Inter' }} value="default">{strings.addE}</option>
                                    {exerciseData}
                                    <option style={{ fontFamily: 'Inter' }} value="new">{strings.newExercise}</option>
                                </select>
                                <button onClick={(e) => { handleExerciseOption(e.target.parentElement.firstChild.options[e.target.parentElement.firstChild.selectedIndex].value) }}>{strings.add}</button>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                            <ul style={exerciseListStyle}>
                                <li style={listItem}><div style={{ textAlign: "left" }}>{strings.exercise}</div><div style={{ textAlign: "center" }}>{strings.sets}</div><div style={{ textAlign: "center" }}>{strings.reps}</div></li>
                                {data.exercises.map((exercise) => getExercise(exercise.exercise_id, exercise.name, exercise.description, exercise.set, exercise.repetition, exercise.weight, exercise.video_url, true))}
                            </ul>
                            <div style={timerStyle}>
                                {getMills > 0 && <ExerciseComplete mills={getMills} closeWorkout={(closeModal)} sets={"setsTotal"} reps={"repsTotal"} weight={"weightAvg"} rpe={"rpeAvg"} rating={"ratingAvg"} />}
                                <Timer nextExercise={exerciseDone} />
                                {isNewExerciseModalOpen && <AddExercise closeModal={closeNewExerciseModal} workoutId={props.id} userId={data.user_id} />}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div ref={workoutRef}>
            {isModalOpen && <Modal />}
            <div onClick={openModal} style={workoutLabel}>
                <h1 style={workoutName}>{data?.name}</h1>
                <ul style={{ width: "100%" }}>
                    <p style={fullWorkoutText}>{strings.seeworkout}</p>
                    <li style={listItem}><div style={{ textAlign: "left" }}>{strings.exercise}</div><div>{strings.sets}</div><div>{strings.reps}</div></li>
                    {data?.exercises.map((exercise, id) => getExercise(id, exercise.name, exercise.description, exercise.set, exercise.repetition, exercise.weight, exercise.video_url))}
                </ul>
            </div>
        </div>
    );
}
export default Workout;
