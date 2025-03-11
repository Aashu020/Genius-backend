const express = require('express');
const upload = require('../config/multerConfig'); // Adjust the path as necessary
const {
    addStudent,
    updateStudent,
    getAllStudents,
    getStudentByStudentId,
    bulkUploadStudentData,
    deleteStudent,
    getById,
    createDataForAllStudents,
} = require('../controller/studentController'); // Adjust the path as necessary

const router = express.Router();

// Add a new student with file uploads
router.post('/add', upload.fields([
    { name: 'StudentPhoto' },       // Student photo
    { name: 'Birth' },       // Birth document
    { name: 'Leaving' },     // Leaving document
    { name: 'FatherPhoto' }, // Father's photo
    { name: 'MotherPhoto' }  // Mother's photo
]), addStudent);

// Update an existing student with file uploads
router.put('/update/:StudentId', upload.fields([
    { name: 'Document[StudentPhoto]' }, // Adjust to match client-side
    { name: 'Document[Birth]' },
    { name: 'Document[Leaving]' },
    { name: 'Document[FatherPhoto]' },
    { name: 'Document[MotherPhoto]' }
]), updateStudent);


router.post('/bulk-upload', bulkUploadStudentData);

// Get all students
router.get('/all', getAllStudents);

// Get a student by StudentId
router.get('/get/:StudentId', getStudentByStudentId);

// Get a student by Id
// router.get('/getid/:id', getById);

// Delete a student by StudentId
router.delete('/delete/:StudentId', deleteStudent);
router.post('/create-fee-data-for-all-students', createDataForAllStudents);

module.exports = router;
