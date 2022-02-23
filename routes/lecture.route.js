const express = require('express');
const router = express.Router();
const authenticated = require('../utils/authenticated')

const {getLectures, createLecture, patchLecture, deleteLecture, getOneLecture} = require("../controllers/lecture.controller")

// Show all lectures
router.get("/", getLectures)

// Show one lecture
router.get("/:lecture_id", getOneLecture)

// Create lecture
router.post("/create", authenticated, createLecture)

// Patch lecture
router.patch("/:lecture_id", authenticated, patchLecture)

// Delete lecture
router.delete("/:lecture_id", authenticated, deleteLecture)

module.exports = router