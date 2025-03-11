const express = require('express');
const router = express.Router();
const CashDetailsController = require('../controller/cashDetailsController');

// Add cash details
router.post('/add', CashDetailsController.addCashDetails);

// Get all cash details
router.get('/all', CashDetailsController.getAllCashDetails);

// Get cash details by ID
router.get('/get/:id', CashDetailsController.getCashDetailsById);

// Update cash details by ID
router.put('/update/:id', CashDetailsController.updateCashDetails);

// Delete cash details by ID
router.delete('/delete/:id', CashDetailsController.deleteCashDetails);

module.exports = router;
