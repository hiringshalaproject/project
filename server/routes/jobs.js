const express = require("express");
const router = express.Router()
const {
    getAllJobs,
} = require('../controllers/jobs')

router.get("/", getAllJobs)

module.exports = router