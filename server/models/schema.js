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
    isExpired:Boolean,
    numberOfOpenings:Number,
    // seekersRegistered:[{ type: mongoose.Schema.Types.SeekerId, ref: 'Seekers' }],
    shortlistedCount:Number
});

const Jobs = mongoose.model("Jobs",JobSchema);

const job1=new Jobs({
    jobId:"j1101",
    companyName:"Amazon",
    jobDate:"2023-01-10",
    jobLocation:"Mumbai",
    isExpired:false,
    numberOfOfOpenings:10
})

job1.save();

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
            type: String, ref: 'Jobs'
        },
        referralStatus:Boolean
    }]
   
});

const Seekers = mongoose.model("Seekers",JobSeekerSchema);

const appliedJobInfo={
    jobid:job1.jobId,
    referralStatus:false
}


const seeker1=new Seekers({
    seekerId:"s2301",
    seekerName:"Pragya Joshi",
    seekerEmail:"pragya@gmail.com",
    password:"1234",
    collegeName:"STCET",
    contactNumber:8564237154,
    appliedJobList:[appliedJobInfo]  //storing the job id's of the jobs the seeker has applied to
})


seeker1.save();

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
    employeeCompany:{
        type: String,
        required: true
    },
    contactNumber:{
        type: Number,
        required: false
    },
    listOfJobsPosted:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' }],
    // seekersReferred=[{type: mongoose.Schema.Types.ObjectId,ref: 'Jobs']},
    totalReferralGiven:Number
});

const Employees = mongoose.model("Employees",EmployeeSchema);

module.exports = {
    Employees : Employees,
    Jobs : Jobs,
    Seekers : Seekers
}

