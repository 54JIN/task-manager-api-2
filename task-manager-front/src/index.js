import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

//NPM Dev dependencies
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import SignUp from './Pages/SignUp/SignUp';
import LogIn from './Pages/LogIn/LogIn';
import Home from './Pages/Home/Home';
import Tasks from './Pages/Tasks/Tasks';

const router = createBrowserRouter([
  //Page Objects
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/login',
    element: <LogIn />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/tasks',
    element: <Tasks />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/tasks/:id',
    element: <Tasks />,
    errorElement: <div>404 Not Found</div>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router= {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
