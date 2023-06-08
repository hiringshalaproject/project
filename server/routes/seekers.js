const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const jwt = require("jsonwebtoken");
const { Seekers } = require("../models/schema");

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

const checkIfUserExists = async (userId) => {
  const user = await Seekers.findOne({ _id: userId });
  return user !== null;
};

const authenticateUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    const userExists = await checkIfUserExists(req.userId); // Use req.userId instead of undefined variable userId

    if (userExists) {
      next();
    } else {
      return res.status(401).json({ message: "Please SignUp!" });
    }
  } catch (error) {
    return res.status(401).json({ message: "User is not authenticated" });
  }
};

router.get("/", authenticateUser, getSeekers);
router.get("/:id", authenticateUser, getSeekerFromId);
router.post("/", authenticateUser, createNewSeeker);
router.patch("/apply/:id", authenticateUser, applyForJob);
router.patch("/status/:id", authenticateUser, updateSeekersJobStatus);
router.patch("/:id", authenticateUser, updateSeeker);
router.post("/upload", upload.single("file"), uploadResume);
router.get("/:seekersId/resume", getSeekerResume);
router.delete("/:id", deleteSeeker);
router.post("/login", loginSeeker);

module.exports = router;
