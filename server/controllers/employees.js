const {Employees} = require('../models/schema')

const getAllEmployees = async (req,res) => {
    try {
        const tasks = await Employees.find({});
        res.status(200).json({tasks})

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getAllEmployees
}