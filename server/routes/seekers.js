const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const router = express.Router();
const {
  getSeekers,
  getSeekerFromId,
  createNewSeeker,
  applyForJob,
  updateSeekersJobStatus,
  updateSeeker,
  uploadResume,
  getSeekerResume,
  deleteSeeker,
  loginSeeker,
} = require("../controllers/seekers");

const s3 = new AWS.S3({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "hiringshala",
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

router.get("/", getSeekers);
router.get("/:id", getSeekerFromId);
router.post("/", createNewSeeker);
router.patch("/apply/:id", applyForJob);
router.patch("/status/:id", updateSeekersJobStatus);
router.patch("/:id", updateSeeker);
router.post("/upload", upload.single("file"), uploadResume);
router.get("/:seekersId/resume", getSeekerResume);
router.delete("/:id", deleteSeeker);
router.post("/login", loginSeeker);

module.exports = router;
