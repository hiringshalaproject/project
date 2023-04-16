import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';

function GetAllJobs() {

    const [jobs,setJobs]=useState([])

    const GetAllJobs=async()=>{
        const response=await fetch('http://localhost:8000/api/v1/jobs/', {
        method: 'GET',
        });
        const data=await response.json();
        console.log(data);
        setJobs(data);
    }

    useEffect(()=>{
        GetAllJobs();
    },[])

    return (
        <div>
            {
                jobs.map(job=>
                <li key={job._id}>
                {job.companyName}<br/>
                {job.jobRequirements}<br/>
                {job.jobEligibility}<br/>
                {job.jobLocation}<br/>
                {job.expectedPackage}<br/>
                {job.applyLink}<br/>
                {job.numberOfOpenings}<br/>
                {job.jobDate}<br/>
                </li>)
            }
            <Link to='/'>Back to Dashboard</Link>
        </div>
    )
}

export default GetAllJobs