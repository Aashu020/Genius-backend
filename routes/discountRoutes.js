const express = require('express');
const router = express.Router();
const discountController = require('../controller/discountController');

// Routes for discounts
router.post('/add', discountController.createDiscount); // Add a discount
router.get('/all', discountController.getAllDiscounts); // Get all discounts
router.get('/get/:id', discountController.getDiscountById); // Get discount by ID
router.put('/update/:id', discountController.updateDiscount); // Update discount
router.delete('/delete/:id', discountController.deleteDiscount); // Delete discount

module.exports = router;
