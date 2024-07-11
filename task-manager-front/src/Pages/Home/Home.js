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
    const [data, setData] = useState({totalTasks: 0, completed: 0, toDo: 0, weeklyStats: [ {label: 'Monday', completed: 24, incomplete: 4}, {label: 'Tuesday', completed: 13, incomplete: 2}, {label: 'Wednesday', completed: 14, incomplete: 3}, {label: 'Thursday', completed: 6, incomplete: 1}, {label: 'Friday', completed: 12, incomplete: 3}, {label: 'Saturday', completed: 15, incomplete: 7}, {label: 'Sunday', completed: 9, incomplete: 4} ]})
    // const [tasks, setTasks] = useState([{_id: 'dasada' , description: 'Finish Math Homework', completed: false, priority: 2}, {_id: 'dasfsaa', description: 'Workout', completed: true, priority: 1}, {_id: 'dasadasdas', description: 'Basketball practice at 9:30 a.m', completed: true, priority: 1}, {_id: 'dasadffwefwea', description: 'Piano lesson at 2:15 p.m', completed: false, priority: 1}, {_id: 'dasadag3wweg', description: 'Eat avocado toast', completed: false, priority: 0}, {_id: 'dasadajtyjtyjt', description: 'Gym', completed: false, priority: 0}])
    const [tasks, setTasks] = useState([{description: '', completed: false}])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [taskFilter, setTaskFilter] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try{
                setIsLoading(true)
                await axios.get('/api/projects', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((response) => {
                    setData(response.data)
                    console.log(response.data)
                })
                await axios.get('/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                    }
                }).then((response) => {
                    setTasks(response.data)
                    // console.log(response.data)
                })
            } catch (e) {
                // console.log(e)
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
                    console.log(response.data)
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
                    console.log(response.data)
                })
            }
        } catch (e) {
            setError(true)
        }
    }

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

    if(isLoading) {
        return (
            <div>
                <h1>Loading . . . </h1>
            </div>
        )
    }

    if(error) {
        return (
            <div>
                <h1>Something Went Wrong! Please Try again.</h1>
            </div>
        )
    }   

    return (
        <div className='Home'>
            <Header />
            <div className='Home-Tasks-Content'>
                <div className='Home-Tasks-Content-Welcome'>
                    <p>Welcome to Task Manager. Enjoy UserName!</p>
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
                            <h2>3</h2>    
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
                            <div className='Home-Diagrams-Tasks-Header-Title'>
                                <h2>Tasks</h2>
                            </div>
                            <div className='Home-Diagrams-Tasks-Header-Filters'>
                                <button onClick={() => clickTaskHandler('All')} className={taskFilter === 0? 'Home-Diagrams-Tasks-Header-Filters-Button-Active' : 'Home-Diagrams-Tasks-Header-Filters-Button-Inactive'}>All</button>
                                <button onClick={() => clickTaskHandler('Completed')} className={taskFilter === 1? 'Home-Diagrams-Tasks-Header-Filters-Button-Active' : 'Home-Diagrams-Tasks-Header-Filters-Button-Inactive'}>Completed</button>
                                <button onClick={() => clickTaskHandler('Incomplete')} className={taskFilter === 2? 'Home-Diagrams-Tasks-Header-Filters-Button-Active' : 'Home-Diagrams-Tasks-Header-Filters-Button-Inactive'}>Incomplete</button>
                            </div>
                        </div>
                        <div className='Home-Diagrams-Tasks-Content'>
                            {tasks.map((task) => (
                                <div key={task._id} className='Home-Diagrams-Tasks-Content-Task'>
                                    <p>{task.description}</p>
                                    <div className='Home-Diagrams-Tasks-Content-Task-Information'>
                                        {/* <Dropdown 
                                            buttonText={task.priority === 2 ? "High" : `${task.priority === 1 ? 'Medium': 'Low'}`}
                                            content={
                                                <>
                                                    <DropdownItem onClick={clickTaskPriorityHandler(task._id, 2)}>{'High'}</DropdownItem>
                                                    <DropdownItem onClick={clickTaskPriorityHandler(task._id, 1)}>{'Medium'}</DropdownItem>
                                                    <DropdownItem onClick={clickTaskPriorityHandler(task._id, 0)}>{'Low'}</DropdownItem>
                                                </>
                                            }
                                        /> */}
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