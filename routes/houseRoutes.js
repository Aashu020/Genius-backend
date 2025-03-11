// routes/houseRoutes.js
const express = require('express');
const router = express.Router();
const houseController = require('../controller/houseController');

// Get all houses
router.get('/all', houseController.getHouses);

// Get house by ID
router.get('/get/:id', houseController.getHouseById);

// Create new house
router.post('/add', houseController.createHouse);

// Update house by ID
router.put('/update/:id', houseController.updateHouse);

// Delete house by ID
router.delete('/delete/:id', houseController.deleteHouse);

module.exports = router;
