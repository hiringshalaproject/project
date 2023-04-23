const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobDate: Date,
  jobRequirements: String,
  jobEligibility: String,
  jobLocation: String,
  expectedPackage: Number,
  applyLink: String,
  isExpired: {
    type: Boolean,
    default: false,
  },
  numberOfOpenings: Number,
  seekersRegistered: [
    {
      seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seekers",
        required: true,
      },
      shortListedStatus: {
        type: Boolean,
        default: false,
      },
      referralStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
  shortlistedCount: Number,
});

const Jobs = mongoose.model("Jobs", JobSchema);

const JobSeekerSchema = new mongoose.Schema({
  seekerName: {
    type: String,
    required: true,
  },
  seekerEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: false,
  },
  seekerCompanyName: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: Number,
    required: false,
  },
  appliedJobList: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true,
      },
      shortListedStatus: {
        type: Boolean,
        default: false,
      },
      referralStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Seekers = mongoose.model("Seekers", JobSeekerSchema);

const EmployeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  employeeCompanyName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: false,
  },
  listOfJobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
  ],
  totalReferralGiven: Number,
});

const Employees = mongoose.model("Employees", EmployeeSchema);

module.exports = {
  Employees: Employees,
  Jobs: Jobs,
  Seekers: Seekers,
};
