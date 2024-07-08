import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import SignUp from '../SignUp/SignUp'

import TaskManager_Cover from '../../Assets/Images/TaskManager-Cover.jpg'

import './LogIn.css'

function LogIn() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

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
            console.log(e.data)
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
                        <input type="email" placeholder="Email" value={formData.email} name='email' onChange={handleChange}/>
                        <input type="password" placeholder="Password" value={formData.password} name='password' onChange={handleChange}/>
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