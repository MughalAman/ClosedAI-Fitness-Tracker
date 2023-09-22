import { useState, useEffect } from 'react';
import './App.css';

import Login from './components/login';
import Signup from './components/signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {isLoggedIn ? (<div>Logged in</div>) : (showSignup ? <Signup setShowSignup={setShowSignup}/> : <Login setShowSignup={setShowSignup} />)}
    </>
  );
}

export default App;
