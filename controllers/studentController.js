
const Student = require("../models/student");

// Get all students
const getStudents = (req, res) => {
    const students = Student.getAllStudents();

    res.status(200).json(students);
};

// Get one student
const getStudent = (req, res) => {
    const id = Number(req.params.id);

    const student = Student.getStudentById(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
};

// Add student
const createStudent = (req, res) => {
    const { name, age } = req.body;
    const getallStudents = Student.getAllStudents();

    const newStudent = {
        id: Math.max(...getallStudents.map(student => student.id)) + 1,
        name,
        age
    };

    Student.addStudent(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
};

// Delete student
const removeStudent = (req, res) => {
    const id = Number(req.params.id);

    const student = Student.getStudentById(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    Student.deleteStudent(id);

    res.status(200).json({
        message: "Student deleted successfully"
    });
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    removeStudent
};
