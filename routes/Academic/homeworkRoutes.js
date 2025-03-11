const express = require('express');
const router = express.Router();
const homeworkController = require('../../controller/Academic/homeworkController');

// Create a new homework entry
router.post('/add', homeworkController.createHomework);

// Get all homework entries
router.get('/all', homeworkController.getAllHomeworks);

// Get a homework entry by ID
router.get('/get/:id', homeworkController.getHomeworkByClassAndSection);

//id
router.get('/:id', homeworkController.getHomeworkById);

// Update a homework entry
router.put('/update/:id', homeworkController.updateHomework);

// Delete a homework entry
router.delete('/delete/:id', homeworkController.deleteHomework);

module.exports = router;
