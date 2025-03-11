const express = require('express');
const router = express.Router();
const feeSlabController = require('../controller/feeSlabController'); 

// Add a new FeeSlab
router.post('/add', feeSlabController.addFeeSlab);

// Get all FeeSlabs
router.get('/all', feeSlabController.getAllFeeSlabs);

// Get a FeeSlab by ID
router.get('/get/:id', feeSlabController.getFeeSlabById);

// Update a FeeSlab by ID
router.put('/update/:id', feeSlabController.updateFeeSlab);

// Delete a FeeSlab by ID
router.delete('/delete/:id', feeSlabController.deleteFeeSlab);

module.exports = router;
