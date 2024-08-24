import React, { useContext, useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import { ApiContext } from "./context/ApiContext";
import { MdOutlineCancel } from "react-icons/md";

const App = () => {
  const { tasks,fetchTasks ,addTask, deleteTask, updateTask } = useContext(ApiContext);

  useEffect(() => {
    fetchTasks();
  }, [addTask, deleteTask, updateTask]);

  return (
      <div className="main-container">
        <div className="todo-container">
        <TodoForm />
          <div className="todo-list">
              {tasks.length !== 0? tasks.map((task, index) => (
                  <div className="list-item" key={index}><p>{task.text}</p><i onClick={()=>deleteTask(task._id)}><MdOutlineCancel /></i></div>
              )):<p>List is empty</p>}
          </div>
        </div>
      </div>
  );
};

export default App;