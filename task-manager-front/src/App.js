import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';

import LogIn from './LogIn'
import Home from './Home'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if(token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="App">
      {window.localStorage.getItem("token")? <Home /> : <LogIn />}
    </div>
  );
}

export default App;
