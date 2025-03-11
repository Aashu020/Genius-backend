const express = require('express');
const router = express.Router();
const {
    addReading,
    getAllReadings,
    getReadingById,
    updateReading,
    deleteReading
} = require('../controller/electricityControllerFO'); // Adjust the path as necessary

// Route to add a new electricity reading
router.post('/add', addReading);

// Route to get all electricity readings
router.get('/all', getAllReadings);

// Route to get a reading by ID
router.get('/get/:id', getReadingById);

// Route to update a reading by ID
router.put('/update/:id', updateReading);

// Route to delete a reading by ID
router.delete('/delete/:id', deleteReading);

module.exports = router;
