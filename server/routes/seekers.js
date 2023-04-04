const express = require("express");
const router = express.Router()
const {
    getAllSeekers,
    getSeekerFromId,
    createNewSeeker
} = require('../controllers/seekers')

router.get("/", getAllSeekers)
router.get("/:id", getSeekerFromId)
router.post("/", createNewSeeker);
module.exports = router