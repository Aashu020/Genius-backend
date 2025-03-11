const express = require('express');
const router = express.Router();
const purposeController = require('../controller/purposeController'); // Update the path accordingly

// GET all purposes
router.get('/all', purposeController.getAllPurposes);

// GET a purpose by ID
router.get('/get/:id', purposeController.getPurposeById);

// POST a new purpose
router.post('/add', purposeController.createPurpose);

// PUT (update) a purpose
router.put('/update/:id', purposeController.updatePurpose);

// DELETE a purpose
router.delete('/delete/:id', purposeController.deletePurpose);

module.exports = router;
