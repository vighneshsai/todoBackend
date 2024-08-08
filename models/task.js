// server/models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
