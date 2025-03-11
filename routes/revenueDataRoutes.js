const express = require('express');
const router = express.Router();
const revenueDataController = require('../controller/revenueDataController');

// Route to create a new revenue data entry
router.post('/add', revenueDataController.createRevenueData);

// Route to get all revenue data entries
router.get('/all', revenueDataController.getAllRevenueData);

// Route to get revenue data by ID
router.get('/get/:id', revenueDataController.getRevenueDataById);

// Route to update revenue data by ID
router.put('/update/:id', revenueDataController.updateRevenueData);

// Route to delete revenue data by ID
router.delete('/delete/:id', revenueDataController.deleteRevenueData);

module.exports = router;
