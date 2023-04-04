const {Job} = require('../models/jobs')

const getAllJobs = async (req,res) => {
    try {
        const tasks = await Job.find({});
        res.status(200).json({tasks})

    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    getAllJobs
}