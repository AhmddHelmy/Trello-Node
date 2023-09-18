import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuth.js";
import { addTask, allTasks, delayTasks, deleteTask, updateTask } from "./tasks.controller.js";
import { validation } from "../../middlewares/validation.js";
import { addTaskSchema, deleteTaskSchema, updateTaskSchema } from "./tasks.validation.js";

export const tasksRouter = Router()

tasksRouter.post('/add-task', validation(addTaskSchema), isAuthenticated, addTask)

tasksRouter.put('/:taskId/update-task', validation(updateTaskSchema), isAuthenticated, updateTask)

tasksRouter.delete(':/taskId/delete-task', validation(deleteTaskSchema)), isAuthenticated, (deleteTask)

tasksRouter.get('/all-tasks', allTasks)

tasksRouter.get('/delay-tasks', delayTasks)
