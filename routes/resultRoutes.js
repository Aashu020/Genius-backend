const express = require('express');
const router = express.Router();
const resultController = require('../controller/resultController');

// Get all results
router.get('/all', resultController.getAllResults);

// Get result by ID
router.get('/get/:id', resultController.getResultById);

router.get('/get/one/:examId/:studentId', resultController.getResultByStuExa);
router.get('/get/one/:examId/:studentId', resultController.getResultByStuExa);
router.get('/getSubjectWiseMarks', resultController.getSubjectWiseMarks);
router.post('/saveSubjectMarks', resultController.saveSubjectMarks);

// Create a new result
router.post('/add', resultController.createResult);

// Update an existing result
router.put('/update/:id', resultController.updateResult);

// Delete a result
router.delete('/delete/:id', resultController.deleteResult);

module.exports = router;
