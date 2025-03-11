const express = require('express');
const router = express.Router();
const departmentController = require('../controller/departmentController');

// Get all departments
router.get('/all', departmentController.getAllDepartments);

// Get a department by ID
router.get('/get/:id', departmentController.getDepartmentById);

// Create a new department
router.post('/add', departmentController.createDepartment);

// Update a department
router.put('/update/:id', departmentController.updateDepartment);

// Delete a department
router.delete('/delete/:id', departmentController.deleteDepartment);

module.exports = router;
