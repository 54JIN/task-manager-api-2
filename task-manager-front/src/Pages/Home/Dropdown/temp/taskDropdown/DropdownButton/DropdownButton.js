import './DropdownButton.css'

const DropdownButton = ({ children, open, toggle })  => {
    return (
        <div onClick={toggle} className={`dropdown-btn ${open? "button-open" : null}`}>
            <p>{children}</p>
            <span className='toggle-icon'></span>
        </div>
    )
}

export default DropdownButton;