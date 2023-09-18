import { TaskModel } from "../../../db/models/task.model.js"
import { UserModel } from "../../../db/models/user.model.js"

export const addTask = async (req, res, next) => {
    const {title, description, assignTo, deadline} = req.body
    const {id} = req.user
    const assigedTo = await UserModel.findById(assignTo)
    if (!assigedTo) {
        return res.status(400).json({message: "assigned to not found"})
    }
    const task = new TaskModel({
        title, 
        description,
        assignTo, 
        deadline: new Date(deadline),
        createdBy: id
    })
    await task.save()
    return res.status(201).json({message: 'Done', task})
}

export const updateTask = async (req, res, next) => {
    const {taskId} = req.params;
    const {id} = req.user
    const task = await TaskModel.findById(taskId)
    if (!task) {
        return res.status(400).json({message: "task not found"})
    }
    if (task.createdBy.toString() != id.toString()) {
        return res.status(400).json({message: "not allowed"})
    }
    if (req.body.assignTo) {
        const assignedTo = await UserModel.findById(req.body.assignTo)
        if (!assignedTo) {
            return res.status(400).json({message: "assigned to not found"})
        }
    }
    await TaskModel.updateOne({_id: taskId}, req.body)
    return res.status(200).json({message: 'Updated Successfully'})
}

export const deleteTask = async (req, res, next) => {
    const {taskId} = req.params;
    const {id} = req.user
    const task = await TaskModel.findById(taskId)
    if (!task) {
        return res.status(400).json({message: "task not found"})
    }
    if (task.createdBy.toString() != id.toString()) {
        return res.status(400).json({message: "not allowed"})
    }
    await TaskModel.deleteOne({_id: taskId})
    return res.status(200).json({message: 'Deleted Successfully'})
}

export const allTasks = async (req, res, next) => {
    const tasks = await TaskModel.find().populate([
        {
            path: 'createdBy',
            select: "username email phone"
        },
        {
            path: 'assignTo',
            select: 'username email phone'
        }
    ])
    return res.status(200).json({tasks})
}

export const delayTasks = async (req, res, next) => {
    const tasks = await TaskModel.find({
        $and:[
            {deadline: {$lt: Date.now()}},
            {status: {$neq: 'done'}}
        ]
    })
    return res.status(200).json(tasks)
}