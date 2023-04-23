const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const router = express.Router();
const {
  getAllSeekers,
  getSeekerFromId,
  createNewSeeker,
  uploadResume,
  getSeekerResume,
  deleteSeeker,
} = require("../controllers/seekers");

const s3 = new AWS.S3({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "myjobproject",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

router.get("/", getAllSeekers);
router.get("/:id", getSeekerFromId);
router.post("/", createNewSeeker);
router.post("/upload", upload.single("file"), uploadResume);
router.get("/:seekersId/resume", getSeekerResume);
router.delete("/:id",deleteSeeker)

module.exports = router;
