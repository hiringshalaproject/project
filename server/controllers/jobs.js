const { Jobs } = require("../models/schema");

const getJobs = async (req, res) => {
  try {
    const filters = req.query;
    if (filters.startDate !== null) {
      filters.jobDate = { $gte: filters.startDate };
      filters.startDate = null;
    }
    if (filters.endDate !== null) {
      filters.jobDate = { $lte: filters.endDate };
      filters.endDate = null;
    }
    if (filters.startingSalary !== null) {
      filters.expectedPackage = { $gte: filters.startingSalary };
      filters.startingSalary = null;
    }
    const jobs = await Jobs.find(filters);
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getJobFromId = async (req, res) => {
  try {
    const job = await Jobs.findOne({ _id: req.params.id });
    if (!job) {
      res.status(404).json({ msg: `No job with id ${req.params.id}` });
    } else {
      res.status(200).json({ job });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewJob = async (req, res) => {
  try {
    const job = await Jobs.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateJobWithId = async (req, res) => {
  try {
    const job = await Jobs.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      res.status(404).json({ msg: `No jobs with id ${req.params.id}` });
    } else {
      res.status(200).json({ job });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getJobs,
  createNewJob,
  updateJobWithId,
  getJobFromId,
};
