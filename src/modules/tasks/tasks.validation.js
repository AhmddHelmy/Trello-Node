import Joi from "joi";

export const addTaskSchema = Joi.object({
    title: Joi.string().min(3).max(1000),
    description: Joi.string(),
    assignTo: Joi.string().length(24).required(),
    deadline: Joi.date(),
}).required()

export const updateTaskSchema = Joi.object({
    taskId: Joi.string().required(),
    title: Joi.string().min(3).max(1000),
    description: Joi.string(),
    assignTo: Joi.string().length(24),
    deadline: Joi.date(),
    status: Joi.string().valid('toDo', 'done', 'doing')
}).required()

export const deleteTaskSchema = Joi.object({
    taskId: Joi.string().length(24).required(),
}).required()