const express = require('express');
const router = express.Router();
const periodController = require('../../controller/Academic/periodController');

// Add a new period
router.post('/add', periodController.addPeriod);

// Get all periods
router.get('/all', periodController.getAllPeriods);

// Get period by ID
router.get('/get/:id', periodController.getPeriodById);

// Update period
router.put('/update/:id', periodController.updatePeriod);

// Delete period
router.delete('/delete/:id', periodController.deletePeriod);

module.exports = router;
