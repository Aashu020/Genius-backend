const express = require('express');
const router = express.Router();
const examController = require('../controller/examStaticsController');

// Add a new exam
router.post('/add', examController.addExam);

// Get all exams
router.get('/all', examController.getAllExams);

// Get exam by ExamId
router.get('/get/:examId', examController.getExamById);

// Update an exam
router.put('/update/:examId', examController.updateExam);

// Delete an exam
router.delete('/delete/:examId', examController.deleteExam);

module.exports = router;
