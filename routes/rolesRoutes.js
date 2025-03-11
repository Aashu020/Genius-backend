const express = require('express');
const router = express.Router();
const rolesController = require('../controller/rolesController');

// Get all roles
router.get('/all', rolesController.getAllRoles);

// Get a single role by ID
router.get('/get/:id', rolesController.getRoleById); // Add this line

// Create a new role
router.post('/add', rolesController.createRole);

// Update a role
router.put('/update/:id', rolesController.updateRole);

// Delete a role
router.delete('/delete/:id', rolesController.deleteRole);

module.exports = router;
