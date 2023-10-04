import { useState, useEffect } from 'react';
import './App.css';

import Login from './components/login';
import Signup from './components/signup';
import TrainingGoal from './components/TrainingGoal';
import TrainingExperience from './components/TrainingExperience';

import Profile from './components/profile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userData, setUserData] = useState({});

  const handleUserLogin = (email, token) => {
    fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        token: token
      })
    })

    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setUserData(data.data);
        setIsLoggedIn(true);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (token && email) {
      handleUserLogin(email, token);
    }
  }
  , []);

  return (
    <>
    
      {Profile()}
    </>
  );
}

export default App;
