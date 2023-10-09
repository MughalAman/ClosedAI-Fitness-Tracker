import { useState, useEffect } from 'react';
import './App.css';

import Login from './routes/login';
import Signup from './routes/signup';
import MainPage from './routes/MainPage';
import {getUser} from './utils/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userData, setUserData] = useState({});

  const handleUserLogin = (token) => {
    getUser(token)
      .then((data) => {
        if (data) {
          setUserData(data);
          setIsLoggedIn(true);
        }else{
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleUserLogin(token);
    }
  }
  , []);

  return (
    <>
      {!isLoggedIn && !showSignup && <Login setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} setUserData={setUserData} />}
      {!isLoggedIn && showSignup && <Signup setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} setUserData={setUserData} />}
      {isLoggedIn && <MainPage userData={userData} />}
    </>
  );
}

export default App;
