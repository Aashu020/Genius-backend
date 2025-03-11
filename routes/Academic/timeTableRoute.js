const express = require('express');
const router = express.Router();
const timeTableController = require('../../controller/Academic/timeTableController');

// Add a new time table
router.post('/add', timeTableController.addTimeTable);

// Get all time tables
router.get('/all', timeTableController.getAllTimeTables);

// Get time table by ClassID
router.get('/get/:class/:section', timeTableController.getTimeTableByClassID);

// Update time table
router.put('/update/:ClassID', timeTableController.updateTimeTable);

// Delete time table
router.delete('/delete/:ClassID', timeTableController.deleteTimeTable);


router.get('/get/:id', timeTableController.getById);

module.exports = router;
