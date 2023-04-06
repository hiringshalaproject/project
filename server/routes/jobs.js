const express = require("express");
const router = express.Router()
const {
    getAllJobs,
    createNewJob,
    updateJobWithId
} = require('../controllers/jobs')

router.get("/", getAllJobs)
router.post("/", createNewJob)
router.patch("/:id", updateJobWithId)

module.exports = router