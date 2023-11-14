import React, { useState, useEffect } from 'react';
import Exercise from './exercise';
import Timer from './timer';
import exercise from './exercise';
import ExerciseComplete from './ExerciseComplete';
import LocalizedStrings from 'react-localization';

//ei ole vielä toteutettu
const exerciseList = [1, 2, 3, 4, 5, 6];

const Workout = (props) => {
    
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
            seeworkout: "Click to see full workout",
            exercise: "Exercise",
            sets: "Sets",
            reps: "Reps",
            name: "NAME",
            close: "Close",
            add: "Add",
            addw: "Add workout",
            squat: "Squat",
            benchpress: "Bench Press",
            deadlift: "Deadlift",   
            pullups: "Pull-Ups",
            plank: "Plank",



        },
        tr: {

            seeworkout: "Tam antrenmanı görmek için tıklayın",
            exercise: "Egzersiz",
            sets: "Setler",
            reps: "Tekrarlar",
            name: "İSİM",
            close: "Kapat",
            add: "Ekle",
            addw: "Antrenman ekle",
            squat: "Çömelme",
            benchpress: "Bench Press",
            deadlift: "Deadlift",
            pullups: "Çekme",
            plank: "Plank",


        },
        ru: {
                
                seeworkout: "Нажмите, чтобы увидеть полную тренировку",
                exercise: "Упражнение",
                sets: "Подходы",
                reps: "Повторы",
                name: "ИМЯ",
                close: "Закрыть",
                add: "Добавить",
                addw: "Добавить тренировку",
                squat: "Приседания",
                benchpress: "Жим лежа",
                deadlift: "Становая тяга",
                pullups: "Подтягивания",
                plank: "Планка",
    
        }
    });
    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
    } else if (selectedLanguage === 'en') {
        strings.setLanguage('en');
    } else {
        strings.setLanguage('ru');
    }























    const [isModalOpen, setModalOpen] = useState(false);
    const [getMills, setMills] = useState(0);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

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
        fontSize: "32px",
        fontWeight: 300,
        fontFamily: "Inter",
    }

    const modalContent = {
        backgroundColor: "#0F0E0E",
        width: "100%",
        height: "100%",
        minHeight: "20000px",
        margin: "auto",

    }

    const topBar = {
        backgroundColor: "black",
        width: "100%",
        padding: "15px",
    }

    const workoutName = {
        top: "15px",
        fontSize: "15px",
        position: "relative",
    }

    const workoutModalName = {
        top: 0,
    }

    const closeButton = {
        position: "absolute",
        top: "15px",
        left: "1500px",
    }

    const searchField = {
        position: "absolute",
        top: "10px",
        right: "15px",
        color: "black",
        padding: "5px",
        fontFamily: "Inter",
    }

    const exerciseListStyle = {
        width: "50%",
        minWidth: "500px",
        overflow: "auto",
        margin: "auto",

    }

    const listItem = {
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr",
        width: "100%",
        fontFamily: "Inter",
    }

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

    const fullWorkoutText = {
        fontSize: "15px",
        position: "relative",
        top: "230px",
    }

    const timerStyle = {
        float: "right",
        position: "relative",
        margin: "auto",
        padding: "20px",
        width: "30%",
        minWidth: "600px",
    }

    const getExercise = (e, name = "NAME", description = "DESCRIPTION", sets = 99, reps = 99, weight = 99, url = "https://www.youtube.com/embed/9t5G5XwDzmk?si=MfoSymK0c0m7corR", isClickable) => {
        return React.createElement(
            'li',
            { style: listItem, key: e },
            React.createElement('div', { style: { textAlign: "left" } }, <Exercise name={name} description={description} sets={sets} reps={reps} weight={weight} videoUrl={url} clickable={isClickable} />),
            <p>{sets}</p>,
            <p>{reps}</p>,
        );
    }

    let i = -2;
    const names = props.exercises.map((exercise) => exercise.name);
    const exerciseDone = (mills) => {
        i++
        if (i >= names.length) setMills(mills);
        return names[i];
    };

    const Modal = () => {

        return (
            <div style={modalStyle}>
                <div style={modalContent}>
                    <div style={topBar}>
                        <h2 style={workoutModalName}>{strings.name}</h2>
                        <button onClick={closeModal} style={closeButton}>{strings.close}</button>
                        <label style={{ ...searchField, color: "white" }}>{strings.add}</label>
                        <select style={{ ...searchField, fontFamily: 'Inter' }} id="nameOfExercise" name="nameOfExercise">
                            <option value="default">{strings.addw}</option>
                            <option value="squat">{strings.squat}</option>
                            <option value="benchPress">{strings.benchpress}</option>
                            <option value="deadlift">{strings.deadlift}</option>
                            <option value="pullUps">{strings.pullups}</option>
                            <option value="plank">{strings.plank}</option>
                        </select>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <ul style={exerciseListStyle}>
                            <li style={listItem}><div style={{ textAlign: "left" }}>{strings.exercise}</div><div>{strings.sets}</div><div>{strings.reps}</div></li>
                            {props.exercises.map((exercise) => getExercise(exercise.id, exercise.name, exercise.description, exercise.sets, exercise.reps, exercise.weight, exercise.url, true))}
                        </ul>
                        <div style={timerStyle}>
                            {getMills > 0 && <ExerciseComplete mills={getMills} closeWorkout={(closeModal)} sets={"setsTotal"} reps={"repsTotal"} weight={"weightAvg"} rpe={"rpeAvg"} rating={"ratingAvg"} />}
                            <Timer nextExercise={exerciseDone} exerciseNames={props.exercises} name={"exerciseName"} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {isModalOpen && <Modal />}
            <div onClick={openModal} style={workoutLabel}>
                <h1 style={workoutName}>{props.name}</h1>
                <ul style={{ width: "100%" }}>
                    <p style={fullWorkoutText}>{strings.seeworkout}</p>
                    <li style={listItem}><div style={{ textAlign: "left" }}>{strings.exercise}</div><div>{strings.sets}</div><div>{strings.reps}</div></li>
                    {props.exercises.map((exercise, id) => getExercise(id, exercise.name, exercise.description, exercise.sets, exercise.reps, exercise.weight, exercise.url))}
                </ul>
            </div>
        </>
    );
}
export default Workout;