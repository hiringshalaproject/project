const express = require("express");
const router = express.Router();
const {
  getJobs,
  createNewJob,
  updateJobWithId,
  getJobFromId,
  deleteJob,
} = require("../controllers/jobs");

router.post("/", getJobs);
router.get("/:id", getJobFromId);
router.post("/", createNewJob);
router.patch("/:id", updateJobWithId);
router.delete("/:id", deleteJob);

module.exports = router;
