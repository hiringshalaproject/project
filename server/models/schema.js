const mongoose=require('mongoose');

const JobSchema=new mongoose.Schema({
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

const Job=mongoose.model("Job",JobSchema);

const job1=new Job({
    companyName:"Amazon",
    jobDate:"2023-01-10",
    jobLocation:"Mumbai",
    isExpired:false,
    noOfOpenings:10
})

job1.save();


const JobSeekerSchema=new mongoose.Schema({
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



const JobSeeker=mongoose.model("JobSeeker",JobSeekerSchema);

const seeker1=new JobSeeker({
    name:"Pragya Joshi",
    emailId:"pragya@gmail.com",
    password:"1234",
    collegeName:"STCET",
    contactNumber:"8564237154",
    jobsApplied:[job1._id]  //storing the job id's of the jobs the seeker has applied to
})

// seeker1.jobsApplied.push(job1)

seeker1.save();


const EmployeeSchema=new mongoose.Schema({
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

const Employee=mongoose.model("Employee",EmployeeSchema);

module.exports = {
    Employee : Employee,
    Job : Job,
    JobSeeker : JobSeeker
}

