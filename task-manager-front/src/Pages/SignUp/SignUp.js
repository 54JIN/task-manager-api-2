import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import TaskManager_Cover from '../../Assets/Images/TaskManager-Cover.jpg'

import './SignUp.css'

function SignUp() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
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
        Objective: When the user submits the form to signup to the application, request the server for the creation of the account, and if true, set the token to the browsers local storage.
    */
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
            setError(true)
            console.log(e)
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
                        <div className='SignUp-Form-Input-Password'>
                            <input type="password" placeholder="Password" value={formData.password} name='password' onChange={handleChange}/>
                            <div className={`${error? `${(formData.password.length < 7 || formData.password.includes("password")) ? 'SignUp-Form-Input-Password-Validations-Wrapper' : 'SignUp-Error-False'}` : 'SignUp-Error-False'}`}>
                                <div className='SignUp-Form-Input-Password-Validations'>
                                    <div className='SignUp-Form-Input-Password-Validations-Wrapper'>
                                        <div className='SignUp-Error-Title'>
                                            <p className='SignUp-Error-Title-Star'>*</p>
                                            <p>Password:</p>
                                        </div>
                                        <ul>
                                            {formData.password.length < 7 ?  <li>Must be 7 characters long</li> : null}
                                            {formData.password.includes("password") ? <li>Cannot be "password"</li> : null}
                                            {/* <li>Use at least one digit (0-9) & special characters like(# @ $ !)</li> */}
                                            {/* <li>Use at least one lower and upper case letters (a-z)</li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
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