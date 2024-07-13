import './DropdownContent.css'

function DropdownContent({ open, clickHandler }) {
    const values = [{label: 'High', val: 2}, {label: 'Medium', val: 1}, {label: 'Low', val: 0}]
    return (
        <div className={`DropdownContent-Task ${open? null : 'Content-Closed-Task'}`}>
            {values.map((priority) => (
                <div className='DropdownContent-Item-Task' onClick={() => clickHandler(priority.val)}>
                    <p>{priority.label}</p>
                </div>
            ))}
        </div>
    )
}

export default DropdownContent;