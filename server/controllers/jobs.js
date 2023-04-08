const {Jobs} = require('../models/schema')

const getAllJobs = async (req,res) => {
    try {
        filters = req.query
        if (filters.startDate != null || filters.endDate != null) {
            filters.jobDate = {$gte: filters.startDate, $lte: filters.endDate}
            filters.startDate = null;
            filters.endDate = null;
        }
        if (filters.startingSalary != null) {
            filters.expectedPackage = {$gte: filters.startingSalary}
            filters.startingSalary = null;
        }
        console.log(filters);
        const jobs = await Jobs.find(filters);
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


const updateJobWithId = async (req,res) => {
    try {
        const job = await Jobs.findOneAndUpdate({_id:req.params.id},req.body, {
            new: true,
            runValidators: true
        })
        if(!job)
        {
            return res.status(404).json({msg: `No jobs with id ${req.params.id}`})
        }
        res.status(200).json({job})
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    getAllJobs
,   createNewJob
,   updateJobWithId
}