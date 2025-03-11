const express = require('express');
const router = express.Router();
const feeReceiptController = require('../controller/feeReceiptController');

// Routes
router.post('/add', feeReceiptController.addFeeReceipt); // Add a new fee receipt
router.get('/all', feeReceiptController.getAllFeeReceipts); // Get all fee receipts
router.get('/get/:receiptId', feeReceiptController.getFeeReceiptById); // Get by ReceiptId
router.put('/update/:receiptId', feeReceiptController.updateFeeReceipt); // Update by ReceiptId
router.delete('/delete/:receiptId', feeReceiptController.deleteFeeReceipt); // Delete by ReceiptId

module.exports = router;
