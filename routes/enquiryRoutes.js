const express = require('express');
const {
    addEnquiry,
    getAlldata,
    getById,
    deleteEnquiry,
    updateEnquiry
} = require('../controller/enquiryController'); 

const router = express.Router();

// Route to add a new enquiry
router.post('/add', addEnquiry);

// Route to get all enquiries
router.get('/all', getAlldata);

// Route to get an enquiry by RegistrationNo
router.get('/get/:id', getById);

// Route to update an enquiry by RegistrationNo
router.put('/update/:id', updateEnquiry);

// Route to delete an enquiry by RegistrationNo
router.delete('/delete/:id', deleteEnquiry);

module.exports = router;
