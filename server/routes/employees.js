const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Employees } = require("../models/schema");
const {
  getAllEmployees,
  getEmployeeFromId,
  createNewEmployee,
  updateEmployeeWithId,
  deleteEmployee,
  loginEmployee,
} = require("../controllers/employees");

const checkIfUserExists = async (userId) => {
  const user = await Employees.findOne({ _id: userId });
  return user !== null;
};
const authenticateUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    const userExists = await checkIfUserExists(req.userId); // Use req.userId instead of undefined variable userId

    if (userExists) {
      next();
    } else {
      return res.status(401).json({ message: "Please SignUp!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "User is not authenticated" });
  }
};


router.get("/", authenticateUser,getAllEmployees);
router.get("/:id",authenticateUser,getEmployeeFromId);
router.post("/",createNewEmployee);
router.patch("/:id", authenticateUser,updateEmployeeWithId);
router.delete("/:id",deleteEmployee);
router.post("/login",loginEmployee);
module.exports = router;
