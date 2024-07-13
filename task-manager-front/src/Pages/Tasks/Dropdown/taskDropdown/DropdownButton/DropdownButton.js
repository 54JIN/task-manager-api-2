import './DropdownButton.css'

function DropdownButton({ open, toggle, priority }) {
    return (
        <div className={`DropdownButton-Task ${open? 'Button-Open-Task' : 'Button-Closed-Task'} ${priority === 2 ? 'DropdownButton-High-Task' : `${priority === 1 ? 'DropdownButton-Medium-Task' : 'DropdownButton-Low-Task' }`}`} onClick={toggle} >
            <p className='DropdownButton-p-Task'>{priority === 2 ? 'High' : `${priority === 1 ? 'Medium' : 'Low'}`}</p>
        </div>
    )   
}

export default DropdownButton;