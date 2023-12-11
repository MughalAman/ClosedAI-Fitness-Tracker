import React, { useState, useEffect } from 'react';
import Workout from './workout';
import { getUser, createWorkout, createWorkoutDate, deleteWorkoutDate, getWorkout, getLanguage } from '../utils/api';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';

/**
 * PlanBuilder component for building and managing workout plans.
 * @module PlanBuilder
 * @component
 * @default
 */
const PlanBuilder = (props) => {

    /**
        * State for the selected language.
        * @type {[string, function]}
        */
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

    /**
   * Handler for changing the selected language.
   * @function
   * @param {Object} event - The event object.
   */
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

    /**
   * State for localized strings using the selected language.
   * @type {[Object, function]}
   */
    const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

    useEffect(() => {
        /**
        * Fetch localized strings based on the selected language.
        * @function
        */
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
        setDraggable(false);
    };

    const closeModal = () => {
        setModalOpen(false);
        setDraggable(true);
    };

    /**
       * Dynamic styles for the modal.
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
        fontSize: "32px",
        fontWeight: 300,
        fontFamily: "Inter",
    }

    /**
       * Dynamic styles for the modal content.
       * @type {Object}
       */
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

    /**
       * Dynamic styles for the heading.
       * @type {Object}
       */
    const headingStyle = {
        color: '#1DAEFF',
        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.56)',
        fontFamily: 'Inter',
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 900,
        lineHeight: 'normal',
        textAlign: "center"
    };

    const segment = {
        listStyle: "none",
        display: "inline-block",
    }

    const plannerBox = {
        minHeight: "90%",
        minWidth: "500px",
        height: "850px",
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
        margin: "auto",
        width: "100%",
        display: "flex",
    }

    const [isDraggable, setDraggable] = useState(true)

    const handleDragLogic = (e) => {
        isDraggable || e.preventDefault();
    }

    /**
       * Function to create a workout label for rendering.
       * @function
       * @param {number} i - Index of the label.
       * @param {Object} data - Workout data.
       * @returns {JSX.Element} JSX element representing the workout label.
       */
    const createWorkoutLabel = (props) => {
        return React.createElement(
            'div',
            { draggable: true, key: props.workout_id, id: props.workout_id, onDragOver: allowDrop, className: "draggableLabel", onDragStart: handleDragLogic},
            React.createElement(Workout, { data: props, id:props.workout_id, setDraggable: setDraggable })
        );
    }

   const createSegment = (date, i) => {
        let savedWorkout;
        for (const workout of data.workouts) {
            for (const dateObj of workout.dates) {
                dateObj.date === date.format && (savedWorkout = createWorkoutLabel(workout));
            }
        }
        return (
            <li style={segment} id={"segment"} key={i}><div style={dateBox}>{date.day}</div><div style={workoutBox} onDragOver={(e)=>allowDrop(e)} onDrop={(e)=>dropToPlanner(e)} onDragStart={drag} date={date.format}>{savedWorkout}</div></li>
        );
    }

    /**
       * Function to get a list of segments based on the current date.
       * @function
       * @returns {Array} List of segments.
       */
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
    const week = [strings.sunday, strings.monday, strings.tuesday, strings.wednesday, strings.thursday, strings.friday, strings.saturday];
    const weekDays = segmentList.map((mills)=>{
        const date = new Date(mills);
        return {day: week[date.getDay()], format: `${date.getFullYear()}-${date.getMonth()+1}-${(""+date.getDate()).length<2 ? "0"+date.getDate() : date.getDate()}`};
    });

    const [data, setData] = useState(null);
    const [workoutCreated, setTrigger] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const response = await getUser(localStorage.getItem("token"));
            const result = await response;
            setData(result);
        };

        fetchData();
        setTrigger(false);

    }, [workoutCreated]);

    const allowDrop = (e) => {
        e.preventDefault();
    }

    const drag = (e) => {
        const target = e.target;
        e.dataTransfer.setData("application/json", JSON.stringify({ "id": target.id, "parentDate": target?.parentElement?.getAttribute("date") }));
    }

    const dropToPlanner = (e) => {
        e.preventDefault();
        const obj = JSON.parse(e.dataTransfer.getData("application/json"));
        const workoutLabel = document.getElementById(obj.id);
        const clone = workoutLabel.cloneNode(true);
        const date = e.target.getAttribute('date');
        const concreteElement = document.querySelector(`[date="${obj.parentDate}"]`);
        createWorkoutDate(obj.id, date);
        e.target.children.length <= 0 && (e.target.appendChild(clone),
        obj.parentDate && (concreteElement.innerHTML="", getWorkout(obj.id).then(e=>e?.dates.forEach(e=>e.date===obj.parentDate && deleteWorkoutDate(e.id)))))
    }

    const dropToList = (e) => {
        e.preventDefault();
        const obj = JSON.parse(e.dataTransfer.getData("application/json"));
        getWorkout(obj.id).then(e=>e?.dates.forEach(e=>e.date===obj.parentDate && deleteWorkoutDate(e.id)))
        obj?.parentDate && (document.querySelector(`[date="${obj.parentDate}"]`).innerHTML="");
    }

    const createUserWorkout = (value) => {
        getUser(localStorage.getItem('token'))
            .then((data) => { createWorkout(value, [], data.user_id) });
    }

const NewWorkoutModal = () =>{
    const background = {
        minWidth: "100%",
        minHeight: "100%",
        position: "fixed",
        backgroundColor: "black",
        opacity: 0.99,
        top: 0,
        left: 0,
        userDrag: "none",
        draggable: "none",
        overflow: "hidden"
    }
      
    const containerStyle = {
        width: '1662px',
        height: '764px',
        border: '1px solid #000',
        padding: '20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#121212',
    };
    
    const titleStyle = {
        fontSize: '64px',
        fontWeight: 'bold',
        color: 'white',
    };

    const buttonStyle = {
        width: '750px',
        height: '175px',
        backgroundColor: '#1DAEFF',
        color: 'white',
        fontSize: '64px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: "15px"
    };

    const inputStyle = {
        color: 'black',
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '32px',
        width: '400px',
        height: '150px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#EAEAEA',
        margin: '9px 9px',
    };

    return (
        <div style={background}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>{strings.workoutName}</h1>
            <input
            type="text"
            placeholder={strings.workoutName}
            style={inputStyle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value!="") {
                createUserWorkout(e.target.value);
                closeModal();
                setTrigger(true);
              }
             }
            }
            />
            <button onClick={closeModal} style={buttonStyle}>{strings.cancel}</button>
            </div>
        </div>
    );
}

    /**
       * JSX representing the PlanBuilder component.
       * @returns {JSX.Element} JSX element representing the PlanBuilder component.
       */
return (
    <div style={{maxWidth: "1280px", margin: "auto", userSelect: "none", height: "100%"}}>
        <h1 style={headingStyle}>{strings.planbuilder}</h1>
        <div style={plannerBox}>
            <ul style={calendar}>
            {data?.workouts && weekDays.map((e, i) => createSegment(e, i))}
            </ul>
            <ul style={workoutField} onDragOver={allowDrop} onDrop={dropToList} onDragStart={drag} id="workoutField">
                {data?.workouts && data.workouts.map((workout) => createWorkoutLabel(workout))}
                {isModalOpen && <NewWorkoutModal />}
                <li style={newWorkout} onClick={openModal}>{strings.new}<br></br>{strings.workout}</li>
            </ul>
        </div>
        <p style={{textAlign: "center", color: "white", fontFamily: 'Inter', fontSize: "24px"}}><a href='/'>Return to the main page</a></p>
    </div>
);
}

export default PlanBuilder;
