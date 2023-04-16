import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AddJob() {

    const [form, setForm] = useState({})

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/v1/jobs/', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <h1>Add a new Job</h1>
            {/* <p>{JSON.stringify(form)}</p> */}
            <form onSubmit={handleSubmit} method='post'>
                <div>
                    <label>Company Name</label>
                    <input type='text' placeholder='Enter Company Name' name='companyName' onChange={handleForm} />
                </div>
                <div>
                    <label>Job Requirements</label>
                    <input type='text' placeholder='Enter job requirements' name='jobRequirements' onChange={handleForm} />
                </div>
                <div>
                    <label>Eligibility Criteria</label>
                    <input type='text' placeholder='Enter Eligibility Criteria' name='jobEligibility' onChange={handleForm} />
                </div>
                <div>
                    <label>Job Location</label>
                    <input type='text' placeholder='Enter Job Location' name='jobLocation' onChange={handleForm} />
                </div>
                <div>
                    <label>Expected Package</label>
                    <input type='number' placeholder='Enter ctc' name='expectedPackage' onChange={handleForm} />
                </div>
                <div>
                    <label>Apply Link</label>
                    <input type='text' placeholder='Enter the apply link here' name='applyLink' onChange={handleForm} />
                </div>
                <div>
                    <label>Number of vacancy</label>
                    <input type='text' placeholder='Enter the number of opening' name='numberOfOpenings' onChange={handleForm} />
                </div>
                <div>
                    <label>Date of publish</label>
                    <input type='date' placeholder='Enter the date' name='jobDate' onChange={handleForm} />
                </div>
                <div>
                    <input type='Submit' />
                </div>
            </form>

            <Link to='/'>Back to Dashboard</Link>
        </div>
    )
}

export default AddJob