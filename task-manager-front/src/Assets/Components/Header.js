import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import Home from '../../Pages/Home/Home'
import Tasks from '../../Pages/Tasks/Tasks'

import AvatarIcon from '../Images/AvatarIcon.png'
import AddIcon from '../Images/AddIcon.png'

import './Header.css'

function Header ({ navVal }) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    /* 
        Objective: When the user requests to LogOut, request the server side to log the user out of the application, then clear the users token from the browser history.
    */
    const clickLogOutHandler = async () => {
        try {
            await axios.post('/api/users/logout', 
            {
                
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token').replace('"', '').replace('"', '')}`
                }
            }).then(() => {
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('name')
                navigate('/login');
            })
        } catch(e) {
            console.log(e)
        }
    }

    /* 
        Objective: When the user clicks the profile button, change the status to the opposit of current: open or closed. 
    */
    const clickProfileIconHandle = async () => {
        setOpen(!open)
    }

    return (
        <div className='Header'>
            <div className='Header-Content'>
                <div className='Header-Logo'>
                    <h1>Task Manager</h1>
                </div>
                <div className='Header-Navigations'>
                    <Link key={Home} to='/home' ><button className={navVal === 1? 'Nav-Active' : 'Nav-Inactive'} >Overview</button></Link>
                    <Link key={Tasks} to='/tasks' ><button className={navVal === 2? 'Nav-Active' : 'Nav-Inactive'} >Tasks</button></Link>
                    <Link key={Home} to='/home' ><button className={navVal === 3? 'Nav-Active' : 'Nav-Inactive'} >Statistics</button></Link>
                </div>
            </div>
            <div className='Header-Profile'>
                <div className='Header-Profile-Buttons'>
                    <Link key={Tasks} to='/tasks' ><button><img src={AddIcon} /></button></Link>
                    <button onClick={clickProfileIconHandle} ><img src={AvatarIcon} /></button>
                    {/* <button onClick={clickLogOutHandler}><img src={AvatarIcon} /></button> */}
                </div>
                <div className={`Header-Profile-Dropdown-Options ${!open? 'Header-Profile-Dropdown-Inactive' : null}`} >
                    <button onClick={clickLogOutHandler}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default Header;