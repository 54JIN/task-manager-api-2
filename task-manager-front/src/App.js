import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';

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
      
    </div>
  );
}

export default App;
