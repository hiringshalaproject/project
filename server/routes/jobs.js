const express = require("express");
const router = express.Router()
const {
    getJobs,
    createNewJob,
    updateJobWithId,
    getJobFromId
} = require('../controllers/jobs')

router.get("/", getJobs)
router.get("/:id", getJobFromId);
router.post("/", createNewJob)
router.patch("/:id", updateJobWithId)

module.exports = router