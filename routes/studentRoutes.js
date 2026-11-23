
const express = require("express");

const router = express.Router();

const {
    getStudents,
    getStudent,
    createStudent,
    removeStudent
} = require("../controllers/studentController");

// Get all students
router.get("/", getStudents);

// Get student by ID
router.get("/:id", getStudent);

// Add student
router.post("/", createStudent);

// Delete student
router.delete("/:id", removeStudent);

module.exports = router;
