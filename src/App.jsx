import { useState, useEffect } from 'react';
import './App.css';

import Login from './routes/login';
import Signup from './routes/signup';
import MainPage from './routes/MainPage';
import { getUser } from './utils/api';

/**
 * Main component representing the application.
 * @component
 * @returns {JSX.Element} Returns the main application component.
 */
function App() {

  /**
   * State to track the login status of the user.
   * @type {[boolean, Function]} State variable and its updater function.
   */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * State to determine whether to show the signup form.
   * @type {[boolean, Function]} State variable and its updater function.
   */
  const [showSignup, setShowSignup] = useState(false);

  /**
   * State to store user data.
   * @type {[Object, Function]} State variable and its updater function.
   */
  const [userData, setUserData] = useState({});

  /**
   * Handles user login by fetching user data from the API.
   * @param {string} token - User authentication token.
   * @returns {void}
   */
  const handleUserLogin = (token) => {
    getUser(token)
      .then((data) => {
        if (data) {
          setUserData(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Effect hook to check if there is a user token in local storage on component mount.
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleUserLogin(token);
    }
  }, []);

  /**
   * Renders the login form, signup form, or the main page based on the login status.
   * @returns {JSX.Element} Returns the appropriate component based on the login status.
   */
  return (
    <>
      {!isLoggedIn && !showSignup && (
        <Login setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} setUserData={setUserData} />
      )}
      {!isLoggedIn && showSignup && (
        <Signup setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} setUserData={setUserData} />
      )}
      {isLoggedIn && <MainPage userData={userData} />}
    </>
  );
}

export default App;
