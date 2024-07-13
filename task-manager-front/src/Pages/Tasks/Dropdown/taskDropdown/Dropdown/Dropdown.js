import { useState } from 'react'
import './Dropdown.css'

import DropdownButton from '../DropdownButton/DropdownButton';
import DropdownContent from '../DropdownContent/DropdownContent';

function Dropdown ({ priority, clickPriorityTaskHandler }) {
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => {
        setOpen((open) => !open);
    }
    
    const clickPriorityHandler = (val) => {
        clickPriorityTaskHandler(val).then(() => {
            setOpen((open) => !open);
        })
    }

    return (
        <div className='Dropdown'>
            <DropdownButton open={open} toggle={toggleDropdown} priority={priority} />
            <DropdownContent open={open} clickHandler={clickPriorityHandler} />
        </div>
    )
} 

export default Dropdown;