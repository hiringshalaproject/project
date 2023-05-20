
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

    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleJobTitleChange = (e) => {
        setJobTitle(e.target.value);
    };

    const handleJobPositionChange = (e) => {
        setJobPosition(e.target.value);
    };

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value);
    };
    const handleKeyQualificationChange = (e) => {
        setKeyQualifications(e.target.value);
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

    const handlePostJob = () => {
        const companyName = Cookies.get("companyName")
        if(!companyName)
        {
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

                <div className="label-container d-flex align-items-center">
                    <p className="font-weight-bold jobidText " style={{ fontWeight: "bold", fontSize: "24px", margin: "0px" }}>Job Id and Title</p>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={jobTitle}
                        placeholder="Enter job title e.g Business Analyst"
                        onChange={handleJobTitleChange}
                        className="form-control"

                    />
                </div>

            </div>
            <div className="form-group">

                <div className="label-container">
                    <label className="font-weight-bold label-large job-position-label">A job title must describe one position only</label>
                </div>
                <div className="input-container">
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



            <hr style={{ borderTop: "1px solid black" }} />
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h4 className="font-weight-bold job-description-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Job Description</h4>
                        <p className=" job-description-text">Provide a short description of the job. keep it short and to the point</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={jobDescription}
                        placeholder="Enter job description"
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
                        <h4 className="font-weight-bold key-qualification-title" style={{ fontWeight: "bold", fontSize: "24px" }}>Key Qualifications</h4>
                        <p className=" allcheckbox" >Provide candidate requirements for this job, including qualifications, etc.</p>
                    </div>
                </div>
                <div className="col-md-6 textarea-container-keyQualification-textarea" >
                    <textarea
                        id="keyQualifications"
                        name="keyQualifications"
                        value={keyQualifications}
                        placeholder="Enter qualifications"
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
                        <p className=" employement-title">Description text goes here</p>
                    </div>
                </div>
                <div className="col-lg-7" >

                    <div className="col-md-6 ">
                        <label htmlFor="checkbox1" className="checkbox-container-empType" style={{ width: "100%", marginBottom: "20px" }}>
                            <div className="border p-2" >
                                <input type="checkbox" id="checkbox1" className="checkbox-input" />
                                <span className="allcheckbox" style={{ marginLeft: '8px' }}>Full-time</span>
                            </div>
                        </label>


                        <div className="col-md-12">
                            <label htmlFor="checkbox2" className="checkbox-container-empType" style={{ width: "100%", marginBottom: "20px" }}>
                                <div className="border p-2" >
                                    <input type="checkbox" id="checkbox2" className="checkbox-input" />
                                    <span className="allcheckbox" style={{ marginLeft: '8px' }}>Part-time</span>
                                </div>
                            </label>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="checkbox3" className="checkbox-container-empType" style={{ width: "100%", marginBottom: "20px" }}>
                                <div className="border p-2 checkbox-content">
                                    <input type="checkbox" id="checkbox3" className="checkbox-input" />
                                    <span className="allcheckbox" style={{ marginLeft: '8px' }}>On demand</span>
                                </div>
                            </label>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="checkbox4" className="checkbox-container-empType" style={{ width: "100%", marginBottom: "20px" }}>
                                <div className="border p-2" >
                                    <input type="checkbox" id="checkbox4" className="checkbox-input" />
                                    <span className="allcheckbox" style={{ marginLeft: '8px' }}>Negotiable</span>
                                </div>
                            </label>

                        </div>
                    </div>
                </div>
            </div>

            <hr style={{ borderTop: "1px solid black" }} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-4">
                            <p className="font-weight-bold fs-4 text-Key" style={{ fontWeight: "bold", fontSize: "24px" }}>Salary</p>
                            <p className="Salpara">Choose the salary for this job</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="checkbox5" className="checkbox-label-hourly">
                                    <div className="border p-3 hourly-box" style={{ marginBottom: "20px" }}>
                                        <input type="checkbox" id="checkbox5" className="checkbox-input" />
                                        <span className="allcheckbox" style={{ marginLeft: '8px' }}>Hourly</span>
                                    </div>
                                </label>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="checkbox6" className="checkbox-label-custom">
                                    <div className="border p-3 custom-box" style={{ marginBottom: "20px" }}>
                                        <input type="checkbox" id="checkbox6" className="checkbox-input" />
                                        <span className="allcheckbox" style={{ marginLeft: '8px' }}>Custom</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row">
                    <div className="col-md-6 offset-md-8 ">
                        <div className="row">
                            <div className="col">
                                <label className="font-weight-bold allcheckbox" htmlFor="amount" style={{ marginLeft: "10px" }}>Amount you want to pay</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-lg-6">
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder="Enter amount"
                                    className="form-control"
                                    id="amount"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 offset-md-8 mt-3">
                        <div className="row">
                            <div className="col">
                                <label className="font-weight-bold allcheckbox" htmlFor="payment-option" style={{ marginLeft: "10px" }}>How you want to pay</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <select
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                    className="form-control"
                                    id="payment-option"
                                >
                                    <option value="yearly">Yearly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6 Isnegotiable">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="Isnegotiable"
                                value="Isnegotiable"
                                id="is-negotiable"
                            />
                            <label className="form-check-label" htmlFor="is-negotiable" style={{ fontWeight: "bold" }}>
                                Salary is Negotiable
                            </label>
                        </div>
                    </div>
                </div>

                <hr className="mt-4" style={{ borderTop: "1px solid black", }} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="text-container-additional-info">
                                <p className="font-weight-bold additional-title" style={{ fontWeight: "bold", fontSize: "24px", whiteSpace: 'nowrap' }}>Additional Requirements</p>
                                <p className="additional-title" style={{ whiteSpace: 'nowrap' }}>Provide additional requirements if any</p>
                            </div>
                        </div>
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
                        <div className="col-12  " >
                            <button
                                onClick={handleSaveAsDraft}
                                className="btn btn-success btn-block mr-2 saveDraft"
                                style={{
                                    // width: "100%",
                                    maxWidth: "180px",
                                    borderTop: "1px solid black",
                                    borderBottom: "1px solid black",
                                    marginTop: "30px",
                                    borderLeft: "1px solid black",
                                    borderRight: "1px solid black",
                                    borderRadius: "10px 0  0px",
                                    padding: "5px 10px",
                                    background: "82DBD8",
                                    marginBottom: "50px",
                                    height: "50px",
                                    transition: "transform 0.3s",
                                    border: "none",
                                    // marginRight: "30px"
                                }}
                            >
                                Save as Draft
                            </button>

                            <button
                                onClick={handlePostJob}
                                className="btn btn-primary btn-block  postJob"
                                style={{
                                    // width: "100%",
                                    maxWidth: "180px",
                                    borderTop: "1px solid black",
                                    borderBottom: "1px solid black",
                                    marginTop: "30px",
                                    borderLeft: "1px solid black",
                                    borderRight: "1px solid black",
                                    borderRadius: "0px 0 10px 0px",
                                    padding: "5px 10px",
                                    background: "#4164E3",
                                    height: "50px",
                                    marginBottom: "50px",
                                    border: "none",
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