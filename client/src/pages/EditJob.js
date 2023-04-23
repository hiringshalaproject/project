import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";

function EditJob() {

    const location = useLocation();
    const job = location.state?.job;

    const [jobStatus,setJobStatus]=useState(false)

    const [form, setForm] = useState({})
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck=(e)=>{
        setJobStatus(e.target.checked);
    }


    const handleSubmit = async (e,id) => {
        e.preventDefault();
        
        form['isExpired']=jobStatus
  
        console.log("Updated Form Data",form)
        const url=`http://localhost:8000/api/v1/jobs/${id}`;

        axios.patch(url,form).then(response=>{
            if(response.status===200){
                swal({
                    title:"Updated",
                    text:"Job Updated Successfully",
                    icon:"success",
                    button:"OK!"
                })
                setForm({})
            }else{
                swal({
                    title:"Update Failed",
                    text:"Job Updation Failed",
                    icon:"error",
                    button:"OK"
                })
            }
        })

        // headers: {
        //     'Content-type': 'application/json; charset=UTF-8',
        //   }
        
        document.getElementById("formData").reset();
    }



    return (
        <div>
            <section class="h-100 h-custom" style={{ backgroundColor: '#8fc4b7' }}>
                <div class="container py-5 h-100">
                    <Link to="/admin">
                        <button class="btn btn-success btn-lg mb-1 position-absolute top-0 end-0" style={{ marginTop: '20px', marginRight: '20px' }}>Back to Dashboard</button>
                    </Link>
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-8 col-xl-6">
                            <div class="card rounded-3">
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                                        Edit Job Details
                                    </h3>
                                    <form id="formData" class="px-md-2" autocomplete="off" onSubmit={(e)=>handleSubmit(e,job._id)}>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1q">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Company Name"
                                                name="companyName"
                                                defaultValue={job.companyName}
                                                onChange={handleForm}
                                                id="form3Example1q"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1q">
                                                Job Requirements
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter job requirements"
                                                name="jobRequirements"
                                                defaultValue={job.jobRequirements}
                                                onChange={handleForm}
                                                id="form3Example1q"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1q">
                                                Job Eligibility
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Eligibility Criteria"
                                                name="jobEligibility"
                                                defaultValue={job.jobEligibility}
                                                onChange={handleForm}
                                                id="form3Example1q"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1q">
                                                Job Location
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Job Location"
                                                name="jobLocation"
                                                defaultValue={job.jobLocation}
                                                onChange={handleForm}
                                                id="form3Example1q"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1q">
                                                Expected Package
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter ctc"
                                                name="expectedPackage"
                                                defaultValue={job.expectedPackage}
                                                onChange={handleForm}
                                                id="form3Example1q"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1q">
                                                Apply Link
                                            </label>
                                            <input
                                                type="url"
                                                placeholder="Enter the apply link here"
                                                name="applyLink"
                                                defaultValue={job.applyLink}
                                                onChange={handleForm}
                                                id="form3Example1q"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1q">
                                                Number of Openings
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter the number of opening"
                                                name="numberOfOpenings"
                                                defaultValue={job.numberOfOpenings}
                                                onChange={handleForm}
                                                id="form3Example1q"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1q">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                placeholder="Enter the date"
                                                name="jobDate"
                                                defaultValue={job.jobDate.substring(0, 10)}
                                                onChange={handleForm}
                                                id="form3Example1q"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" name="isExpired" type="checkbox" value="" id="flexCheckDefault" onChange={handleCheck}  />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Job Expired
                                            </label>
                                        </div>
                                        <button type="submit" class="btn btn-success btn-lg mb-1" >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}

export default EditJob;
