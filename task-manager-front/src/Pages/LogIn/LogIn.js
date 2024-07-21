import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import SignUp from '../SignUp/SignUp'

import TaskManager_Cover from '../../Assets/Images/TaskManager-Cover.jpg'

import './LogIn.css'

function LogIn() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    /* 
        Objective: When the user inputs a value in the form, update the state of the value.
    */
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    /* 
        Objective: When the user submits the form to login to the application, request the server for authentication, and if true, set the token to the browsers local storage.
    */
    const clickHandler = async () => {
        try {
            const response = await axios.post(`/api/users/login`, {
              email: formData.email,
              password: formData.password
            });
            
            window.localStorage.setItem("token", JSON.stringify(response.data.token))
            window.localStorage.setItem("name", JSON.stringify(response.data.user.name))
            navigate('/home')
        } catch (e) {
            setError(true)
            console.log(e)
        } 
    }

    return (
        <div className='LogIn'>
            <div className='LogIn-Form'>
                <div className='LogIn-Form-Title'>
                    <h1>Hello,</h1>
                    <h1>Welcome Back</h1>
                    <p>Hey, Welcome back to a productive day</p>
                </div>
                <div className='LogIn-Form-Content'>
                    <div className='LogIn-Form-Input'>
                        <div className='LogIn-Form-Input-Email'>
                            <input type="email" placeholder="Email" value={formData.email} name='email' onChange={handleChange}/>
                        </div>
                        <div className={`LogIn-Form-Input-Password ${error? null : 'LogIn-Error'}`}>
                            <input type="password" placeholder="Password" value={formData.password} name='password' onChange={handleChange}/>
                            <div className='LogIn-Error-Content'>
                                <p className='LogIn-Error-Star'>*</p>
                                <p>Your email or password is incorrect</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='LogIn-Form-Submit'>
                        <div className='LogIn-Form-Submit-LogIn'>
                            <button onClick={clickHandler}>Log In</button>
                        </div>
                        <div className='LogIn-Form-Submit-SignUp'>
                            <Link key={SignUp} to='/signup' ><button>Sign Up</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='LogIn-Cover'>
                <img src={TaskManager_Cover} alt='Log-In Display' />
            </div>
        </div>
    )
}

export default LogIn