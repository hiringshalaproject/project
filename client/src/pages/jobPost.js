
import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../pages/jobPost.css"
import "../pages/index.css"
import { toast } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const JobPost = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [keyQualifications, setKeyQualifications] = useState("");
    const [amount, setAmount] = useState("");
    const [employementType, setEmployementType] = useState("");
    const [selectedOption, setSelectedOption] = useState("yearly");
    const [additionalRequirement, setAdditionalRequirement] = useState("");
    const [isFormComplete, setIsFormComplete] = useState(false);


    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        const checkboxId = e.target.id;
        
        if (checkboxId === "checkbox1") {
          setEmployementType("Full-time");
        } else if (checkboxId === "checkbox2") {
          setEmployementType("Internship");
        } else if (checkboxId === "checkbox3") {
          setEmployementType("Part-time");
        } else if (checkboxId === "checkbox4") {
          setEmployementType("Contract");
        }
        
        checkFormCompletion();
    };

    const handleJobTitleChange = (e) => {
        setJobTitle(e.target.value);
        checkFormCompletion();

    };

    const handleJobPositionChange = (e) => {
        setJobPosition(e.target.value);
        checkFormCompletion();
    };

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value);
        checkFormCompletion();

    };
    const handleKeyQualificationChange = (e) => {
        setKeyQualifications(e.target.value);
        checkFormCompletion();

    }
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        checkFormCompletion();
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        checkFormCompletion();
    };
    const handleAdditionalRequirementChange = (e) => {
        setAdditionalRequirement(e.target.value);
    };
    const handleSaveAsDraft = () => {
        // Logic for saving as draft
    };
    function validateForm() {
        // Get references to the checkboxes
        var checkbox1 = document.getElementById("checkbox1");
        var checkbox2 = document.getElementById("checkbox2");
        var checkbox3 = document.getElementById("checkbox3");
        var checkbox4 = document.getElementById("checkbox4");

        if (
            checkbox1.checked ||
            checkbox2.checked ||
            checkbox3.checked ||
            checkbox4.checked
        ) {

            return true;
        }
        return false;
    }
    function validateSalForm() {
        var checkbox5 = document.getElementById("checkbox5");
        var checkbox6 = document.getElementById("checkbox6");
        var checkbox7 = document.getElementById("checkbox7");
        var checkbox8 = document.getElementById("checkbox8");

        if (
            checkbox5.checked ||
            checkbox6.checked ||
            checkbox7.checked ||
            checkbox8.checked
        ) {
            return true;
        }
        return false;
    }



    const checkFormCompletion = () => {
        const isJobTitleFilled = jobTitle.trim() !== '';
        const isJobDescriptionFilled = jobDescription.trim() !== '';
        const isKeyQualificationsFilled = keyQualifications.trim() !== '';
        const isEmploymentTypeFilled = validateForm();
        const isSalaryOptionChange = validateSalForm();
        const isamountFilled = amount.trim() !== '';
        const isFormComplete = isJobTitleFilled && isJobDescriptionFilled && isKeyQualificationsFilled && isEmploymentTypeFilled
            && isSalaryOptionChange && isamountFilled;
        setIsFormComplete(isFormComplete);
    };

    const handleAmountKeyPress = (event) => {
        const keyCode = event.which ? event.which : event.keyCode;
        const isValidKey = /^[0-9]+$/.test(String.fromCharCode(keyCode));
        if (!isValidKey) {
            event.preventDefault();
        }
    };
    const setInputsEmpty = () => {
        setJobTitle("");
        setJobPosition("");
        setJobDescription("");
        setKeyQualifications("");
        setAmount("");
        setSelectedOption("");
        setAdditionalRequirement("");
        setIsFormComplete(false);
    }

    const handlePostJob = () => {
        const companyName = Cookies.get("companyName")
        if (!companyName) {
            toast("Please Login!");
        }
        const userId = Cookies.get("userId");
        const token = Cookies.get("token");
        const headers = {
        authorization: `Bearer ${token}`,
        };
        const formData = {
            companyName: companyName,
            employeeId: userId,
            jobTitle: jobTitle,
            jobDate: new Date(),
            jobRequirements: jobDescription,
            jobEligibility: keyQualifications,
            expectedPackage: parseFloat(amount),
            applyLink: additionalRequirement,
            jobType: employementType
        };
        axios
            .post(`${apiUrl}/api/v1/jobs/create`, formData)
            .then((res) => {
                toast.success("Job Posted Successfully");
                const response = axios.get(
                    `${apiUrl}/api/v1/employees/${userId}`
                    , { headers })
                    .then((res) => {
                      const stringifiedUserDetails = JSON.stringify(res.data.employee);
                      sessionStorage.setItem("hiringShala_user", stringifiedUserDetails);  
                    })
                    .catch((e) => {
                      if (e.response) {
                          toast.error(e.response.data.msg);
                        } else if (e.request) {
                          toast.error("Network failure or timeout");
                      } else {
                          toast.error("An unexpected error occurred");
                        }
                  });
                setTimeout(() => {
                    const form = document.getElementById("jobPostForm"); // Replace "your-form-id" with the actual ID of your form

                    // Reset each input field
                    const inputFields = form.querySelectorAll("input");
                    inputFields.forEach((input) => {
                        input.value = "";
                    });
                    const textareaFields = form.querySelectorAll("textarea");
                    textareaFields.forEach((textarea) => {
                        textarea.value = "";
                    });
                    setInputsEmpty();
                    // window.location.reload();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 2000);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.msg);
                  } else if (error.request) {
                    toast.error("Network failure or timeout");
                  } else {
                    toast.error("An unexpected error occurred");
                  }
            });
    };

    return (

        <div className="container addJobText" id="jobPostForm" >
            <h2 className="text-primary font-weight-bold post-job-title" style={{ fontWeight: "bold", fontSize: "24px", marginTop: "100px", marginBottom: "70px" }}>Post New Job Opening</h2>
            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                        Job Title <span className="required-field">*</span>
                    </p>
                    <p> Enter the specific name or designation of the job position you are hiring for.</p>
                </div>
                <div className="col-md-6 input-container">
                    <div className="input-row">

                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={jobTitle}
                            required
                            placeholder="Enter job title e.g Business Analyst"
                            onChange={handleJobTitleChange}
                            className="form-control"
                        />
                    </div>
                </div>

            </div>
            <hr style={{ borderTop: "1px solid black" }} />
            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                        Job ID
                    </p>
                    <p> Enter the unique identification number or code assigned to this job posting.</p>
                </div>
                <div className="col-md-6 input-container">
                    <div className="input-row">
                        <input
                            type="text"
                            id="jobPosition"
                            name="jobPosition"
                            value={jobPosition}
                            placeholder="Enter job ID e.g. 20003749"
                            onChange={handleJobPositionChange}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            <hr style={{ borderTop: "1px solid black" }} />
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h4 className="font-weight-bold job-description-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Job Description <span className="required-field">*</span></h4>
                        <p className="job-description-text">Provide a short description of the job. Keep it short and to the point.</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={jobDescription}
                        placeholder="Enter job description"
                        required
                        onChange={handleJobDescriptionChange}
                        className="form-control job-description-textarea"
                        rows={10}
                        style={{ resize: 'none' }}
                    />
                </div>
            </div>



            <hr style={{ borderTop: "1px solid black" }} />
            <div className="row">
                <div className=" col-md-6 ">
                    <div className="mb-4">
                        <h4 className="font-weight-bold key-qualification-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Key Qualifications <span className="required-field" >*</span></h4>
                        <p className=" allcheckbox" >Provide candidate requirements for this job, including qualifications, etc.</p>
                    </div>
                </div>
                <div className="col-md-6 textarea-container-keyQualification-textarea" >
                    <textarea
                        id="keyQualifications"
                        name="keyQualifications"
                        value={keyQualifications}
                        placeholder="Enter qualifications"
                        required
                        onChange={handleKeyQualificationChange}
                        className="form-control textarea"
                        rows={10}
                        style={{ resize: 'none' }}
                    />
                </div>
            </div>


            <hr style={{ borderTop: "1px solid black", margin: "20px 0" }} />
            <div className="flex-container">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <p className="font-weight-bold fs-4 employement-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Employment Type <span className="required-field">*</span></p>
                        <p className="employement-title">Provide type of Employment</p>
                    </div>
                </div>
                <div className="col-lg-7 employementType">
                    <div className="col-md-12">
                        <label htmlFor="checkbox1" className="checkbox-container-empType">
                            <div className="border p-2 checkbox-content" style={{ alignSelf: "flex-end" }}>
                                <input type="checkbox" id="checkbox1" className="checkbox-input" onChange={handleCheckboxChange} />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Full-time</span>
                            </div>
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="checkbox2" className="checkbox-container-empType">
                            <div className="border p-2 checkbox-content" style={{ alignSelf: "flex-end" }}>
                                <input type="checkbox" id="checkbox2" className="checkbox-input" onChange={handleCheckboxChange} />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Internship</span>
                            </div>
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="checkbox3" className="checkbox-container-empType">
                            <div className="border p-2 checkbox-content" style={{ alignSelf: "flex-end" }}>
                                <input type="checkbox" id="checkbox3" className="checkbox-input" onChange={handleCheckboxChange} />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Part-time</span>
                            </div>
                        </label>
                    </div>
                    <div className="col-md-12 ">
                        <label htmlFor="checkbox4" className="checkbox-container-empType" style={{ marginBottom: "20px" }}>
                            <div className="border p-2 checkbox-content" style={{ alignSelf: "flex-end" }}>
                                <input type="checkbox" id="checkbox4" className="checkbox-input" onChange={handleCheckboxChange} />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Contract</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>




            <hr style={{ borderTop: "1px solid black" }} />
            <div className="flex-container">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <h4 className="font-weight-bold Salary-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Salary <span className="required-field">*</span></h4>
                        <p className=" allcheckbox" >Choose the salary for this job</p>
                    </div>
                </div>
                <div className="col-lg-7 salaryBox">
                    <div className="col-md-6 offset-lg-4">
                        <label htmlFor="checkbox5" className="checkbox-container-SalType" style={{ width: "100%", }}>
                            <div className="border p-2 checkbox-content " >
                                <input type="checkbox" id="checkbox5" name="salaryType"
                                    value="Hourly" className="checkbox-input" checked={selectedOption === "Hourly"} onChange={handleOptionChange} />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Hourly</span>
                            </div>
                        </label>

                    </div>
                    <div className="col-md-6 offset-lg-4">
                        <label htmlFor="checkbox6" className="checkbox-container-SalType" style={{ width: "100%", }}>
                            <div className="border p-2 checkbox-content" >
                                <input type="checkbox" id="checkbox6" className="checkbox-input" name="salaryType"
                                    value="Weekly" checked={selectedOption === "Weekly"} onChange={handleOptionChange} />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Weekly</span>
                            </div>
                        </label>

                    </div>
                    <div className="col-md-6 offset-lg-4">
                        <label htmlFor="checkbox7" className="checkbox-container-SalType" style={{ width: "100%", }}>
                            <div className="border p-2 checkbox-content" >
                                <input type="checkbox" id="checkbox7" className="checkbox-input" name="salaryType"
                                    value="Monthly" checked={selectedOption === "Monthly"} onChange={handleOptionChange} />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Monthly</span>
                            </div>
                        </label>

                    </div>
                    <div className="col-md-6 offset-lg-4">
                        <label htmlFor="checkbox8" className="checkbox-container-SalType" style={{ width: "100%", }}>
                            <div className="border p-2 checkbox-content" >
                                <input type="checkbox" id="checkbox8" className="checkbox-input" name="salaryType"
                                    value="Yearly" checked={selectedOption === "Yearly"} onChange={handleOptionChange} />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Yearly</span>
                            </div>
                        </label>

                    </div>
                    <div className="col-md-6 offset-lg-4">
                        <div className="">
                            <input
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                onKeyPress={handleAmountKeyPress}
                                placeholder="Enter amount"
                                className="form-control"
                                required
                                id="amount"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr style={{ borderTop: "1px solid black" }} />
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h4 className="font-weight-bold additional-requirments-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Additional Requirements</h4>
                        <p className=" job-description-text">Provide additional requirements if any</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className=" textarea-container">
                        <textarea
                            id="additionalRequirement"
                            name="additionalRequirement"
                            value={additionalRequirement}
                            onChange={handleAdditionalRequirementChange}
                            placeholder="Provide additional requirements if any"
                            className="form-control additional-textarea"
                            rows={10}
                            style={{ resize: 'none' }}
                        />
                    </div>
                </div>

                <div className="row custom-margin">
                    <div className="col-md-6 offset-md-6">
                        <div className="d-flex justify-content-lg-end justify-content-end align-items-center">
                            <button
                                onClick={handleSaveAsDraft}
                                className={`save-job-button`}
                            >
                                Save as Draft
                            </button>

                            <button
                                onClick={handlePostJob}
                                className={`post-job-button ${isFormComplete ? "cursor-pointer" : "cursor-not-allowed"
                                    }`}
                                disabled={!isFormComplete}
                                onMouseOver={(e) => {
                                    if (!isFormComplete) {
                                        e.currentTarget.style.backgroundColor = "#b3e6cc";
                                        e.currentTarget.style.cursor = "not-allowed";
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!isFormComplete) {
                                        e.currentTarget.style.backgroundColor = "#e0e0e0";
                                        e.currentTarget.style.cursor = "default";
                                    }
                                }}
                            >
                                Post New Job
                            </button>
                        </div>
                    </div>
                </div>
            </div>




        </div >



    );
};

export default JobPost;