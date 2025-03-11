const express = require('express');
const upload = require('../config/multerConfig');
const {
    addStaff,
    updateStaff,
    getAllStaff,
    getStaffByEmployeeId,
    bulkUploadStaffData,
    deleteStaff
} = require('../controller/staffController');

const router = express.Router();

// Add a new staff member with file uploads
router.post('/add', upload.fields([
    { name: 'Photo' }, 
    { name: 'QualificationCertificate' }, 
    { name: 'ExperienceLetter' }
]), addStaff);

// Update an existing staff member with file uploads
router.put('/update/:EmployeeId', upload.fields([
    { name: 'Photo' }, 
    { name: 'QualificationCertificate' }, 
    { name: 'ExperienceLetter' }
]), updateStaff);

// Get all staff bulkUploadStaff
router.post('/bulk-upload', bulkUploadStaffData);

// Get all staff members
router.get('/all', getAllStaff);

// Get a staff member by EmployeeId
router.get('/get/:EmployeeId', getStaffByEmployeeId);

// Delete a staff member by EmployeeId
router.delete('/delete/:EmployeeId', deleteStaff);

module.exports = router;
