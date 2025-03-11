const PayrollHeader = require('../model/payrollHeaderModel');

// Create a new PayrollHeader
exports.createPayrollHeader = async (req, res) => {
    const { Title, Type } = req.body;

    try {
        const payrollHeader = new PayrollHeader({ Title, Type });
        await payrollHeader.save();
        res.status(201).json(payrollHeader);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all PayrollHeaders
exports.getAllPayrollHeaders = async (req, res) => {
    try {
        const payrollHeaders = await PayrollHeader.find();
        res.status(200).json(payrollHeaders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a PayrollHeader by ID
exports.getPayrollHeaderById = async (req, res) => {
    try {
        const payrollHeader = await PayrollHeader.findById(req.params.id);
        if (!payrollHeader) return res.status(404).json({ message: 'PayrollHeader not found' });
        res.status(200).json(payrollHeader);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a PayrollHeader by ID
exports.updatePayrollHeader = async (req, res) => {
    const { Title, Type } = req.body;

    try {
        const payrollHeader = await PayrollHeader.findByIdAndUpdate(req.params.id, { Title, Type }, { new: true });
        if (!payrollHeader) return res.status(404).json({ message: 'PayrollHeader not found' });
        res.status(200).json(payrollHeader);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a PayrollHeader by ID
exports.deletePayrollHeader = async (req, res) => {
    try {
        const payrollHeader = await PayrollHeader.findByIdAndDelete(req.params.id);
        if (!payrollHeader) return res.status(404).json({ message: 'PayrollHeader not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
