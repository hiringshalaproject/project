import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert'

function AddJob() {
  const [form, setForm] = useState({});

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/v1/jobs/",form).then((response)=>{
      console.log(response)
      if(response.status==201){
        
        swal({
            title:"Added",
            text:"Job Added Successfully",
            icon:"success",
            button:"OK!"
        })
      }else{
        swal({
          title:"Failed",
          text:"Job Could not be added",
          icon:"error",
          button:"OK"
      })
      }
      setForm({})
    })
    
    document.getElementById("formData").reset();
  };

  return (
    <div>
      
      
      <section className="h-100 h-custom" style={{backgroundColor: '#8fc4b7'}}>
        <div className="container py-5 h-100">
            <Link to="/admin">
                <button className="btn btn-success btn-lg mb-1 position-absolute top-0 end-0" style={{marginTop:'20px',marginRight:'20px'}}>Back to Dashboard</button>
            </Link>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Add a new Job
                  </h3>
                  <form id="formData" className="px-md-2" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Company Name"
                        name="companyName"
                        onChange={handleForm}
                        id="form3Example1q"
                        class="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">
                        Job Requirements
                      </label>
                      <input
                        type="text"
                        placeholder="Enter job requirements"
                        name="jobRequirements"
                        onChange={handleForm}
                        id="form3Example1q"
                        class="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">
                        Job Eligibility
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Eligibility Criteria"
                        name="jobEligibility"
                        onChange={handleForm}
                        id="form3Example1q"
                        class="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">
                        Job Location
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Job Location"
                        name="jobLocation"
                        onChange={handleForm}
                        id="form3Example1q"
                        class="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">
                        Expected Package
                      </label>
                      <input
                        type="number"
                        placeholder="Enter ctc"
                        name="expectedPackage"
                        onChange={handleForm}
                        id="form3Example1q"
                        class="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">
                        Apply Link
                      </label>
                      <input
                        type="url"
                        placeholder="Enter the apply link here"
                        name="applyLink"
                        onChange={handleForm}
                        id="form3Example1q"
                        class="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">
                        Number of Openings
                      </label>
                      <input
                        type="text"
                        placeholder="Enter the number of opening"
                        name="numberOfOpenings"
                        onChange={handleForm}
                        id="form3Example1q"
                        class="form-control"
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1q">
                        Date
                      </label>
                      <input
                        type="date"
                        placeholder="Enter the date"
                        name="jobDate"
                        onChange={handleForm}
                        id="form3Example1q"
                        class="form-control"
                        autoComplete="off"
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-success btn-lg mb-1">
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

export default AddJob;
