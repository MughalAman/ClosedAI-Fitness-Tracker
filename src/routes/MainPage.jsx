import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import Navbar from '../components/Navbar';
import PreviousWorkouts from '../components/PreviousWorkouts';
import Workout from '../components/workout';
import {getUserFriendships, getUserFromUserId, getExerciseRating} from '../utils/api';





const parentContainerStyles = {
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const rootStyles = {
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
};

const friendActivityStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '398px',
  height: '668px',
  backgroundColor: '#404040',
  borderRadius: '4px',
  marginTop: '16px',
  textAlign: 'left',
};

const activityItemStyles = {
  display: 'flex',
  alignItems: 'left',
  marginBottom: '12px',
  backgroundColor: '#0F0E0E',
  color: 'white',
  textAlign: 'left',
  padding: '8px',
};

const titleStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '16px',
  textAlign: 'left',
  marginLeft: '12px',
};

const profilePictureStyles = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  cursor: 'pointer',
  marginRight: '4px',
};

const friendNameStyles = {
  fontWeight: 'bold',
  fontSize: '24px',
};

const rightContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 'auto',
};

const currentStreakStyles = {
  fontSize: '30px',
  fontWeight: 'bold',
  marginBottom: '16px',
  color: 'white',
};

const workoutStyles = {
  width: '478px',
  height: '619px',
  backgroundColor: '#404040',
  borderRadius: '4px',
  padding: '16px',
  color: 'white',
  textAlign: 'left',
  fontSize: '30px',
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
};

const workoutTitleStyles = {
  color: 'white',
  textAlign: 'center',
  marginBottom: '12px',
  fontSize: '30px',
};

const exerciseListStyles = {
  marginBottom: '12px',
};

const tableStyles = {
  display: 'table',
  width: '100%',
};

const tableRowStyles = {
  display: 'table-row',
};

const tableCellStyles = {
  display: 'table-cell',
  padding: '8px',
};

const workoutLinkStyles = {
  textDecoration: 'underline',
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: 'auto', // Push "Click to see" to the bottom
};

const buttonStyles = {
  width: '478px',
  height: '162px',
  backgroundColor: 'white',
  borderRadius: '4px',
  fontSize: '32px',
  fontWeight: 'bold',
  textDecoration: 'underline',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'absolute', // Set the position to absolute
  bottom: '0px', // Adjust the distance from the bottom
  right: '0px', // Adjust the distance from the right
};

const sectionStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between', // Add this line to align items to the right
};

const getRatingForExercise = async (exercise_id) => {
  let rating = await getExerciseRating(exercise_id);
  return rating;
}









function MainPage(props) {

  const {userData} = props;

  const [userFriends, setUserFriends] = useState([]);


  

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');

  useEffect(() => {
    async function fetchData() {
      const lang = await getLanguage(); // Call the getLanguage function
      setSelectedLanguage(lang); // Set the selected language based on the result
    }

    fetchData();
  }, []);


  console.log(userData);


    let strings = new LocalizedStrings({
      en: {
        mainPageTitle: "Main Page",
        friendActivity: "Friend Activity",
        currentStreak: "Current Streak: ",
        previousWorkouts: "Previous Workouts",
        goToPlanBuilder: "Go to plan builder",
        rating: "Rating: ",
        duration: "Duration: ",
        rpe: "RPE: ",
        clickToSee: "Click to see",
        search: "Search",
        addFriend: "Add Friend",
      },
      tr: {
        mainPageTitle: "Ana Sayfa",
        friendActivity: "Arkadaş Etkinliği",
        currentStreak: "Geçerli Seri: ",
        previousWorkouts: "Önceki Antrenmanlar",
        goToPlanBuilder: "Plan oluşturmaya git",
        rating: "Derecelendirme: ",
        duration: "Süre: ",
        rpe: "RPE: ",
        clickToSee: "Görmek için tıklayın",
        search: "Arama",
        addFriend: "Arkadaş Ekle",

      },
        ru: {
          mainPageTitle: "Главная страница",
          friendActivity: "Деятельность друга",
          currentStreak: "Текущая серия: ",
          previousWorkouts: "Предыдущие тренировки",
          goToPlanBuilder: "Перейти к построителю плана",
          rating: "Рейтинг: ",
          duration: "Продолжительность: ",
          rpe: "RPE: ",
          clickToSee: "Нажмите, чтобы увидеть",
          search: "Поиск",
          addFriend: "Добавить друга",
        }
    });
    if (selectedLanguage === 'tr') {
      strings.setLanguage('tr');
    } else if (selectedLanguage === 'en') {
      strings.setLanguage('en');
    } else {
      strings.setLanguage('ru');
    }



  useEffect(() => {
    const fetchData = async () => {
      

      if(localStorage.getItem('showExtraQuestions') === 'true'){
        window.location.href = '/trainingexperience';
      }

      // Get the user's friends
      let friends = await getUserFriendships(userData.user_id);

      // Get the user data for each friend
      let friendsData = [];

      for (let i = 0; i < friends.length; i++) {
        // Check if the user_id is the same as the user_id in the friendship
        if (friends[i].user_id === userData.user_id) {
          // Get the friend's data
          let friendData = await getUserFromUserId(friends[i].friend_id);
          friendsData.push(friendData);
        }else if (friends[i].friend_id === userData.user_id) {
          // Get the friend's data
          let friendData = await getUserFromUserId(friends[i].user_id);
          friendsData.push(friendData);
        }
      }

      setUserFriends(friendsData);
      console.log('Friends:', friendsData);
    }

    fetchData();
  }, [userData]);



  async function getLanguage() {
    const token = localStorage.getItem('token');
  
    if (token) {
      const response = await getUser(token);
  
      if (response && response.extra_data) {
        const lang = response.extra_data.lang;
        console.log(lang);
        return lang; // Return the language directly
      }
    }
  
    return 'defaultLanguage'; // Provide a default language in case of errors
  }
  

 

  return (
    <div style={parentContainerStyles}>
      <Navbar userData={userData}/>
      <div style={rootStyles}>
        <div style={friendActivityStyles}>
          <h2 style={titleStyles}>{strings.friendActivity}</h2>
          {userFriends.map((friend) => (
            <div key={friend['workouts'][0].workout_id} style={activityItemStyles}>
              <a href="#">
                <img
                  src={'../pic.jpg'}
                  alt={`${friend.name}'s profile`}
                  style={profilePictureStyles}
                />
              </a>
              <div>
                <p style={friendNameStyles}>{friend.name}</p>
                <p>{friend['workouts'][0].name}</p>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                {friend['workouts'][0].exercises.length > 0 &&
                <>
                  <p>Rating: {friend['workouts'][0].rating}⭐</p>
                  <p>Duration: {friend['workouts'][0].exercises[0].duration}🕛</p>
                  <p>RPE: {friend['workouts'][0].exercises[0].rpe}⚡</p>
                 </>
              }
              </div>
            </div>
          ))}
        </div>
        <div style={rightContainerStyles}>
          {/* <div style={currentStreakStyles}>Current streak: 5🔥</div> */}
            {userData['workouts'].length > 0 &&
            <Workout
              exercises={userData.workouts[0].exercises}
              workoutStyles={workoutStyles}
              workoutTitleStyles={workoutTitleStyles}
              exerciseListStyles={exerciseListStyles}
              tableStyles={tableStyles}
              tableRowStyles={tableRowStyles}
              tableCellStyles={tableCellStyles}
              workoutLinkStyles={workoutLinkStyles}
            />
          }
        </div>
      </div>
      <div style={sectionStyles}>
        <PreviousWorkouts userData={userData}/>
        <div style={buttonStyles}>
        <a href="/planbuilder">{strings.goToPlanBuilder}</a>
        </div>
      </div>
    </div>
  );
}

export default MainPage;