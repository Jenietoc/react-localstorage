import TaskRow from "./TaskRow";

const TaskTable = ({tasks, toggleTask, toggleValue = false}) => {

  const taskTablesRow = (doneValue) => {
    return (
      tasks
      .filter(task => task.done === doneValue)
      .map(task => (
        <TaskRow task={task} toggleTask={toggleTask} key={task.name}></TaskRow>
      ))
    )
  }
  return (
    <table className="table table-dark table-striped table-bordered border-secondary">
      <thead>
        <tr className="table-primary">
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>
        {
          taskTablesRow(toggleValue)
        }
      </tbody>
    </table>
  )
};

export default TaskTable