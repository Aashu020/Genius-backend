const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const schoolSetupController = require('../controller/schoolSetupController');

// Configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // Append date to the file name
    }
});

// Initialize multer
const upload = multer({ storage: storage });

// Routes
router.get('/all', schoolSetupController.getAllSchools);
router.get('/get/:id', schoolSetupController.getSchoolById);
router.post('/add', upload.fields([
    { name: 'SchoolLogo', maxCount: 1 },
    { name: 'SchoolStamp', maxCount: 1 },
    { name: 'PrincipleSign', maxCount: 1 },
    { name: 'SchoolSign', maxCount: 1 }
]), schoolSetupController.createSchool);
router.post('/update/:id', upload.fields([
    { name: 'SchoolLogo', maxCount: 1 },
    { name: 'SchoolStamp', maxCount: 1 },
    { name: 'PrincipleSign', maxCount: 1 },
    { name: 'SchoolSign', maxCount: 1 }
]), schoolSetupController.updateSchool);
router.delete('/delete/:id', schoolSetupController.deleteSchool);

module.exports = router;
