const { Jobs, Seekers } = require("../models/schema");

const getSeekers = async (req, res) => {
  try {
    filters = req.query;
    jobId = filters.jobId;
    if (!jobId) {
      const seekers = await Seekers.find({});
      return res.status(200).json(seekers); //changed
    }
    const jobDetails = await Jobs.findOne({ _id: jobId });
    if (!jobDetails) {
      return res.status(404).json({ msg: `No Job with id ${jobId}` });
    }
    const seekersListObj = jobDetails.seekersRegistered;
    referralStatus = filters.referralStatus;
    shortListedStatus = filters.shortListedStatus;
    let seekerIds = [];
    if (referralStatus === "false" && !shortListedStatus) {
      return res
        .status(500)
        .json({ error: "shortListedStatus is missing from request" });
    }
    seekersListObj.forEach(function (el, _index) {
      if (!referralStatus && !shortListedStatus) seekerIds.push(el.seekerId);
      else if (referralStatus === "true" && el.referralStatus === true)
        seekerIds.push(el.seekerId);
      else if (shortListedStatus === "true" && el.shortListedStatus === true)
        seekerIds.push(el.seekerId);
    });
    console.log(seekerIds);
    if (seekerIds == []) {
      return res
        .status(200)
        .json({ msg: `No Seekers registered with id ${jobId}` });
    }
    const seekers = await Seekers.find({ _id: { $all: seekerIds } });
    if (!seekers) {
      return res.status(404).json({ msg: `No Seekers found` });
    }
    res.status(200).json({ seekers });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSeekerFromId = async (req, res) => {
  try {
    const seeker = await Seekers.findOne({ _id: req.params.id });
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No seeker with id ${req.params.id}` });
    }
    res.status(200).json({ seeker });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createNewSeeker = async (req, res) => {
  try {
    const seeker = await Seekers.create(req.body);
    res.status(201).json(seeker);
  } catch (error) {
    res.status(500).json(error);
  }
};

const uploadResume = async (req, res) => {
  const seekerId = req.body.seekerId;
  try {
    const updatedJobSeeker = await Seekers.findOneAndUpdate(
      { _id: seekerId },
      { resumeUrl: req.file.location },
      { new: true }
    );
    if (!updatedJobSeeker) {
      return res.status(404).json({ msg: `No seekers with id ${seekerId}` });
    }
    res.send("Resume URL updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating resume URL");
  }
};

const getSeekerResume = async (req, res) => {
  try {
    const seeker = await Seekers.findOne({ _id: req.params.seekersId });
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No seeker with id ${req.params.seekersId}` });
    }
    res.status(200).json({ seekerResume: seeker.resumeUrl });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSeeker = async (req, res) => {
  try {
    const seeker = await Seekers.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No Seekers with id ${req.params.id}` });
    }
    res.status(200).json({ seeker });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSeekersJobStatus = async (req, res) => {
  try {
    const seekerId = req.params.id; //get from body
    const jobId = req.body.jobId;
    let shortListedStatus = req.body.shortListedStatus;
    let referralStatus = req.body.referralStatus;
    if (shortListedStatus == null) {
      res.status(500).json({ error: "shortListedStatus is missing from body" });
    }
    if (referralStatus == null) {
      referralStatus = false;
    }
    console.log(referralStatus);
    const seeker = await Seekers.findOneAndUpdate(
      { _id: seekerId },
      {
        $set: {
          "appliedJobList.$[el].shortListedStatus": shortListedStatus,
          "appliedJobList.$[el].referralStatus": referralStatus,
        },
      },
      {
        arrayFilters: [{ "el.jobId": jobId }],
        new: true,
        runValidators: true,
      }
    );
    const job = await Jobs.findOneAndUpdate(
      { _id: jobId },
      {
        $set: {
          "seekersRegistered.$[el].shortListedStatus": shortListedStatus,
          "seekersRegistered.$[el].referralStatus": referralStatus,
        },
      },
      {
        arrayFilters: [{ "el.seekerId": seekerId }],
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ seeker, job });
  } catch (error) {
    res.status(500).json(error);
  }
};

const applyForJob = async (req, res) => {
  try {
    const jobId = req.body.jobId;
    const seekerId = req.params.id; //getfrom body
    const newJob = { jobId: jobId };
    const seeker = await Seekers.findOneAndUpdate(
      { _id: seekerId },
      { $push: { appliedJobList: newJob } },
      { new: true, runValidators: true }
    );
    const newSeeker = { seekerId: seekerId };
    const job = await Jobs.findOneAndUpdate(
      { _id: jobId },
      { $push: { seekersRegistered: newSeeker } },
      { new: true, runValidators: true }
    );
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No seeker with id ${req.params.id}` });
    }
    if (!job) {
      return res.status(404).json({ msg: `No job with id ${jobId}` });
    }
    res.status(200).json({ seeker: seeker, job: job });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSeeker = async (req, res) => {
  try {
    const seeker = await Seekers.findOneAndDelete({ _id: req.params.id });
    if (!seeker) {
      return res
        .status(404)
        .json({ msg: `No seeker with id ${req.params.id}` });
    }
    res.status(200).json({ msg: "Seeker deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getSeekers,
  getSeekerFromId,
  createNewSeeker,
  uploadResume,
  getSeekerResume,
  applyForJob,
  updateSeekersJobStatus,
  updateSeeker,
  deleteSeeker,
};
