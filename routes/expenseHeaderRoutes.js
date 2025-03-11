const express = require('express');
const router = express.Router();
const expenseHeaderController = require('../controller/expenseHeaderController');

// Route to create a new expense header
router.post('/add', expenseHeaderController.createExpenseHeader);

// Route to get all expense headers
router.get('/all', expenseHeaderController.getAllExpenseHeaders);

// Route to get an expense header by ID
router.get('/get/:id', expenseHeaderController.getExpenseHeaderById);

// Route to update an expense header by ID
router.put('/update/:id', expenseHeaderController.updateExpenseHeader);

// Route to delete an expense header by ID
router.delete('/delete/:id', expenseHeaderController.deleteExpenseHeader);

module.exports = router;
