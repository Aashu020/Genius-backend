const express = require('express');
const router = express.Router();
const {
    addDispatch,
    getAllDispatches,
    getDispatchById,
    updateDispatch,
    deleteDispatch
} = require('../controller/postalControllerFO');

// Route to add a new postal dispatch record
router.post('/add', addDispatch);

// Route to get all postal dispatch records
router.get('/all', getAllDispatches);

// Route to get a dispatch by ID
router.get('/get/:id', getDispatchById);

// Route to update a dispatch by ID
router.put('/update/:id', updateDispatch);

// Route to delete a dispatch by ID
router.delete('/delete/:id', deleteDispatch);

module.exports = router;
