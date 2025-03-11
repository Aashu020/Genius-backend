const express = require('express');
const router = express.Router();
const fineSetupController = require('../controller/fineSetupController');

// Routes for fine setup
router.post('/add', fineSetupController.createFineSetup); // Add a fine setup
router.get('/all', fineSetupController.getAllFineSetups); // Get all fine setups
router.get('/get/:id', fineSetupController.getFineSetupById); // Get fine setup by ID
router.put('/update/:id', fineSetupController.updateFineSetup); // Update fine setup
router.delete('/delete/:id', fineSetupController.deleteFineSetup); // Delete fine setup

module.exports = router;
