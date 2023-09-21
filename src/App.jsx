import React, { useState, useEffect } from 'react';
import './App.css';

import Login from './components/login';
import Signup from './components/signup';

function App() {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowSignup(true);
    }, 5000); // Switch to Signup after 5 seconds

    return () => clearTimeout(timerId); // Clear the timer when the component is unmounted
  }, []);

  return (
    <div>
      {showSignup ? <Signup /> : <Login />}
    </div>
  );
}

export default App;
