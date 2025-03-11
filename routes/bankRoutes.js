const express = require('express');
const router = express.Router();
const bankController = require('../controller/bankController');

// Create a new bank entry
router.post('/add', bankController.createBank);

// Get all bank entries
router.get('/all', bankController.getAllBanks);

// Get a bank entry by ID
router.get('/get/:id', bankController.getBankById);

// Update a bank entry by ID
router.put('/update/:id', bankController.updateBank);

// Delete a bank entry by ID
router.delete('/delete/:id', bankController.deleteBank);

module.exports = router;
