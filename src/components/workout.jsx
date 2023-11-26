import React, { useState, useEffect, useRef } from 'react';
import Exercise from './exercise';
import Timer from './timer';
import ExerciseComplete from './ExerciseComplete';
import AddExercise from './addExercise';
import { getWorkout, cloneExercise } from '../utils/api';
import LocalizedStrings from 'react-localization';

const Workout = (props) => {
    
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

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
    const [isNewExerciseModalOpen, setNewExerciseModal] = useState(false);
    const [getMills, setMills] = useState(0);

    const openModal = () => {
        setModalOpen(true);
        props.setDraggable(false);
    };
    
      const closeModal = () => {
        setModalOpen(false);
        setMills(0);
        props.setDraggable(true);
    };

    const openNewExerciseModal = () => {
        setNewExerciseModal(true);
    };
    
    const closeNewExerciseModal = () => {
        setNewExerciseModal(false);
        setTrigger(true);
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
        draggable: false,
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
        display: "flex",
        alignItems: "center",
    }

    const workoutName = {
        top: "15px",
        fontSize: "15px",
        position: "relative",
    }

    const workoutModalName = {
        position: "relative",
    }


    const searchField = {
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

const [data, setData] = useState(null);
const [exerciseData, setExercises] = useState([]);
const [update, setTrigger] = useState(false);

const fetchData = async () => {
    const response = await getWorkout(props.id);
                                //    \|/tänne se MAIN workoutin id, josta otetaan kaikki valmiit exerciset
    const exercises = await getWorkout(6).then((data)=>{return data?.exercises.map((e, i)=> React.createElement("option", {value: e.exercise_id, key: i}, e.name))});
    setData(response);
    setExercises(exercises);
};

useEffect(() => {
  fetchData(); 
  setTrigger(false);
}, [update]);

const workoutRef = useRef();

    const getExercise = (e, name="NAME", description="DESCRIPTION", sets=99, reps=99, weight=99, url="https://www.youtube.com/embed/9t5G5XwDzmk?si=MfoSymK0c0m7corR", isClickable) => {
        return React.createElement(
            'li',
            { style: listItem, key: e},
            React.createElement('div', {style: {textAlign: "left"}}, <Exercise name={name} description={description} sets={sets} reps={reps} weight={weight} videoUrl={url} clickable={isClickable} />),
            <p style={{textAlign: "center"}}>{sets}</p>,
            <p style={{textAlign: "center"}}>{reps}</p>,
        );
    }

    const handleExerciseOption = (option) => {
        option === Math.floor(option) ? cloneExercise(option, props.id, data.user_id) : option === "new" && openNewExerciseModal();
    }

    const Modal = () => {
    let i=-2;
    const names = data.exercises.map((exercise)=>exercise.name);
    const exerciseDone = (mills) => {
        i++
        if(i>=names.length) setMills(getMills+mills);
        return names[i];
    };

    return (
        <>
            <div style={modalStyle}>
                <div style={modalContent}>
                    <div style={topBar}>
                        <button onClick={closeModal} style={{flex: 1, textAlign: "left"}}>{strings.close}</button>
                        <h2 style={{...workoutModalName, flex: 1, textAlign: "center"}}>{props.data.name}</h2>
                        <div style={{flex: 1, textAlign: "right"}}>
                            <select style={{ ...searchField, fontFamily: 'Inter'}} id="nameOfExercise" name="nameOfExercise">
                                <option value="default">{strings.addw}</option>
                                {exerciseData}
                                <option value="squat">{strings.squat}</option>
                                <option value="benchPress">{strings.benchpress}</option>
                                <option value="deadlift">{strings.deadlift}</option>
                                <option value="pullUps">{strings.pullups}</option>
                                <option value="plank">{strings.plank}</option>
                                <option value="new">New Exercise</option>
                            </select>
                            <button onClick={(e)=>{handleExerciseOption(e.target.parentElement.firstChild.options[e.target.parentElement.firstChild.selectedIndex].value)}}>{strings.add}</button>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                    <ul style={exerciseListStyle}>
                        <li style={listItem}><div style={{textAlign: "left"}}>{strings.exercise}</div><div style={{textAlign: "center"}}>{strings.sets}</div><div style={{textAlign: "center"}}>{strings.reps}</div></li>
                        {data.exercises.map((exercise)=>getExercise(exercise.exercise_id, exercise.name, exercise.description, exercise.set, exercise.repetition, exercise.weight, exercise.video_url, true))}
                    </ul>
                        <div style={timerStyle}>
                            {getMills>0 && <ExerciseComplete mills={getMills} closeWorkout={(closeModal)} sets={"setsTotal"} reps={"repsTotal"} weight={"weightAvg"} rpe={"rpeAvg"} rating={"ratingAvg"} />}
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
        <ul style={{width: "100%"}}>
        <p style={fullWorkoutText}>Click to see full workout</p>
            <li style={listItem}><div style={{textAlign: "left"}}>Exercise</div><div>Sets</div><div>Reps</div></li>
            {data?.exercises.map((exercise, id)=>getExercise(id, exercise.name, exercise.description, exercise.set, exercise.repetition, exercise.weight, exercise.video_url))}
        </ul>
        </div>
    </div>
);
}
export default Workout;
