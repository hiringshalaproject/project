const express = require("express");
const router = express.Router()
const {
    getAllEmployees,
    getEmployeeFromId,
    createNewEmployee,
    updateEmployeeWithId
} = require('../controllers/employees')

router.get("/", getAllEmployees)
router.get("/:id", getEmployeeFromId)
router.post("/", createNewEmployee)
router.patch("/:id", updateEmployeeWithId)

module.exports = router