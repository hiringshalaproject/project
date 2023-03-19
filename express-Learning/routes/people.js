const express = require('express')
const router = express.Router()

const {
    getPerson,
    getPersonWithId,
    createPerson,
    updatePerson,
    deletePerson
    } = require('../controllers/people')

router.get("/", getPerson)

router.get("/:id", getPersonWithId)

router.post("/:id", createPerson)

router.put("/:id", updatePerson)

router.delete("/:id", deletePerson)

module.exports = router