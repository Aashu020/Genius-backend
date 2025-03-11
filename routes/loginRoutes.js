const express = require('express');
const router = express.Router();
const { login, changePassword, getAllLogins, createLogin, updateLogin, deleteLogin } = require('../controller/loginController');

// Login route
router.post('/login', login);

router.post('/add', createLogin);

// Get All Data
router.get('/all', getAllLogins);

// Change password route
router.put('/change-password', changePassword);

// PUT to update a login
router.put('/update/:id', updateLogin);

// DELETE a login
router.delete('/delete/:id', deleteLogin);

module.exports = router;

