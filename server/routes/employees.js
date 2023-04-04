const express = require("express");
const router = express.Router()
const {
    getAllEmployees,
    getEmployeeFromId,
    createNewEmployee
} = require('../controllers/employees')

router.get("/", getAllEmployees)
router.get("/:id", getEmployeeFromId)
router.post("/", createNewEmployee)

module.exports = router