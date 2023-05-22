const { Employees } = require("../models/schema");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEmployeeFromId = async (req, res) => {
  try {
    const employee = await Employees.findOne({ _id: req.params.id });
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewEmployee = async (req, res) => {
  try {
    const { employeeEmail } = req.body;
    const existingEmployee = await Employees.findOne({ employeeEmail });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ msg: "Employee with this email already exists" });
    }
    const employee = await Employees.create(req.body);
    res.status(201).json({ msg: "User Created Succesfully", employee });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateEmployeeWithId = async (req, res) => {
  try {
    const employee = await Employees.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!employee) {
      res.status(404).json({ msg: `No employee with id ${req.params.id}` });
    } else {
      res.status(200).json({ employee });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employees.findOneAndDelete({ _id: req.params.id });
    if (!employee) {
      return res
        .status(404)
        .json({ msg: `No employee with id ${req.params.id}` });
    }
    res.status(200).json({ msg: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginEmployee = async (req, res) => {
  try {
    const { email, password, isGoogleLogin } = req.body;
    const employee = await Employees.findOne({ employeeEmail: email });
    if (!employee) {
      if (isGoogleLogin) {
        req.body.employeeEmail = email;
        return createNewEmployee(req, res);
      }
      return res.status(404).json({ msg: `No Employee with email ${email}` });
    }

    if (!password && isGoogleLogin) {
      return res.status(200).json({ msg: "Login successful", employee });
    }

    const isMatch = password === employee.password; // await bcrypt.compare(password, seeker.password);
    if(employee && !isMatch)
    {
      return res.status(401).json({ msg: "Login Through Google or Signup using this email" });
    }
    else if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
    res.status(200).json({ msg: "Login successful", employee });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeFromId,
  createNewEmployee,
  updateEmployeeWithId,
  deleteEmployee,
  loginEmployee,
};
