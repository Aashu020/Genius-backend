const express = require('express');
const router = express.Router();
const feeHeaderController = require('../controller/feeHeaderController');

// Add a new FeeHeader
router.post('/add', feeHeaderController.addFeeHeader);

// Get all FeeHeaders
router.get('/all', feeHeaderController.getAllFeeHeaders);

// Get a FeeHeader by ID
router.get('/get/:id', feeHeaderController.getFeeHeaderById);

// Update a FeeHeader by ID
router.put('/update/:id', feeHeaderController.updateFeeHeader);

// Delete a FeeHeader by ID
router.delete('/delete/:id', feeHeaderController.deleteFeeHeader);

module.exports = router;
