import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function AddJob() {
  const [form, setForm] = useState({});

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const renderInput = (label, name, type, placeholder) => {
    return (
      <>
        <label className="form-label" htmlFor="form3Example1q">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handleForm}
          id="form3Example1q"
          className="form-control"
          autoComplete="off"
        />
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/v1/jobs/create", form)
      .then((response) => {
        if (response.status === 201) {
          swal({
            title: "Added",
            text: "Job Added Successfully",
            icon: "success",
            button: "OK!",
          });
        } else {
          swal({
            title: "Failed",
            text: "Job Could not be added",
            icon: "error",
            button: "OK",
          });
        }
        setForm({});
      });

    document.getElementById("formData").reset();
  };

  return (
    <div>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#8fc4b7" }}
      >
        <div className="container py-5 h-100">
          <Link to="/admin">
            <button
              className="btn btn-success btn-lg mb-1 position-absolute top-0 end-0"
              style={{ marginTop: "20px", marginRight: "20px" }}
            >
              Back to Dashboard
            </button>
          </Link>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Add a new Job
                  </h3>
                  <form
                    id="formData"
                    className="px-md-2"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Company Name",
                        "companyName",
                        "text",
                        "Enter Company Name"
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Job Requirements",
                        "jobRequirements",
                        "text",
                        "Enter job requirements"
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Job Eligibility",
                        "jobEligibility",
                        "text",
                        "Enter Eligibility Criteria"
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Job Location",
                        "jobLocation",
                        "text",
                        "Enter Job Location"
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Expected Package",
                        "expectedPackage",
                        "number",
                        "Enter ctc"
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Apply Link",
                        "applyLink",
                        "url",
                        "Enter the apply link here"
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput(
                        "Number of Openings",
                        "numberOfOpenings",
                        "text",
                        "Enter the number of opening"
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      {renderInput("Date", "jobDate", "date", "Enter the date")}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1"
                    >
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
