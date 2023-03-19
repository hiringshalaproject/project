const Task = require('../models/task')

const getAllTasks = async (req,res) => {
    try {
        const allTasks = await Task.find({});
        res.status(200).json({allTasks})

    } catch (error) {
        res.status(500).json(error)
    }
}

const createTasks = async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)

    } catch (error) {
        res.status(500).json(error)
    }
}

const getTask = async (req,res) => {
    try {
        const task = await Task.findOne({_id:req.params.id})
        if(!task)
        {
            return res.status(404).json({msg: `No task with id ${req.params.id}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateTask = (req,res) => {
    res.send("Update a Single task")
}

const deleteTask = async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id})
        if(!task)
        {
            return res.status(404).json({msg: `No task with id ${req.params.id}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTask,
    deleteTask
}