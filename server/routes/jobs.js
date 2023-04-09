const express = require("express");
const router = express.Router()
const {
    getJobs,
    createNewJob,
    updateJobWithId
} = require('../controllers/jobs')

router.get("/", getJobs)
router.post("/", createNewJob)
router.patch("/:id", updateJobWithId)

module.exports = router