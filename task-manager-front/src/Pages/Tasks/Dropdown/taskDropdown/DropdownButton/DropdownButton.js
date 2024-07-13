import './DropdownButton.css'

function DropdownButton({ open, toggle, priority }) {
    return (
        <div className={`DropdownButton ${open? 'Button-Open' : 'Button-Closed'} ${priority === 2 ? 'DropdownButton-High' : `${priority === 1 ? 'DropdownButton-Medium' : 'DropdownButton-Low' }`}`} onClick={toggle} >
            <p className='DropdownButton-p'>{priority === 2 ? 'High' : `${priority === 1 ? 'Medium' : 'Low'}`}</p>
        </div>
    )   
}

export default DropdownButton;