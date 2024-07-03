import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import SignUp from './SignUp'

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
            <div className='LogIn-Wrapper'>
                <div className='LogIn-Header'>
                    <h1>Task.Manager</h1>
                </div>
                <div className='LogIn-Form'>
                    <div className='LogIn-Form-Wrapper'>
                        <div className='LogIn-Form-Title'>
                            <h1>Log In</h1>
                        </div>
                        <div className='LogIn-Form-Input'>
                            <input type="text" placeholder="USERNAME" value={formData.email} name='email' onChange={handleChange}/>
                            <input type="text" placeholder="PASSWORD" value={formData.password} name='password' onChange={handleChange}/>
                        </div>
                        <div className='LogIn-Form-Submit'>
                            <button onClick={clickHandler}>Enter</button>
                            <Link key={SignUp} to='/signup' ><button>Sign Up</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn