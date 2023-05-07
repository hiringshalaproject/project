const express = require("express");

const router = express.Router();
const {
  getAllEmployees,
  getEmployeeFromId,
  createNewEmployee,
  updateEmployeeWithId,
  deleteEmployee,
  loginEmployee,
} = require("../controllers/employees");

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeFromId);
router.post("/", createNewEmployee);
router.patch("/:id", updateEmployeeWithId);
router.delete("/:id", deleteEmployee);
router.post("/login", loginEmployee);
module.exports = router;
