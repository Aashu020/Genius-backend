const ExpenseHeader = require('../model/addExpenseHeaderModel');

// Create a new expense header
exports.createExpenseHeader = async (req, res) => {
    const { Title, Type, Description } = req.body;
    console.log(req.body);
    try {
        const expenseHeader = new ExpenseHeader({ Title, Type, Description });
        await expenseHeader.save();
        res.status(201).json(expenseHeader);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Get all expense headers
exports.getAllExpenseHeaders = async (req, res) => {
    try {
        const expenseHeaders = await ExpenseHeader.find();
        res.status(200).json(expenseHeaders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get expense header by ID
exports.getExpenseHeaderById = async (req, res) => {
    try {
        const expenseHeader = await ExpenseHeader.findById(req.params.id);
        if (!expenseHeader) return res.status(404).json({ message: 'Expense header not found' });
        res.status(200).json(expenseHeader);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update expense header by ID
exports.updateExpenseHeader = async (req, res) => {
    const { Title, Type, Description } = req.body;

    try {
        const expenseHeader = await ExpenseHeader.findByIdAndUpdate(
            req.params.id,
            { Title, Description },
            { new: true, runValidators: true }
        );
        if (!expenseHeader) return res.status(404).json({ message: 'Expense header not found' });
        res.status(200).json(expenseHeader);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete expense header by ID
exports.deleteExpenseHeader = async (req, res) => {
    try {
        const expenseHeader = await ExpenseHeader.findByIdAndDelete(req.params.id);
        if (!expenseHeader) return res.status(404).json({ message: 'Expense header not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
