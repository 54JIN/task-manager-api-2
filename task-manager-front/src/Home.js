import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './Home.css'
import axios from 'axios';

import Elipse from './Elipse.png'

function CreateAccount() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState(null);
    // const tasks2 = [{name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.jssssssssssssssssssssssrrrrrrrrrrr'}];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login')
        }
    }, [navigate])

    useEffect (() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                })
                setTasks(response.data)
            } catch (e) {
                console.log('')
            }
        }

        fetchData()
    }, [setTasks])

    return(
        <div className='Home'>
            <div className='Home-Wrapper'>
                <div className='Home-Header'>
                    <h1>Task.Manager</h1>
                    <h1>92° Sunny</h1>
                </div>
                <div className='Home-Content'>
                    <div className='Home-Content-Wrapper'>
                        <div className='Home-Content-Category-Wrapper'>
                            <div className='Home-Content-Category Task-1'>
                                <h2>URGENT</h2>
                                <div className='Home-Content-Category-Task'>
                                    {tasks? (tasks.map((task, idx) => (
                                        <div className='Home-Content-Category-Task-Content'>
                                            <img src={Elipse} alt={`Task-${idx}`} />
                                            <p>{task.description}</p>
                                        </div>
                                    ))) : null}
                                </div>
                            </div>
                            <div className='Home-Content-Category'>
                                <h2>HIGH</h2>
                                <div className='Home-Content-Category-Task'>
                                    {tasks? (tasks.map((task, idx) => (
                                        <div className='Home-Content-Category-Task-Content'>
                                            <img src={Elipse} alt={`Task-${idx}`}/>
                                            <p>{task.description}</p>
                                        </div>
                                    ))) : null}
                                </div>
                            </div>
                        </div>
                        <div className='Home-Content-Add'>
                            <button>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount