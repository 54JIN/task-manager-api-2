import { useState } from 'react'
import './Dropdown.css'

import DropdownButton from '../DropdownButton/DropdownButton';
import DropdownContent from '../DropdownContent/DropdownContent';

function Dropdown ({ priority, clickPriorityTaskHandler }) {
    const [open, setOpen] = useState(false);
    const [prio, setPrio] = useState(priority);

    const toggleDropdown = () => {
        setOpen((open) => !open);
    }
    
    const clickPriorityHandler = (val) => {
        clickPriorityTaskHandler(val).then(() => {
            setOpen((open) => !open);
            setPrio(val);
        })
    }

    return (
        <div className='Dropdown'>
            <DropdownButton open={open} toggle={toggleDropdown} priority={prio} />
            <DropdownContent open={open} clickHandler={clickPriorityHandler} />
        </div>
    )
} 

export default Dropdown;