import { Chart as ChartJS } from 'chart.js/auto' 
import { Bar } from 'react-chartjs-2' 
import { useEffect, useState } from 'react'
import axios from 'axios'

import Header from '../../Assets/Components/Header'

import RedirectImg from '../../Assets/Images/Arrow.png'

import './Home.css'

function Home () {
    const [data, setData] = useState({totalTasks: 0, completed: 0, toDo: 0})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

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
            } catch (e) {
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [setData])

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
                                        data: [4, 8, 9, 2, 3, 10, 7],
                                        backgroundColor: "rgba(255, 255, 255, 1)",
                                        borderRadius: 40
                                    },
                                    {
                                        label: "Completed",
                                        data: [7, 6, 15, 13, 2, 12, 9],
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
                </div>
            </div>
        </div>
    )
}

export default Home;