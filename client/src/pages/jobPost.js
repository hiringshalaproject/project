
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
    const [selectedOption, setSelectedOption] = useState("yearly");
    const [additionalRequirement, setAdditionalRequirement] = useState("");
    const [isFormComplete, setIsFormComplete] = useState(false);


    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
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

    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleAdditionalRequirementChange = (e) => {
        setAdditionalRequirement(e.target.value);
    };
    const handleSaveAsDraft = () => {
        // Logic for saving as draft
    };
    const handleAmountKeyPress = (event) => {
        const keyCode = event.which ? event.which : event.keyCode;
        const isValidKey = /^[0-9]+$/.test(String.fromCharCode(keyCode));
        if (!isValidKey) {
            event.preventDefault();
        }
    };

    const checkFormCompletion = () => {

        const isjobTitleFilled = jobTitle.trim() !== '';
        const isjobDescriptionFilled = jobDescription.trim() !== '';
        const iskeyQualificationsFilled = keyQualifications.trim() !== '';

        setIsFormComplete(isjobTitleFilled && isjobDescriptionFilled && iskeyQualificationsFilled);
    };



    const handlePostJob = () => {
        const companyName = Cookies.get("companyName")
        if (!companyName) {
            toast("Please Login!");
        }
        const formData = {
            companyName: companyName,
            jobTitle: jobTitle,
            jobDate: new Date(),
            jobRequirements: jobDescription,
            jobEligibility: keyQualifications,
            expectedPackage: parseFloat(amount),
            applyLink: additionalRequirement,
        };
        axios
            .post(`${apiUrl}/api/v1/jobs/create`, formData)
            .then((res) => {
                toast.success("Job Posted Successfully");
                navigate("/dashboard");
            })
            .catch((error) => {
                toast.error(error.response.data.msg);
            });
    };

    return (

        <div className="container addJobText"  >
            <h2 className="text-primary font-weight-bold post-job-title" style={{ fontWeight: "bold", fontSize: "24px", marginTop: "100px", marginBottom: "50px" }}>Post New Job Opening</h2>
            <div className="form-group">
                <div className="label-container">
                    <p className="font-weight-bold jobidText" style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>
                        Job Id and Title <span className="required-field">*</span>
                    </p>
                    <label className="font-weight-bold label-large job-position-label">A job title must describe one position only</label>
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
                        <p className="font-weight-bold fs-4 employement-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Employment Type</p>
                        <p className="employement-title">Description text goes here</p>
                    </div>
                </div>
                <div className="col-lg-7 employementType">
                    <div className="col-md-12">
                        <label htmlFor="checkbox1" className="checkbox-container-empType">
                            <div className="border p-2 checkbox-content" style={{ alignSelf: "flex-end" }}>
                                <input type="checkbox" id="checkbox1" className="checkbox-input" />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Full-time</span>
                            </div>
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="checkbox2" className="checkbox-container-empType">
                            <div className="border p-2 checkbox-content" style={{ alignSelf: "flex-end" }}>
                                <input type="checkbox" id="checkbox2" className="checkbox-input" />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Part-time</span>
                            </div>
                        </label>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="checkbox3" className="checkbox-container-empType">
                            <div className="border p-2 checkbox-content" style={{ alignSelf: "flex-end" }}>
                                <input type="checkbox" id="checkbox3" className="checkbox-input" />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>On demand</span>
                            </div>
                        </label>
                    </div>
                    <div className="col-md-12 ">
                        <label htmlFor="checkbox4" className="checkbox-container-empType" style={{ marginBottom: "20px" }}>
                            <div className="border p-2 checkbox-content" style={{ alignSelf: "flex-end" }}>
                                <input type="checkbox" id="checkbox4" className="checkbox-input" />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Negotiable</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>




            <hr style={{ borderTop: "1px solid black" }} />
            <div className="flex-container">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <h4 className="font-weight-bold Salary-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Salary</h4>
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

                <div className="row">
                    <div className="col-md-6 offset-md-6">
                        <div className="d-flex justify-content-lg-end justify-content-end align-items-center">
                            <button
                                onClick={handleSaveAsDraft}
                                className="btn btn-success saveDraft mr-2"
                            >
                                Save as Draft
                            </button>

                            <button
                                onClick={handlePostJob}
                                className="btn btn-primary postJob"
                                disabled={!isFormComplete}
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