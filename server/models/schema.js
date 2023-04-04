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

const Job = mongoose.model("Job",JobSchema);

const JobSeekerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    emailId:{
        type: String,
        required: true
    },
    password:String,
    collegeName:String,
    companyName:String,
    contactNumber:{
        type: Number,
        required: true
    },
    jobsApplied:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});



const JobSeeker = mongoose.model("JobSeeker",JobSeekerSchema);

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

const Employee = mongoose.model("Employee",EmployeeSchema);

module.exports = {
    Employee : Employee,
    Job : Job,
    JobSeeker : JobSeeker
}

module.exports = {
    Employee : Employee,
    Job : Job,
    JobSeeker : JobSeeker
}

