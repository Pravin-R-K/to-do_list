import { TaskModel } from "../models/TaskModel.js";

export const addTask = async (req, res) => {
    try {
        let task = new TaskModel(req.body);
        await task.save();
        res.json(true);
    } catch (error) {
        res.json({ error: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        let task = await TaskModel.find({
            taskOwner: req.query.taskOwner,
            priority: req.query.priority,
        });
        res.json(task);
    } catch (error) {
        res.json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        const task = await TaskModel.findByIdAndUpdate(id, data);
        if (task) {
            res.json(true);
        } else {
            res.json({ error: "Error Occured!" });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        let task = await TaskModel.findByIdAndDelete(req.params.id);
        res.json(true);
    } catch (error) {
        res.json({ error: error.message });
    }
};
