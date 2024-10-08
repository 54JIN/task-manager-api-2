import { Chart as ChartJS } from 'chart.js/auto' 
import { Bar } from 'react-chartjs-2' 
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import Header from '../../Assets/Components/Header'

import Dropdown from './Dropdown/taskDropdown/Dropdown/Dropdown'
// import DropdownItem from './Dropdown/taskDropdown/DropdownItem/DropdownItem'

import RedirectImg from '../../Assets/Images/Arrow.png'

import './Home.css'

function Home () {
    const [data, setData] = useState({totalTasks: 0, completed: 0, overDueTask: 0, toDo: 0, weeklyStats: [ {label: 'Monday', completed: 24, incomplete: 4}, {label: 'Tuesday', completed: 13, incomplete: 2}, {label: 'Wednesday', completed: 14, incomplete: 3}, {label: 'Thursday', completed: 6, incomplete: 1}, {label: 'Friday', completed: 12, incomplete: 3}, {label: 'Saturday', completed: 15, incomplete: 7}, {label: 'Sunday', completed: 9, incomplete: 4} ]})
    // const [tasks, setTasks] = useState([{_id: 'dasada' , title: 'Finish Math Homework', completed: false, priority: 2}, {_id: 'dasfsaa', title: 'Workout', completed: true, priority: 1}, {_id: 'dasadasdas', title: 'Basketball practice at 9:30 a.m', completed: true, priority: 1}, {_id: 'dasadffwefwea', title: 'Piano lesson at 2:15 p.m', completed: false, priority: 1}, {_id: 'dasadag3wweg', title: 'Eat avocado toast', completed: false, priority: 0}, {_id: 'dasadajtyjtyjt', title: 'Gym', completed: false, priority: 0}])
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [filter, setFilter] = useState(false)
    const [taskFilter, setTaskFilter] = useState(0)
    const navigate = useNavigate();


    /* 
        Objective: Before the page is loaded, request the server side for the users 
            - weekly status for tasks 
            - the amount of tasks created 
            - the amount of tasks completed
            - the amount of tasks to be completed
            - a list of all tasks to be viewed.
    */
    useEffect(() => {
        const fetchData = async () => {
            try{
                setIsLoading(true)
                /* 
                    Objective: the path '/api/projects' should return the users weekly status, total tasks, completed tasks, and toDo tasks
                */
                await axios.get('/api/projects', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((response) => {
                    setData(response.data)
                    // console.log(response.data)
                })
                /* 
                    Objective: the path '/api/tasks' should return all the tasks the user has created. 
                */
                await axios.get('/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((response) => {
                    setTasks(response.data)
                    // console.log(response.data)
                })
            } catch (e) {
                /* 
                    Objective: In the case of an error, log the user out and remove any tokens associated within the cookies of the browser.
                */
                if(window.localStorage.getItem('token') === null) {
                    window.localStorage.removeItem('token')
                    window.localStorage.removeItem('name')
                    navigate('/login');
                } else if(e.response.data.error) {
                    window.localStorage.removeItem('token')
                    window.localStorage.removeItem('name')
                    navigate('/login');
                }
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [setData])

    /* 
        Objective: When the user filters for tasks via All or Completed or Incomplete, request the server side for tasks of the nature of filteration, then display the filtered tasks to the user.
    */
    const clickTaskHandler = async (filter) => {
        try{
            if(filter === 'All'){
                await axios.get('/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((response) => {
                    setTasks(response.data)
                    setTaskFilter(0)
                    // console.log(response.data)
                })
            } else {
                await axios.get(`/api/tasks?completed=${filter === 'Completed'? 'true' : 'false'}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((response) => {
                    if(filter === 'Completed'){
                        setTaskFilter(1)
                    } else {
                        setTaskFilter(2)
                    }
                    setTasks(response.data)
                    // console.log(response.data)
                })
            }
        } catch (e) {
            setError(true)
        }
    }

    /* 
        Objective: When the status of completed vs incompleted has changed for a perticular task, update the priority level on the server side, then update the state of the application to display the change.
    */
    const clickTaskStatusHandler = async (taskId, value) => {
        try {
            await axios.patch(`/api/tasks/${taskId}`, { completed: !value }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                }
            }).then(() => {
                const updatedTasks = tasks.map( task => task._id === taskId ? { ...task, completed: !task.completed } : task )
                setTasks(updatedTasks)
            })
        } catch(e) {
            setError(true)
        }
    }
    
    /* 
        Objective: When a priority has been changed by the user for a perticular task, update the priority level on the server side, then update the state of the application to display the change. 
    */
    const clickTaskPriorityHandler = async (taskId, value) => {
        try {
            await axios.patch(`/api/tasks/${taskId}`, { priority: value }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                }
            }).then(() => {
                const updatedTasks = tasks.map( task => task._id === taskId ? { ...task, priority: value } : task )
                setTasks(updatedTasks)
            })
        } catch(e) {
            setError(true)
        }
    }

    /* 
        Objective: During the process in which the server side is being requested for data at the initail state, render a loading screen for the users convenince of mind.
    */
    if(isLoading) {
        return (
            <div>
                <h1>Loading . . . </h1>
            </div>
        )
    }

    /* 
        Objective: In the case of an error, instead of showing the user the Overview, display an error screen 
    */
    // if(error) {
    //     return (
    //         <div>
    //             <h1>Something Went Wrong! Please Try again.</h1>
    //         </div>
    //     )
    // }   

    return (
        <div className='Home'>
            <Header navVal={1} />
            <div className='Home-Tasks-Content'>
                <div className='Home-Tasks-Content-Welcome'>
                    <p>Welcome to Task Manager. Enjoy {window.localStorage.getItem('name').replace('"', '').replace('"', '')}!</p>
                </div>
                <div className='Home-Tasks'>
                    <div className='Home-Tasks-Total'>
                        <h2>{data.totalTasks}</h2>
                        <p>Total Tasks</p>
                    </div>
                    <div className='Home-Tasks-Specifics'>
                        <div className='Home-Tasks-Specifics-Information'>
                            <div>
                                <p>Completed</p>
                                <p>Task</p>
                            </div>
                            <h2>{data.completed}</h2>    
                        </div>
                        <div className='Home-Tasks-Specifics-Redirects'>
                            <button><img src={RedirectImg} alt="Completed Task Button" /></button>
                            <p>+1 this week</p>
                        </div>
                    </div>
                    <div className='Home-Tasks-Specifics'>
                        <div className='Home-Tasks-Specifics-Information'>
                            <div>
                                <p>Overdue</p>
                                <p>Task</p>
                            </div>
                            <h2>{data.overDueTask}</h2>    
                        </div>
                        <div className='Home-Tasks-Specifics-Redirects'>
                            <button><img src={RedirectImg} alt="Overdue Task Button" /></button>
                            <p>+1 this week</p>
                        </div>
                    </div>
                    <div className='Home-Tasks-Specifics'>
                        <div className='Home-Tasks-Specifics-Information'>
                            <div>
                                <p>To Do</p>
                                <p>Task</p>
                            </div>
                            <h2>{data.toDo}</h2>    
                        </div>
                        <div className='Home-Tasks-Specifics-Redirects'>
                            <button><img src={RedirectImg} alt="To Do Task Button" /></button>
                            <p>+1 this week</p>
                        </div>
                    </div>
                </div>
                <div className='Home-Diagrams'>
                    <div className='Home-Diagrams-Weekly_Stats'>
                        <Bar 
                            data={{
                                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                datasets: [
                                    {
                                        label: "Not Completed",
                                        data: data.weeklyStats.map((data) => data.incomplete),
                                        backgroundColor: "rgba(255, 255, 255, 1)",
                                        borderRadius: 40
                                    },
                                    {
                                        label: "Completed",
                                        data: data.weeklyStats.map((data) => data.completed),
                                        backgroundColor: "rgba(231, 254, 85, 1)",
                                        borderRadius: 40,
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                    <div className='Home-Diagrams-Tasks'>
                        <div className='Home-Diagrams-Tasks-Header'>
                            <div className='Home-Diagrams-Tasks-Header-Left-Aligned'>
                                <div className='Home-Diagrams-Tasks-Header-Title'>
                                    <h2>Tasks</h2>
                                </div>
                                <div className='Home-Diagrams-Tasks-Header-Filters'>
                                    <button onClick={() => clickTaskHandler('All')} className={taskFilter === 0? 'Home-Diagrams-Tasks-Header-Filters-Button-Active' : 'Home-Diagrams-Tasks-Header-Filters-Button-Inactive'}>All</button>
                                    <button onClick={() => clickTaskHandler('Completed')} className={taskFilter === 1? 'Home-Diagrams-Tasks-Header-Filters-Button-Active' : 'Home-Diagrams-Tasks-Header-Filters-Button-Inactive'}>Completed</button>
                                    <button onClick={() => clickTaskHandler('Incomplete')} className={taskFilter === 2? 'Home-Diagrams-Tasks-Header-Filters-Button-Active' : 'Home-Diagrams-Tasks-Header-Filters-Button-Inactive'}>Incomplete</button>
                                </div>
                            </div>
                            <div className='Home-Diagrams-Tasks-Header-Right-Aligned'>
                                <button onClick={() => setFilter(!filter)} className={filter? 'Home-Diagrams-Tasks-Header-Filters-Button-Active' : 'Home-Diagrams-Tasks-Header-Filters-Button-Inactive'}>Filters</button>
                            </div>
                        </div>
                        <div className='Home-Diagrams-Tasks-Content'>
                            {tasks.map((task) => (
                                <div key={task._id} className='Home-Diagrams-Tasks-Content-Task'>
                                    <p>{task.title}</p>
                                    <div className='Home-Diagrams-Tasks-Content-Task-Information'>
                                        <Dropdown priority={task.priority} id={task._id} clickPriorityTaskHandler={clickTaskPriorityHandler} />
                                        <button className={`${task.completed? "Home-Diagrams-Tasks-Content-Task-Completed" : "Home-Diagrams-Tasks-Content-Task-Incomplete"}`} onClick={() => clickTaskStatusHandler(task._id, task.completed)}></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;