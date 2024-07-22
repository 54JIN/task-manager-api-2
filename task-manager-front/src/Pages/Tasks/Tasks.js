import { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../Assets/Components/Header'
import Dropdown from './Dropdown/taskDropdown/Dropdown/Dropdown'

import NewTaskIcon from '../../Assets/Images/NewTaskIcon.png'

import './Tasks.css'

function Tasks () {
    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    // const [tasks, setTasks] = useState([{_id: 'dasada' , description: 'Finish Math Homework', completed: false, priority: 2}, {_id: 'dasfsaa', description: 'Workout', completed: true, priority: 1}, {_id: 'dasadasdas', description: 'Basketball practice at 9:30 a.m', completed: true, priority: 1}, {_id: 'dasadffwefwea', description: 'Piano lesson at 2:15 p.m', completed: false, priority: 1}, {_id: 'dasadag3wweg', description: 'Eat avocado toast', completed: false, priority: 0}, {_id: 'dasadajtyjtyjt', description: 'Gym', completed: false, priority: 0}])
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({_id: '', title: '', description: '', dueDate: '', priority: 0})

    const navigate = useNavigate();

    /* 
        Objective: Before the page is loaded, request the server side for all the users tasks.
    */
    useEffect(() => {
        const fetchData = async () => {
            try{
                setIsLoading(true)
                await axios.get('/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((response) => {
                    setTasks(response.data)
                })
                if(id) {
                    await axios.get(`/api/tasks/${id}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                        }
                    }).then((response) => {
                        if(response.data.dueDate !== null) {
                            const date = new Date(response.data.dueDate)
                            const month = String(date.getMonth() + 1).padStart(2, '0')
                            const day = String(date.getDate() + 1).padStart(2, '0')
                            const year = date.getFullYear();
                            response.data.dueDate = `${year}-${month}-${day}`
                        } else {
                            response.data.dueDate = ''
                        }
                        setTask(response.data)
                    })
                }
            } catch (e) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [setTasks])

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setTask((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const clickAddTaskHandler = async () => {
        try{
            if(!task._id){
                await axios.post('/api/tasks', 
                {
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                    priority: task.priority
                },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((res) => {
                    navigate(`/tasks/${res.data._id}`);
                    if(res.data.dueDate !== null) {
                        const date = new Date(res.data.dueDate)
                        const month = String(date.getMonth() + 1).padStart(2, '0')
                        const day = String(date.getDate() + 1).padStart(2, '0')
                        const year = date.getFullYear();
                        res.data.dueDate = `${year}-${month}-${day}`
                    } else {
                        res.data.dueDate = ''
                    }
                    setTasks([...tasks, res.data])
                    setTask(res.data)
                })
            } else {
                await axios.patch(`/api/tasks/${task._id}`, 
                {
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                    priority: task.priority
                },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((res) => {
                    const updatedTasks = tasks.map( task => task._id === res.data._id ? { ...task, title: res.data.title } : task )
                    setTasks(updatedTasks)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    
    const clickTaskPriorityHandler = async (value) => {
        setTask((prevTask) => ({
            ...prevTask,
            ['priority']: value
        }))
    }
    
    const clickTaskHandler = async (taskId) => {
        try {
            await axios.get(`/api/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                }
            }).then((response) => {
                if(response.data.dueDate !== null) {
                    const date = new Date(response.data.dueDate)
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const day = String(date.getDate() + 1).padStart(2, '0')
                    const year = date.getFullYear();
                    response.data.dueDate = `${year}-${month}-${day}`
                } else {
                    response.data.dueDate = ''
                }
                setTask(response.data)
                navigate(`/tasks/${taskId}`)
            })
        } catch (e) {

        }
    }
    
    const clickAddNewTaskHandler = async () => {
        setTask({_id: '', title: '', description: '', dueDate: '', priority: 0})
        navigate(`/tasks`)
    }

    return(
        <div className='AddTask'>
            <Header navVal={2} />
            <div className='AddTask-Subtitle'>
                <p>Welcome to Task Manager. Enjoy {window.localStorage.getItem('name').replace('"', '').replace('"', '')}!</p>
            </div>
            <div className='AddTask-Content'>
                <div className='AddTask-Content-Tasks'>
                    <div className='AddTask-Content-Tasks-Header'>
                        <h2>Tasks</h2>
                        <button onClick={() => clickAddNewTaskHandler()}><img src={NewTaskIcon}/></button>
                    </div>
                    <div className='AddTask-Content-Tasks-View'>
                        {tasks.map((task) => (
                            <div className='AddTask-Content-Tasks-View-Task' onClick={() => clickTaskHandler(task._id)}>
                                <p>{task.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='AddTask-Content-Edit'>
                    <div className='AddTask-Content-Edit-Title'>
                        <input type="text" placeholder='Title' name="title" value={task.title} onChange={handleChange}/>
                        <button onClick={clickAddTaskHandler}>Save</button>
                    </div>
                    <div className='AddTask-Content-Edit-Details'>
                        <div className='AddTask-Content-Edit-Details-Date'>
                            <p className='AddTask-Content-Edit-Details-Label'>Due date</p>    
                            <input type="date" placeholder='MM/DD/YYYY' name="dueDate" value={task.dueDate} onChange={handleChange} />
                        </div>
                        <div className='AddTask-Content-Edit-Details-Priority'>
                            <p className='AddTask-Content-Edit-Details-Label'>Priority</p>    
                            {/* <button>Temp</button> */}
                            <Dropdown priority={task.priority} clickPriorityTaskHandler={clickTaskPriorityHandler} />
                        </div>
                    </div>
                    <div className='AddTask-Content-Edit-Description'>
                        <textarea placeholder='Description . . .' name="description" value={task.description} onChange={handleChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks;