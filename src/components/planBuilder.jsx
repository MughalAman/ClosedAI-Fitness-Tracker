import React, {useState, useEffect} from 'react';
import Workout from './workout';
import { getUser, updateWorkout, createWorkout, createWorkoutDate, deleteWorkoutDate, getWorkout } from '../utils/api';
import LocalizedStrings from 'react-localization';
import localizationData from '../assets/localization.json';

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
    textAlign: "center"
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
    margin: "auto",
    width: "100%",
    display: "flex",
}

const createWorkoutLabel = (i, data) => {
    //console.log(data)
    return React.createElement(
        'div',
        { draggable: true, key: i, id: data.workout_id, onDrop: dropWorkout, onDragOver: allowDrop, className: "draggableLabel"},
        <Workout data={data} id={data.workout_id}/>
    );
}

const createSegment = (date, i)  => {
    let savedWorkout;
    for(const workout of data.workouts) {
        for(const dateObj of workout.dates) {
            dateObj.date === date.format && (savedWorkout=createWorkoutLabel(i, workout));
        }
    }
    return (
        <li style={segment} id={"segment"} key={i}><div style={dateBox}>{date.day}</div><div style={workoutBox} onDragOver={(e)=>allowDrop(e)} onDrop={(e)=>dropToPlanner(e)} onDragStart={drag} date={date.format}>{savedWorkout}</div></li>
    );
}

const getLabel = (target) => {
    let e = target;
    while(e.className !== "draggableLabel") {
        e = e.parentElement;
    } 
    return e;
}

const getSegmentList = () => {
    let segmentList = [];
    const currentDate = new Date();
    for(let i=0; i<21; i++) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate()+i);
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
    e.dataTransfer.setData("application/json", JSON.stringify({"id": target.id, "parentDate": target?.parentElement?.getAttribute("date")}));
}

const dropToPlanner = (e) => {
    e.preventDefault();
    const obj = JSON.parse(e.dataTransfer.getData("application/json"));
    const data = document.getElementById(obj.id);
    const date = e.target.getAttribute('date');
    const concreteElement = document.querySelector(`[date="${obj.parentDate}"]`);
    createWorkoutDate(obj.id, date);
    e.target.children.length <= 0 && (e.target.appendChild(data.cloneNode(true)),
    obj.parentDate && (concreteElement.innerHTML="", getWorkout(obj.id).then(e=>e?.dates.forEach(e=>e.date===obj.parentDate && deleteWorkoutDate(e.id)))))

}

const dropToList = (e) => {
    e.preventDefault();
    const obj = JSON.parse(e.dataTransfer.getData("application/json"));
    getWorkout(obj.id).then(e=>e?.dates.forEach(e=>e.date===obj.parentDate && deleteWorkoutDate(e.id)))
    obj?.parentDate && (document.querySelector(`[date="${obj.parentDate}"]`).innerHTML="");
}

//EI OLE VALMIS VIELÄ MUTTA EI NIIN TÄRKEÄ JOTEN VOI JÄTTÄÄ VIIMEISEKSI
const dropWorkout = (e) => {
    /*
    e.preventDefault();
    const target = getLabel(e.target);
    const obj = JSON.parse(e.dataTransfer.getData("application/json"));
    const data = document.getElementById(obj.id);
    console.log("target", target.parentElement);
    console.log("data", data);
    //target.parentElement?.getAttribute("date") && (
    //   setTimeout(data.parentElement.appendChild(target), 1000)
    //)
    //(target.parentElement.id !== "workoutField" || dataParent.id !== "workoutField") && target.parentElement.insertBefore(data, target.parentElement.childNodes[target.parentElement.children.length-1]);
    //target.parentElement.id !== "workoutField" && dataParent.insertBefore(target, dataParent.childNodes[target.parentElement.children.length-1]);
    */
}


const createUserWorkout = (value) => {
	getUser(localStorage.getItem('token'))
	.then((data)=>{createWorkout(value, [], data.user_id)});
}

const NewWorkoutModal = () =>{
    return (
        <div style={modalStyle}>
            <div style={modalContent}>
            <input
            type="text"
            placeholder={strings.workoutName}
            style={{color: "black"}}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value!="") {
                createUserWorkout(e.target.value);
                closeModal();
                setTrigger(true);
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
    <div style={{maxWidth: "1280px", margin: "auto"}}>
        <h1 style={headingStyle}>{strings.planbuilder}</h1>
        <div style={plannerBox}>
            <ul style={calendar}>
            {data?.workouts && weekDays.map((e, i) => createSegment(e, i))}
            </ul>
            <ul style={workoutField} onDragOver={(e)=>allowDrop(e)} onDrop={(e)=>dropToList(e)} onDragStart={drag}  id="workoutField">
                {data?.workouts && data.workouts.map((workout, i) => createWorkoutLabel(i, workout))}
                {isModalOpen && <NewWorkoutModal />}
                <li style={newWorkout} onClick={openModal}>{strings.new}<br></br>{strings.workout}</li>
            </ul>
        </div>
        <p style={{textAlign: "center", color: "white", fontFamily: 'Inter', fontSize: "24px"}}><a href='/'>Return to the main page</a></p>
    </div>
);
}

export default PlanBuilder;
