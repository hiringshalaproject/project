const express = require("express");
const router = express.Router()
const {
    getAllEmployees,
} = require('../controllers/employees')

router.get("/", getAllEmployees)

module.exports = router