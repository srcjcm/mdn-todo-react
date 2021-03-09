import React, {useState} from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

import { nanoid } from "nanoid";

function App(props) {

  //le paso el props inmediatamente al hook
  const [tasks, setTasks] = useState(props.tasks);
  
function toggleTaskCompleted(id){

  const updatedTasks = tasks.map(task => {
    if (id === task.id){
      return {...task, completed: !task.completed}
    }
    return task;
    
  })
  setTasks(updatedTasks)
}
function deleteTask(id){
  const remainingTask = tasks.filter(task => id !== task.id);
  setTasks(remainingTask)

}

  //ahora administro todo del componenete a traves del state que ya se puso en el hook, no por los props
  const taskList = tasks.map(task => (
    <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key = {task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />
  ));

  function addTask(name){
      const newTask = {id: "todo-" + nanoid(), name: name, completed: false};
      setTasks([...tasks, newTask]);
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map(task => {
      if (id === task.id){
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const tasksNoun = taskList.length === 1 ? 'task' : 'tasks';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* Task creation */}
      <Form addTask={addTask}/>
      {/* Filter section */}
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      { 
        // eslint-disable-next-line
      }<ul  
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
