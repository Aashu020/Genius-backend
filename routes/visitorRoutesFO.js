const express = require('express');
const router = express.Router();
const {
    addVisitorRecord,
    getAllVisitorRecords,
    getVisitorRecordById,
    updateVisitorRecord,
    deleteVisitorRecord,
    updateOutTime
} = require('../controller/visitorControllerFO');

// Route to add a new visitor record
router.post('/add', addVisitorRecord);

// Route to get all visitor records
router.get('/all', getAllVisitorRecords);

// Route to get a visitor record by ID
router.get('/get/:id', getVisitorRecordById);

// Route to update a visitor record by ID
router.put('/update/:id', updateVisitorRecord);

// Route to delete a visitor record by ID
router.delete('/delete/:id', deleteVisitorRecord);

// Update OutTime route
router.put('/:id/outtime', updateOutTime);

module.exports = router;
    