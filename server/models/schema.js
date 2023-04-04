const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    jobDate:Date,
    jobRequirements:Array,
    jobEligibility:String,
    jobLocation:String,
    expectedPackage:Number,
    applyLink:String,
    isExpired:Boolean,
    noOfOpenings:Number,
    noOfSeekers:Number,
    shortlistedCount:Number
});

const Jobs = mongoose.model("Jobs",JobSchema);

const JobSeekerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    collegeName: {
        type: String,
        required: false
    },
    companyName: {
        type: String,
        required: false
    },
    contactNumber:{
        type: Number,
        required: false
    },
    jobsApplied:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }]
});



const Seekers = mongoose.model("Seekers",JobSeekerSchema);

const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    emailId:{
        type: String,
        required: true
    },
    password:String,
    companyName:{
        type: String,
        required: true
    },
    referralStatus:String,
    contactNumber:{
        type: Number,
        required: true
    },
    newJobPosts:[JobSchema]
});

const Employees = mongoose.model("Employees",EmployeeSchema);

module.exports = {
    Employees : Employees,
    Jobs : Jobs,
    Seekers : Seekers
}
