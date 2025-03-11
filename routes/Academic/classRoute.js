const express = require('express');
const router = express.Router();
const {
    addClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass
} = require('../../controller/Academic/classController');

// Route to add a new class
router.post('/add', addClass);

// Route to get all classes
router.get('/all', getAllClasses);

// Route to get a class by ClassId
router.get('/get/:classId', getClassById);

// Route to update a class by ClassId
router.put('/update/:classId', updateClass);

// Route to delete a class by ClassId
router.delete('/delete/:classId', deleteClass);

module.exports = router;