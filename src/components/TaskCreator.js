import { useState } from 'react';

const TaskCreator = (props) => {
  const [newTaskName, setNewTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createNewTask(newTaskName);
    setNewTaskName('');
  }

  return (
    <form onSubmit={handleSubmit} className="my-2 row">
      <div className='col-9'>
        <input 
          type="text"   
          placeholder='Enter a new task'
          value={newTaskName} 
          onChange={(e)=> setNewTaskName(e.target.value)}
          className="form-control"
          required={true}
        />
      </div>
      <div className='col-3'>
        <button className='btn btn-primary btn-sm'>Save task</button>
      </div>
    </form>
  )
}

export default TaskCreator;