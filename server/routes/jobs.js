const express = require("express");
const router = express.Router()
const {
    getAllJobs,
    createNewJob
} = require('../controllers/jobs')

router.get("/", getAllJobs)
router.post("/", createNewJob)

module.exports = router