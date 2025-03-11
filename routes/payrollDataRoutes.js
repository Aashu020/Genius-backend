const express = require('express');
const router = express.Router();
const payrollDataController = require('../controller/payrollDataController');

// Create a new PayrollData
router.post('/add', payrollDataController.createPayrollData);

// Get all PayrollData records
router.get('/all', payrollDataController.getAllPayrollData);

// Get PayrollData by PayrollID
router.get('/get/:payrollID', payrollDataController.getPayrollDataByPayrollID);

// Update PayrollData by PayrollID
router.put('/update/:payrollID', payrollDataController.updatePayrollData);

// Delete PayrollData by PayrollID
router.delete('/delete/:payrollID', payrollDataController.deletePayrollData);

module.exports = router;
