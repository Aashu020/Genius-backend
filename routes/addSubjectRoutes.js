const express = require('express');
const router = express.Router();
const subjectController = require('../controller/addSubjectController'); 

// Create a new subject
router.post('/add', subjectController.createSubject);

// Get all subjects
router.get('/all', subjectController.getAllSubjects);

// Get a subject by ID
router.get('/get/:id', subjectController.getSubjectById);

// Update a subject
router.put('/update/:id', subjectController.updateSubject);

// Delete a subject
router.delete('/delete/:id', subjectController.deleteSubject);

module.exports = router;
