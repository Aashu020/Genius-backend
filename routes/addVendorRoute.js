const express = require('express');
const router = express.Router();
const VendorController = require('../controller/addVendorController');

// Add a new vendor
router.post('/add', VendorController.addVendor);

// Get all 
router.get('/all', VendorController.getAllVendors);

// Get a vendor by ID
router.get('/get/:id', VendorController.getVendorById);

// Update a vendor by ID
router.put('/update/:id', VendorController.updateVendor);

// Delete a vendor by ID
router.delete('/delete/:id', VendorController.deleteVendor);

module.exports = router;
