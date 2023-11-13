import React, { useState, useEffect } from 'react';
import Workout from './workout';
import { getUser, updateWorkout, createWorkout } from '../utils/api';
import LocalizedStrings from 'react-localization';

//ei ole vielä toteutettu
const workoutList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const PlanBuilder = (props) => {

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
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            sunday: "Sunday",
            newWorkout: "NEW WORKOUT",
            workoutName: "Workout name",
            cancel: "Cancel",
            planbuilder: "PLAN BUILDER",
            new: "NEW",
            workout: "WORKOUT",


        },
        tr: {
            monday: "Pazartesi",
            tuesday: "Salı",
            wednesday: "Çarşamba",
            thursday: "Perşembe",
            friday: "Cuma",
            saturday: "Cumartesi",
            sunday: "Pazar",
            newWorkout: "YENİ ANTRENMAN",
            workoutName: "Antrenman adı",
            cancel: "İptal",
            planbuilder: "PLAN OLUŞTURUCU",
            new: "YENİ",
            workout: "ANTRENMAN",



        },
        ru: {
            monday: "Понедельник",
            tuesday: "Вторник",
            wednesday: "Среда",
            thursday: "Четверг",
            friday: "Пятница",
            saturday: "Суббота",
            sunday: "Воскресенье",
            newWorkout: "НОВАЯ ТРЕНИРОВКА",
            workoutName: "Название тренировки",
            cancel: "Отмена",
            planbuilder: "ПЛАНИРОВЩИК",
            new: "НОВАЯ",
            workout: "ТРЕНИРОВКА",
        }
    });
    if (selectedLanguage === 'tr') {
        strings.setLanguage('tr');
    } else if (selectedLanguage === 'en') {
        strings.setLanguage('en');
    } else {
        strings.setLanguage('ru');
    }

    const div = document.createElement('div');
    const ul = document.createElement('ul');
    div.appendChild(ul);

    const [isModalOpen, setModalOpen] = useState(false);

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
        margin: "auto",
        gap: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

    }

    const headingStyle = {
        color: '#1DAEFF',
        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.56)',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: 'normal',
    };

    const segment = {
        listStyle: "none",
        display: "inline-block",
    }

    const plannerBox = {
        minHeight: "1000px",
        minWidth: "500px",
        height: "100%",
        width: "100%",
        overflowY: "auto",
        margin: "auto",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",

    }

    const dateBox = {
        backgroundColor: "white",
        border: "1px solid black",
        textAlign: "center",
        fontSize: "30px",
        width: "210px",
        height: "50px",
    }

    const workoutBox = {
        display: "flex",
        backgroundColor: "white",
        border: "1px solid black",
        fontSize: "30px",
        width: "210px",
        height: "310px",
        alignItems: "center",
        justifyContent: "center",

    }

    const workoutField = {
        display: "flex",
        flexWrap: "nowrap",
        flex: "left",
        position: "absolute",
        margin: "0 auto",
        padding: "10px",
        gap: "10px",
        listStyle: "none",
        overflowX: "auto",
        overflowY: "hidden",
        width: "100%",
        height: "340px",
        backgroundColor: "#ffffff",
        bottom: "5px",

    }

    const newWorkout = {
        backgroundColor: "#404040",
        color: "#ffffff",
        padding: "20px",
        fontSize: "20px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        minWidth: "200px",
        height: "300px",
        alignItems: "center",

    }

    const calendar = {
        listStyle: "none",
        overflowX: "auto",
        whiteSpace: "nowrap",
        margin: "auto",
        with: "100%",
        display: "flex",
    }

    const createWorkoutLabel = (i, id, name = "Workout", exercises = [0, 1, 2, 3]) => {
        return React.createElement(
            'li',
            { draggable: true, onDragStart: drag, key: i, id: id, onDrop: dropWorkout, onDragOver: allowDrop, className: "draggableLabel" },
            <Workout name={name} exercises={exercises} />
        );
    }

    const createSegment = (date, i) => {
        let savedWorkout;
        for (const workout of data.workouts) {
            workout.date === date.format && (savedWorkout = createWorkoutLabel(i, workout.workout_id, workout.name, workout.exercises));
        }
        return (
            <li style={segment} id={"segment"} key={i}><div style={dateBox}>{date.day}</div><div style={workoutBox} onDragOver={(e) => allowDrop(e)} onDrop={(e) => dropToPlanner(e)} date={date.format}>{savedWorkout}</div></li>
        );
    }

    const getLabel = (target) => {
        let e = target;
        let parents = [];
        while (e.className !== "draggableLabel") {
            parents.unshift(e);
            e = e.parentElement;
        }
        return e;
    }

    const getSegmentList = () => {
        let segmentList = [];
        const currentDate = new Date();
        for (let i = 0; i < 21; i++) {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + i);
            segmentList[i] = newDate.getTime();
        }
        return segmentList;
    }

    const segmentList = getSegmentList();
    const week = [strings.monday, strings.tuesday, strings.wednesday, strings.thursday, strings.friday, strings.saturday, strings.sunday]
    const weekDays = segmentList.map((mills) => {
        const date = new Date(mills);
        return { day: week[date.getDay()], format: `${date.getFullYear()}-${date.getMonth() + 1}-${("" + date.getDate()).length < 2 ? "0" + date.getDate() : date.getDate()}` };
    });

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUser(localStorage.getItem("token"));
            const result = await response;
            setData(result);
            console.log(result.workouts)
        };

        fetchData();

    }, []);

    const allowDrop = (e) => {
        e.preventDefault();
    }

    const drag = (e) => {
        const target = e.target;
        console.log(target.id)
        e.dataTransfer.setData("text", target.id);
    }

    const dropToPlanner = (e) => {
        e.preventDefault();
        const data = document.getElementById(e.dataTransfer.getData("text"));
        const date = e.target.getAttribute('date');
        updateWorkout(data.getAttribute('id'), { date: date });
        e.target.children.length <= 0 && e.target.insertBefore(data, null);
    }

    const dropToList = (e) => {
        e.preventDefault();
        const data = document.getElementById(e.dataTransfer.getData("text"));
        const target = e.target;
        console.log(data.getAttribute('date'))
        updateWorkout(data.getAttribute('id'), { date: null });
        target.id === "workoutField" && target.insertBefore(data, target.childNodes[target.parentElement.children.length - 2]);
    }

    const dropWorkout = (e) => {
        e.preventDefault();
        const target = getLabel(e.target);
        const data = document.getElementById(e.dataTransfer.getData("text"));
        const dataParent = data.parentElement;
        (target.parentElement.id !== "workoutField" || dataParent.id !== "workoutField") && target.parentElement.insertBefore(data, target.parentElement.childNodes[target.parentElement.children.length - 1]);
        target.parentElement.id !== "workoutField" && dataParent.insertBefore(target, dataParent.childNodes[target.parentElement.children.length - 1]);
    }

    const createUserWorkout = (value) => {
        getUser(localStorage.getItem('token'))
            .then((data) => { createWorkout(value, null, data.user_id) });
    }

    const NewWorkoutModal = () => {
        return (
            <div style={modalStyle}>
                <div style={modalContent}>
                    <input
                        type="text"
                        placeholder={strings.workoutName}
                        style={{ color: "black" }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createUserWorkout(e.target.value);

                            }
                        }
                        }
                    />
                    <button onClick={closeModal}>{strings.cancel}</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "1280px", margin: "auto" }}>
            <h1 style={headingStyle}>{strings.planbuilder}</h1>
            <div style={plannerBox}>
                <ul style={calendar}>
                    {data?.workouts && weekDays.map((e, i) => createSegment(e, i))}
                </ul>
                <ul style={workoutField} onDragOver={(e) => allowDrop(e)} onDrop={(e) => dropToList(e)} id="workoutField">
                    {data?.workouts && data.workouts.map((workout, i) => !workout?.date && createWorkoutLabel(i, workout.workout_id, workout.name, workout.exercises))}
                    {isModalOpen && <NewWorkoutModal />}
                    <li style={newWorkout} onClick={openModal}>{strings.new} <br></br>{strings.workout}</li>
                </ul>

            </div>

        </div>
    );
}

export default PlanBuilder;
