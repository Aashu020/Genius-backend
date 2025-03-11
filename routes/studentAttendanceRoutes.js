const express = require('express');
const router = express.Router();
const studentAttendanceController = require('../controller/studentAttendanceController');

// Create a new attendance record
router.post('/add', studentAttendanceController.createAttendance);

// Get all attendance records
router.get('/all', studentAttendanceController.getAllAttendance);

// Get an attendance record by ID
router.get('/get/:id', studentAttendanceController.getAttendanceById);

// Get an attendance record by ID
router.get('/get/:studentId', studentAttendanceController.getAttendanceByStudentId);

// Update an attendance record
router.put('/update/:id', studentAttendanceController.updateAttendance);

// Delete an attendance record
router.delete('/delete/:id', studentAttendanceController.deleteAttendance);

module.exports = router;
