const {Jobs} = require('../models/schema')

const getAllJobs = async (req,res) => {
    try {
        const jobs = await Jobs.find({});
        res.status(200).json({jobs})

    } catch (error) {
        res.status(500).json(error)
    }
}

const createNewJob = async (req,res) => {
    try {
        const job = await Jobs.create(req.body)
        res.status(201).json(job)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getAllJobs
,   createNewJob
}