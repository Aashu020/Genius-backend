const express = require('express');
const router = express.Router();
const {
    addComplaint,
    getAllComplaints,
    getComplaintByComplaintNo,
    updateComplaint,
    deleteComplaint
} = require('../controller/compliantControllerFO'); 

router.post('/add', addComplaint);

// Route to get all complaints
router.get('/all', getAllComplaints);

// Route to get a complaint by ComplaintNo
router.get('/get/:complaintNo', getComplaintByComplaintNo);

// Route to update a complaint by ComplaintNo
router.put('/update/:complaintNo', updateComplaint);

// Route to delete a complaint by ComplaintNo
router.delete('/delete/:complaintNo', deleteComplaint);

module.exports = router;
