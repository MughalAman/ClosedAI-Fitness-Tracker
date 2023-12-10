import React, { useState, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import Navbar from '../components/Navbar';
import PreviousWorkouts from '../components/PreviousWorkouts';
import Workout from '../components/workout';
import MainPageWorkoutList from '../components/MainPageWorkoutList';
import { getUserFriendships, getUserFromUserId, getLanguage, getUser } from '../utils/api';
import ChatBot from '../components/chatBot';

import localizationData from '../assets/localization.json';


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

const chatButtonStyles = {
  width: '300px',
  height: '100px',
  marginRight: '75px',
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
  bottom: '200px', // Adjust the distance from the bottom
  right: '0px', // Adjust the distance from the right
};

const sectionStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between', // Add this line to align items to the right
};


function MainPage(props) {

  const [strings, setStrings] = useState(new LocalizedStrings(localizationData));

  useEffect(() => {
      async function fetchData() {
          const lang = selectedLanguage; // Call the getLanguage function
          console.log(lang);
          setSelectedLanguage(lang); // Set the selected language based on the result
          setStrings(prevStrings => {
              const newStrings = new LocalizedStrings(localizationData);
              newStrings.setLanguage(lang);
              return newStrings;
          });
      }
  
      fetchData();
  }, []);
  

  const { userData } = props;
  const [userFriends, setUserFriends] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    // This code runs when the component mounts
    console.log('MainPage mounted');

    // This is the cleanup code that runs when the component unmounts
    return () => {
      console.log('MainPage cleanup function');
      // rest of the cleanup code
    };
  }, []); // The empty dependency array means this useEffect runs only once (on mount)

  useEffect(() => {
    async function fetchData() {
      const lang = selectedLanguage; // Call the getLanguage function
      setSelectedLanguage(lang); // Set the selected language based on the result
    }

    fetchData();
  }, []);

  console.log(userData);

  useEffect(() => {
    const fetchData = async () => {

      if (localStorage.getItem('showExtraQuestions') === 'true') {
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
        } else if (friends[i].friend_id === userData.user_id) {
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
  
    return 'en'; // Provide a default language in case of errors
  }

  const date = new Date();
  const format = `${date.getFullYear()}-${date.getMonth()+1}-${(""+date.getDate()).length<2 ? "0"+date.getDate() : date.getDate()}`
  let workout;
  userData.workouts.forEach(x=>x.dates.forEach(y=>y.date===format && (workout = x)));

  return (
    <div style={parentContainerStyles}>
      <Navbar userData={userData} />
      <div style={rootStyles}>
        <div style={friendActivityStyles}>
          <h2 style={titleStyles}>{strings.friendActivity}</h2>
          {userFriends.map((friend) => (
            <div key={friend['workouts'][0].workout_id} style={activityItemStyles}>
              <a href={"/friendprofile/" + friend.user_id} onClick={(e) => friend['extra_data'].visibility==="private" && e.preventDefault()}>
                <img
                  src={friend.profile_pic_url ? friend.profile_pic_url : '../pic.jpg'}
                  alt={`${friend.name}'s profile`}
                  style={profilePictureStyles}
                />
              </a>
              <div>
                <p style={friendNameStyles}>{friend.name}</p>
                <p>{!friend['extra_data'].visibility==="public" ? friend['workouts'] && friend['workouts'].length > 0 ? friend['workouts'][0].name : 'No Workouts' : "Private Profile"}</p>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                {(friend['workouts'][0].exercises.length > 0 && !friend['extra_data'].visibility) &&
                  <>
                    <p>{strings.rating} {friend['workouts'][0].rating}⭐</p>
                    <p>{strings.duration} {friend['workouts'][0].exercises[0].duration}🕛</p>
                    <p>{strings.rpe}{friend['workouts'][0].exercises[0].rpe}⚡</p>
                  </>
                }
              </div>
            </div>
          ))}
        </div>
        <div style={rightContainerStyles}>
        {workout && <MainPageWorkoutList data={workout} id={workout.workout_id} />}
        </div>
      </div>

      <div style={sectionStyles}>
        <PreviousWorkouts userData={userData} />
        <div style={chatButtonStyles}>
          <button onClick={toggleChat}>
            {strings.togglechat}
          </button>
        </div>

        {isChatOpen && (
  <ChatBot closeChat={toggleChat} strings={strings} isChatOpen={isChatOpen}>
    <button onClick={toggleChat}></button>
  </ChatBot>
)}

        <a href="/planbuilder">
          <div style={buttonStyles}>
          <p>{strings.GotoPlanBuilder}</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default MainPage;
