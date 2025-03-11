const express = require('express');
const router = express.Router();
const {
    getAllDatesheets,
    getDatesheetById,
    createDatesheet,
    updateDatesheet,
    deleteDatesheet,
    getDatesheetsByExam,
} = require('../controller/datesheetController'); // Adjust the path according to your project structure

// Routes for Datesheet
router.get('/all', getAllDatesheets); // GET all datesheets
router.get('/get/:id', getDatesheetById); // GET a datesheet by ID
router.get('/getByExam/:exam', getDatesheetsByExam); // GET a datesheet by ID
router.post('/add', createDatesheet); // POST a new datesheet
router.put('/update/:id', updateDatesheet); // PUT (update) a datesheet by ID
router.delete('/delete/:id', deleteDatesheet); // DELETE a datesheet by ID

module.exports = router;
