const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/todoapp');

const Task = mongoose.model('Task', { text: String });

app.use(cors())
app.use(express.json());

app.post('/api/addTask', async (req, res) => {
    const { task } = req.body;
    console.log(task)

    try {
        const newTask = new Task({ text: task });
        await newTask.save();
        res.json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Failed to add task' });
    }
});

app.get('/api/getTasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.delete('/api/deleteTask/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.listen(port, () => {
    console.log(`Server running at PORT ${port}`);
});
