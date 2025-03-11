const express = require('express');
const router = express.Router();
const {
    addLeavingRecord,
    getAllLeavingRecords,
    getLeavingRecordById,
    updateLeavingRecord,
    deleteLeavingRecord
} = require('../controller/studentLeavingControllerFO');

// Route to add a new student leaving record
router.post('/add', addLeavingRecord);

// Route to get all student leaving records
router.get('/all', getAllLeavingRecords);

// Route to get a leaving record by ID
router.get('/get/:id', getLeavingRecordById);

// Route to update a leaving record by ID
router.put('/update/:id', updateLeavingRecord);

// Route to delete a leaving record by ID
router.delete('/delete/:id', deleteLeavingRecord);

module.exports = router;
