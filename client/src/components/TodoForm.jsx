import React, { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';

const TodoForm = () => {
    const [task, setTask] = useState('');
    const { addTask } = useContext(ApiContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            addTask(task);
            setTask('');

        } catch (error) {
            console.error('Error Adding tasks:', error);
        }
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={handleSubmit} className='todo-form'>
                <label htmlFor="taskInput"></label>
                <input
                    className='input-field'
                    type="text"
                    id="taskInput"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <button className='add-button' type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TodoForm;
