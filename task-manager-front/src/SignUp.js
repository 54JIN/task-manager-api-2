import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
            navigate('/home')
        } catch (e) {
            console.log(e.data)
        } 
    }

    return (
        <div className='SignUp'>
            <div className='SignUp-Wrapper'>
                <div className='SignUp-Header'>
                    <h1>Task.Manager</h1>
                    <h1>92° Sunny</h1>
                </div>
                <div className='SignUp-Form'>
                    <div className='SignUp-Form-Wrapper'>
                        <div className='SignUp-Form-Title'>
                            <h1>Create Account</h1>
                        </div>
                        <div className='SignUp-Form-Input'>
                            <input type="text" placeholder="NAME" value={formData.name} name='name' onChange={handleChange}/>
                            <input type="text" placeholder="USERNAME" value={formData.email} name='email' onChange={handleChange}/>
                            <input type="text" placeholder="PASSWORD" value={formData.password} name='password' onChange={handleChange}/>
                        </div>
                        <div className='SignUp-Form-Submit'>
                            <button onClick={clickHandler}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp