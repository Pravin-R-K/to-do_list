import express from "express";
import {
    addTask,
    deleteTask,
    getTask,
    updateTask,
} from "../controllers/TaskController.js";

const TaskRouter = express.Router();

TaskRouter.post("/", addTask);
TaskRouter.get("/", getTask);
TaskRouter.patch("/:id", updateTask);
TaskRouter.delete("/:id", deleteTask);

export default TaskRouter;
