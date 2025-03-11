const express = require('express');
const router = express.Router();
const teachingProgressController = require('../../controller/Academic/teachingProgressController');

// Create a new teaching progress entry
router.post('/add', teachingProgressController.createTeachingProgress);

// Get all teaching progress entries
router.get('/all', teachingProgressController.getAllTeachingProgress);

// Get a teaching progress entry by Id
router.get('/get/:id', teachingProgressController.getTeachingProgressById);

// Update a teaching progress entry
router.put('/update/:id', teachingProgressController.updateTeachingProgress);

// Delete a teaching progress entry
router.delete('/delete/:id', teachingProgressController.deleteTeachingProgress);

module.exports = router;
