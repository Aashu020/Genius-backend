const express = require('express');
const router = express.Router();
const payrollHeaderController = require('../controller/payrollHeaderController');

// Create a new PayrollHeader
router.post('/add', payrollHeaderController.createPayrollHeader);

// Get all PayrollHeaders
router.get('/all', payrollHeaderController.getAllPayrollHeaders);

// Get a PayrollHeader by ID
router.get('/get/:id', payrollHeaderController.getPayrollHeaderById);

// Update a PayrollHeader by ID
router.put('/update/:id', payrollHeaderController.updatePayrollHeader);

// Delete a PayrollHeader by ID
router.delete('/delete/:id', payrollHeaderController.deletePayrollHeader);

module.exports = router;
