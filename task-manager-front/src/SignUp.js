import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
            <div className='Header'>
                <h1>Task.Manager</h1>
                <h1>92° Sunny</h1>
            </div>
            <div className='SignUp-Form'>
                <h1>Create Account</h1>
                <input type="text" placeholder="name" value={formData.name} name='name' onChange={handleChange}/>
                <input type="text" placeholder="example@email.com" value={formData.email} name='email' onChange={handleChange}/>
                <input type="text" placeholder="Password" value={formData.password} name='password' onChange={handleChange}/>
                <button onClick={clickHandler}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp