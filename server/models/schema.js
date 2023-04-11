const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobId:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    jobDate:Date,
    jobRequirements:String,
    jobEligibility:String,
    jobLocation:String,
    expectedPackage:Number,
    applyLink:String,
    isExpired:{
        type : Boolean,
        default : false
    },
    numberOfOpenings:Number,
    seekersRegistered:[{ 
        seekerid:{
            type:String,
            required:true
        },
        referralStatus:{
            type:Boolean,
            default:false
        }
    }],
    shortlistedCount:Number
});

const Jobs = mongoose.model("Jobs",JobSchema);

const JobSeekerSchema = new mongoose.Schema({
    seekerId:{
        type: String,
        required: true
    },
    seekerName: {
        type: String,
        required: true
    },
    seekerEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    resumeUrl:{
        type:String,
        required:true
    },
    collegeName: {
        type: String,
        required: false
    },
    seekerCompanyName: {
        type: String,
        required: false
    },
    contactNumber:{
        type: Number,
        required: false
    },
    appliedJobList:[{
        jobid: {
            type: String,
            required:true
        },
        referralStatus:{
            type:Boolean,
            default:false
        }
    }]
   
});

const Seekers = mongoose.model("Seekers",JobSeekerSchema);


const EmployeeSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true
    },
    employeeName:{
        type: String,
        required: true
    },
    emailId:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: false
    },
    employeeCompanyName:{
        type: String,
        required: true
    },
    contactNumber:{
        type: Number,
        required: false
    },
    listOfJobsPosted:[{
        jobid: {
            type: String,
            required:true
        }
    }],
    totalReferralGiven:Number
});

const Employees = mongoose.model("Employees",EmployeeSchema);

module.exports = {
    Employees : Employees,
    Jobs : Jobs,
    Seekers : Seekers
}

