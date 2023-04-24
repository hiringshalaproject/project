const express = require("express");

const router = express.Router();
const {
  getAllTasks,
  createTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.get("/", getAllTasks);
router.get("/:id", getTask);
router.post("/", createTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
