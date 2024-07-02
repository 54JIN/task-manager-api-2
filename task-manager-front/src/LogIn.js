import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import SignUp from './SignUp'

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
            navigate('/home')
        } catch (e) {
            console.log(e.data)
        } 
    }

    return (
        <div className='LogIn'>
            <div className='Header'>
                <h1>Task.Manager</h1>
                <h1>92° Sunny</h1>
            </div>
            <div className='LogIn-Form'>
                <h1>Log In</h1>
                <input type="text" placeholder="example@email.com" value={formData.email} name='email' onChange={handleChange}/>
                <input type="text" placeholder="Password" value={formData.password} name='password' onChange={handleChange}/>
                <button onClick={clickHandler}>Sign In</button>
                <Link key={SignUp} to='/signup' ><button>Sign Up</button></Link>
            </div>
        </div>
    )
}

export default LogIn