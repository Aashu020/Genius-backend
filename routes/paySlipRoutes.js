const express = require('express');
const router = express.Router();
const paySlipController = require('../controller/paySlipController');

// Create a new Pay Slip
router.post('/add', paySlipController.createPaySlip);

// Get all Pay Slips
router.get('/all', paySlipController.getAllPaySlips);

// Get a Pay Slip by SlipId
router.get('/add/:SlipId', paySlipController.getPaySlipBySlipId);

// Update a Pay Slip by SlipId
router.put('/update/:SlipId', paySlipController.updatePaySlip);

// Delete a Pay Slip by SlipId
router.delete('/delete/:SlipId', paySlipController.deletePaySlip);

module.exports = router;
