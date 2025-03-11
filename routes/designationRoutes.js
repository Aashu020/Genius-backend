const express = require('express');
const router = express.Router();
const designationController = require('../controller/designationController'); // Adjust the path as necessary

// Define routes
router.get('/all', designationController.getAllDesignations); // Get all designations
router.get('/get/:id', designationController.getDesignationById); // Get designation by ID
router.post('/add', designationController.createDesignation); // Create new designation
router.put('/update/:id', designationController.updateDesignation); // Update designation
router.delete('/delete/:id', designationController.deleteDesignation); // Delete designation

module.exports = router;
