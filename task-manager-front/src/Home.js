import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login')
        }
    }, [navigate])

    return(
        <div className='Home'>
            <h1>Welcome Home</h1>
        </div>
    )
}

export default CreateAccount