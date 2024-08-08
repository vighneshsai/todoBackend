import { addTaskData, deleteTasks, getTasks, updateTasks } from "../DAO/toDo.js";

export function addData(req, res) {
    try {
        return addTaskData(req, res);
    } catch (err) {
        return new Error(err);
    }
}

export function getTask(req, res) {
    try {
        return getTasks(req, res);
    } catch (err) {
        return new Error(err);
    }
}

export function updateTask(req, res) {
    try {
        return updateTasks(req, res);
    } catch (err) {
        return new Error(err);
    }
}

export function deleteTask(req, res) {
    try {
        return deleteTasks(req, res);
    } catch (err) {
        return new Error(err);
    }
}