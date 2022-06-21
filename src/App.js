import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import TaskCreator from './components/TaskCreator';
import TaskTable from './components/TaskTable';
import VisibilityControl from './components/VisibilityControl';
import Container from './components/Container';

function App() {

  const [taskItems, setTasksItems] = useState([]);

  const [showCompleted, setShowCompleted] = useState(false);

  const [countCheckTasks, setCountCheckTasks] = useState(0);

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data){
      setTasksItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
    countCheck();
  }, [taskItems]);

  const countCheck = () => {
    setCountCheckTasks(taskItems.filter(task => task.done === true).length);
  }
  
  const createNewTask = (taskName) => {
    if (!taskItems.find(task => task.name === taskName)){
      const task = {
        name: taskName,
        done: false,
      }
      setTasksItems([...taskItems, task]);
    }
  }

  const toggleTask = (task) => {
    setTasksItems(
      taskItems.map(eachTask => (task.name === eachTask.name) ? {...eachTask, done: !eachTask.done} : eachTask)
    );
  }

  const cleanTasks = () => {
    setTasksItems(taskItems.filter(task => !task.done));
    setShowCompleted(false);
  }

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask}></TaskCreator>
        <TaskTable tasks={taskItems} toggleTask={toggleTask}> </TaskTable>
        {
          countCheckTasks > 0 && (
            <VisibilityControl
              isChecked={showCompleted}
              setShowCompleted={(checked) => setShowCompleted(checked)} 
              cleanTasks={cleanTasks}>
            </VisibilityControl> 
          )
        }     
        {
          showCompleted && (
            <TaskTable tasks={taskItems} toggleTask={toggleTask} toggleValue={showCompleted}> </TaskTable>
          )
        }
      </Container>
    </main>
  );
}

export default App;
