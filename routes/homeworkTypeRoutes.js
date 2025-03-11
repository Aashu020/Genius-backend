const express = require('express');
const router = express.Router();
const homeworkTypeController = require('../controller/homeworkTypeController');

// Get all Homework Types
router.get('/all', homeworkTypeController.getAllHomeworkTypes);

// Get Homework Type by ID
router.get('/get/:id', homeworkTypeController.getHomeworkTypeById);

// Create a new Homework Type
router.post('/add', homeworkTypeController.createHomeworkType);

// Update a Homework Type
router.put('/update/:id', homeworkTypeController.updateHomeworkType);

// Delete a Homework Type
router.delete('/delete/:id', homeworkTypeController.deleteHomeworkType);

module.exports = router;
