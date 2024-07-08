import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './Home.css'
import axios from 'axios';

import Elipse from './Elipse.png'

function CreateAccount() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState(null);
    const [tasksDisplay, setTaskDisplay] = useState(false);
    // const [tasksDisplay, setTaskDisplay] = useState(true);
    const [createTask, setCreateTask] = useState('');
    // const [tasks, setTasks] = useState(null);
    // const [tasks2, setTask2] = useState([ {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.jssssssssssssssssssssssrrrrrrrrrrr'}]);
    // const [tasks2, setTask2] = useState([ {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.jssssssssssssssssssssssrrrrrrrrrrr'}, , {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}, {name: 'idl', description: 'Finish Node.js'}]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login')
        }
    }, [navigate])

    useEffect (() => {
        const fetchData = async () => {
            try{
                await axios.get('/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((response) => {
                    setTasks(response.data)
                    setTaskDisplay(true)
                })
            } catch (e) {
                console.log('')
            }
        }

        fetchData()
    }, [setTasks])

    const clickOpenTaskHandler = () => {
        setTaskDisplay(false)
    }

    const handleChange = (evt) => {
        setCreateTask(evt.target.value)
    }

    const clickAddTaskHandler = async () => {
        try{
            await axios.post('/api/tasks', 
            {
                description: createTask
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                }
            }).then(() => window.location.reload())
        } catch (e) {
            console.log('')
        }
    }

    return(
        <div className='Home'>
            <div className='Home-Wrapper'>
                <div className='Home-Header'>
                    <h1>Task.Manager</h1>
                    <h1>{window.localStorage.getItem('name').replace('"', '').replace('"', '')}</h1>
                </div>
                <div className='Home-Content'>
                    <div className={`${!tasksDisplay? 'Display-Off' : 'Home-Content-Wrapper'}`}>
                        <div className='Home-Content-Category'>
                            <h2>Tasks</h2>
                            <div className='Home-Content-Category-Task'>
                                {tasks? (tasks.map((task, idx) => (
                                    <div className='Home-Content-Category-Task-Content'>
                                        <img src={Elipse} alt={`Task-${idx}`} />
                                        <p>{task.description}</p>
                                    </div>
                                ))) : null}
                            </div>
                        </div>
                        <div className='Home-Content-Add'>
                            <button onClick={clickOpenTaskHandler}>+</button>
                        </div>
                    </div>
                    <div className={`${tasksDisplay? 'Display-Off' : 'Home-Create-Task'}`}>
                        <h2>Create Task</h2>
                        <div className='Home-Create-Task-Content'>
                            <input type="text" placeholder='Task Description' value={createTask} name='createTask' onChange={handleChange} />
                            <div className='Home-Create-Task-Submit'>
                                <button onClick={clickAddTaskHandler}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount