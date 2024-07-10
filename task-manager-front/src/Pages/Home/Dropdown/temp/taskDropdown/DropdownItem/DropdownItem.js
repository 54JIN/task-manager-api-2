import './DropdownItem.css'

const DropdownItem = ({ children, onClick }) => {
    return (
        <div className='dropdown-item' onCLick={onClick}>
            <p>{children}</p>
        </div>
    )
}

export default DropdownItem;