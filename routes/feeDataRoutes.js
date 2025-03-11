const express = require('express');
const router = express.Router();
const feeDataController = require('../controller/feeDataController');

// Create a new FeeData
router.post('/add', feeDataController.createFeeData);
router.post('/create', feeDataController.createData);

// Get all FeeData records
router.get('/all', feeDataController.getAllFeeData);

// Get FeeData by FeeID
router.get('/get/:feeID', feeDataController.getFeeDataByFeeID);

// Update FeeData by FeeID
router.put('/update/:feeID', feeDataController.updateFeeData);

// Delete FeeData by FeeID
router.delete('/delete/:feeID', feeDataController.deleteFeeData);

module.exports = router;
