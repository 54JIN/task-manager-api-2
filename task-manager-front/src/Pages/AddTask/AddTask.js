import { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import Header from '../../Assets/Components/Header'

import axios from 'axios';

import './AddTask.css'

function AddTask () {
    const [createTask, setCreateTask] = useState('');

    const navigate = useNavigate();

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
            }).then(() => navigate('/home'))
        } catch (e) {
            console.log('')
        }
    }

    return(
        <div className='AddTask'>
            <Header />
            <div className='AddTask-Content-Wrapper'>
                <div className='AddTask-Content'>
                    <h3>Create Task</h3>
                    <div>
                        <input type='text' placeholder='Task Description' onChange={handleChange}/>
                        <button onClick={clickAddTaskHandler}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask;