const express = require('express');
const router = express.Router();
const gradeController = require('../controller/gradeController');

// Create a new Grade
router.post('/add', gradeController.createGrade);

// Get all Grades
router.get('/all', gradeController.getAllGrades);

// Get a Grade by ID
router.get('/get/:id', gradeController.getGradeById);

// Update a Grade by ID
router.put('/update/:id', gradeController.updateGrade);

// Delete a Grade by ID
router.delete('/delete/:id', gradeController.deleteGrade);

module.exports = router;
