import React, {useState} from 'react';

import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import './App.css';

function App() {

  //Task (ToDO List) State
  const[toDo, setToDO] = useState([]);

  //Tem State
  const [newTask, setNewTask]= useState('');
  const [updateData, setUpdateData] = useState('');

  //Add task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = {id: num, title: newTask, status: false}
      setToDO([...toDo, newEntry])
      setNewTask('');
    }
  }

  // Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDO(newTasks);
  }

  // Mark task as done or completed
  const markDone = (id) => {
    let newTask = toDo.map( task => {
      if( task.id === id){
        return ({...task, status: !task.status})
      }
      return task;
    })
    setToDO(newTask);
  }

  // Cancel updated task
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // Change task for update
  const changeTask = (e) =>{
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status:  updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // Update Task
  const updateTask = (id) =>{
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDO(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">

    <br /><br />
    <h2>To Do List App</h2>
    <br /><br />

  
  {updateData && updateData ? (
    <UpdateForm
      updateData={updateData}
      changeTask = {changeTask}
      updateTask = {updateTask}
      cancelUpdate = {cancelUpdate}
    />
  ) : (
    <AddTaskForm 
      newTask={newTask}
      setNewTask = {setNewTask}
      addTask = {addTask}
    />

  )}

    {/* Diplay ToDos*/}

    {toDo && toDo.length ? '' : 'No Task....'}

    <ToDo
      toDo = {toDo}
      markDone = {markDone}
      setUpdateData = {setUpdateData}
      deleteTask = {deleteTask}
    />
       
    </div>
  );
}

export default App;
