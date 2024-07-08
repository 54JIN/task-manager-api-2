import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import TaskManager_Cover from '../../Assets/Images/TaskManager-Cover.jpg'

import './SignUp.css'

function SignUp() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
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
            const response = await axios.post(`/api/users`, {
                name: formData.name,
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
        <div className='SignUp'>
            <div className='SignUp-Form'>
                <div className='SignUp-Form-Title'>
                    <h1>Hello,</h1>
                    <h1>Join Us</h1>
                    <p>Hey, Join us to make your day more productive</p>
                </div>
                <div className='SignUp-Form-Content'>
                    <div className='SignUp-Form-Input'>
                        <input type="text" placeholder="Full Name" value={formData.name} name='name' onChange={handleChange}/>
                        <input type="email" placeholder="Email" value={formData.email} name='email' onChange={handleChange}/>
                        <input type="password" placeholder="Password" value={formData.password} name='password' onChange={handleChange}/>
                    </div>
                    <div className='SignUp-Form-Submit'>
                        <button onClick={clickHandler}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div className='SignUp-Cover'>
                <img src={TaskManager_Cover} alt='SignUp-In Display' />
            </div>
        </div>
    )
}

export default SignUp