const express = require("express");
const router = express.Router()
const {
    getAllJobs,
} = require('../controllers/schema')

router.get("/", getAllJobs)

module.exports = router