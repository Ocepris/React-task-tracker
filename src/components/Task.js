import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, reminder, onToggle}) => {
  return (
    <div
      className={`task ${reminder && 'reminder'}`}
      onDoubleClick={() => onToggle(task.id)}
    >
        <h3>{task.text}<FaTimes className='deleteIcon' onClick={() => onDelete(task.id)}/></h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task