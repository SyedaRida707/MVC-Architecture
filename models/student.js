
let students = [
    { id: 1, name: "Ali", age: 22 },
    { id: 2, name: "Sara", age: 21 },
    { id: 3, name: "Ahmed", age: 23 }
];

// Get all students
const getAllStudents = () => {
    return students;
};

// Get student by ID
const getStudentById = (id) => {
    return students.find(student => student.id === id);
};

// Add new student
const addStudent = (student) => {
    students.push(student);
    return student;
};

// Delete student
const deleteStudent = (id) => {
    students = students.filter(student => student.id !== id);
};

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    deleteStudent
};
