import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import Tasks from '../../Pages/Tasks/Tasks'
import Home from '../../Pages/Home/Home'

import AvatarIcon from '../Images/AvatarIcon.png'
import AddIcon from '../Images/AddIcon.png'

import './Header.css'

function Header () {
    const [navActive, setNavActive] = useState(1);

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
                    <Link key={Home} to='/home' ><button className={navActive === 1? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(1)}>Projects</button></Link>
                    <Link key={Home} to='/home' ><button className={navActive === 2? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(2)}>Statistics</button></Link>
                    <Link key={Home} to='/home' ><button className={navActive === 3? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(3)}>User</button></Link>
                    <Link key={Home} to='/home' ><button className={navActive === 4? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(4)}>Files</button></Link>
                    <Link key={Home} to='/home' ><button className={navActive === 5? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(5)}>Settings</button></Link>
                    {/* <button className={navActive === 2? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(2)}>Statistics</button>
                    <button className={navActive === 3? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(3)}>User</button>
                    <button className={navActive === 4? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(4)}>Files</button>
                    <button className={navActive === 5? 'Nav-Active' : 'Nav-Inactive'} onClick={() => handleNavClick(5)}>Settings</button> */}
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