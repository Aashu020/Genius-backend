const express = require('express');
const router = express.Router();
const academicYearInfoController = require('../controller/academicYearInfoController'); // Adjust the path as needed

// Routes
router.get('/all', academicYearInfoController.getAllAcademicYears);
router.get('/active', academicYearInfoController.getActiveData);
router.get('/get/:id', academicYearInfoController.getAcademicYearById);
router.post('/add', academicYearInfoController.createAcademicYear);
router.put('/update/:id', academicYearInfoController.updateAcademicYear);
router.put('/active/:id', academicYearInfoController.setActiveStatus);
router.delete('/delete/:id', academicYearInfoController.deleteAcademicYear);

module.exports = router;
