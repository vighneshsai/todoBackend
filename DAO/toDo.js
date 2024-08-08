import Task from "../models/task.js";

export const addTaskData = async (req, res) => {
    const { name, taskName, description, dueDate, status } = req.body
    const task = new Task({ name, taskName, description, dueDate, status });
    try {
        const newTask = await task.save();
        res.status(201).send("Task created successFully");
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

export const getTasks = async (req, res) => {
    const { page, limit, search, sort, order } = req.query;
    const query = {
        $or: [
            { taskName: new RegExp(search, 'i') },
            { name: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { status: new RegExp(search, 'i') },
        ],
    };
    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;

    try {
        let taskQuery = Task.find(query).limit(limit * 1).skip(skip);
        // Conditionally apply sorting
        if (sort) {
            taskQuery = taskQuery.sort({ [sort]: sortOrder });
        }
        const tasks = await taskQuery.exec();

        const count = await Task.countDocuments(query);
        res.json({
            tasks,
            totalPages: Math.ceil(count / limit),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateTasks = async (req, res) => {
    const { id } = req.query;
    const { name, taskName, description, dueDate, status } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                name,
                taskName,
                description,
                dueDate,
                status,
            },
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const deleteTasks = async (req, res) => {
    const { id } = req.query;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}