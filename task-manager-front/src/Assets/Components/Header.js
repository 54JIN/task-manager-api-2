import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import Home from '../../Pages/Home/Home'
import Tasks from '../../Pages/Tasks/Tasks'

import AvatarIcon from '../Images/AvatarIcon.png'
import AddIcon from '../Images/AddIcon.png'

import './Header.css'

function Header ({ navVal }) {
    const [navActive, setNavActive] = useState(navVal);

    const navigate = useNavigate();

    const handleNavClick = (num) => {
        setNavActive(num);
    }

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

    return (
        <div className='Header'>
            <div className='Header-Content'>
                <div className='Header-Logo'>
                    <h1>Task Manager</h1>
                </div>
                <div className='Header-Navigations'>
                    <Link key={Home} to='/home' ><button className={navActive === 1? 'Nav-Active' : 'Nav-Inactive'} >Overview</button></Link>
                    <Link key={Tasks} to='/tasks' ><button className={navActive === 2? 'Nav-Active' : 'Nav-Inactive'} >Tasks</button></Link>
                    <Link key={Home} to='/home' ><button className={navActive === 3? 'Nav-Active' : 'Nav-Inactive'} >Statistics</button></Link>
                </div>
            </div>
            <div className='Header-Profile'>
                <Link key={Tasks} to='/tasks' ><button><img src={AddIcon} /></button></Link>
                <button onClick={clickLogOutHandler}><img src={AvatarIcon} /></button>
            </div>
        </div>
    )
}

export default Header;