const express = require('express');
const router = express.Router();
const { saveStudentsData, saveStaffData } = require('../controller/bulkUploadController'); // Import the controller function

// Route to save multiple students' data
router.post('/save-student', saveStudentsData);

router.post('/save-staff', saveStaffData);

module.exports = router;
