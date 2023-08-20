import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import FileUploader from "../FileUploader/FileUploader";
import ResumeImg from "../assets/mascot-img.jpg";
const UploadResume = () => {
  return (
    <div className="ml-10 mt-3 my-card-div">
      <MDBCard className="top-card">
        <MDBCardBody className="text-[30px] font-poppins p-3">
          <span className="font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Upload Resume
          </span>
        </MDBCardBody>
      </MDBCard>

      <div className="d-flex align-items-center justify-center mt-2 resume-outer-div">
        <div className="border-2 border-green-500 border-dashed upload-resume rounded-lg mb-3 mr-2">
          <p className="font-poppins font-semibold text-[22px] mb-0 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Upload your Resume (Optional)
          </p>
          <div className="d-flex justify-center">
          <FileUploader />
          </div>
          <p className="font-poppins font-semibold text-[18px] mb-0 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Resume can be in pdf, doc, docs format. File size up to 5Mb</p>
        </div>

        <div className="relative resume-image-col">
          <img src={ResumeImg} alt="Resume Img" className="resume-img" />

          <div className="absolute top-2 left-0 border-2 border-blue-300 mascot-text rounded-lg">
            <span className="font-poppins font-semibold text-[18px] bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Upload your resume and start applying to land your dream job!!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
