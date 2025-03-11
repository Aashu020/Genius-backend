const express = require('express');
const router = express.Router();
const {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
} = require('../controller/complaintForController');

// Route to get all complaints
router.get('/all', getAllComplaints);

// Route to get a complaint by ID
router.get('/get/:id', getComplaintById);

// Route to create a new complaint
router.post('/add', createComplaint);

// Route to update a complaint
router.put('/update/:id', updateComplaint);

// Route to delete a complaint
router.delete('/delete/:id', deleteComplaint);

module.exports = router;
