const express = require('express');
const router = express.Router();
const {
    getAllAcademicYearPlans,
    getAcademicYearPlanById,
    createAcademicYearPlan,
    updateAcademicYearPlan,
    deleteAcademicYearPlan,
} = require('../controller/academicYearPlanController');

// Get all academic year plans
router.get('/all', getAllAcademicYearPlans);

// Get academic year plan by ID
router.get('/get/:id', getAcademicYearPlanById);

// Create a new academic year plan
router.post('/add', createAcademicYearPlan);

// Update an academic year plan by ID
router.put('/update/:id', updateAcademicYearPlan);

// Delete an academic year plan by ID
router.delete('/delete/:id', deleteAcademicYearPlan);

module.exports = router;
