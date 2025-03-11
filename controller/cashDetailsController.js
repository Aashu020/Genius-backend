const CashDetails = require('../model/addCashDetails');

// Add cash details
const addCashDetails = async (req, res) => {
    try {
        const { Type, Date, Amount, ByWhom, Bank, Remark } = req.body; // Destructure here
        const cashDetails = new CashDetails({ Type, Date, Amount, ByWhom, Bank, Remark });
        await cashDetails.save();
        res.status(201).json(cashDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all cash details
const getAllCashDetails = async (req, res) => {
    try {
        const cashDetails = await CashDetails.find();
        res.status(200).json(cashDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

// Get cash details by ID
const getCashDetailsById = async (req, res) => {
    try {
        const cashDetail = await CashDetails.findById(req.params.id);
        if (!cashDetail) return res.status(404).json({ message: 'Cash detail not found' });
        res.status(200).json(cashDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cash details by ID
const updateCashDetails = async (req, res) => {
    try {
        const { Type, Date, Amount, ByWhom, Bank, Remark } = req.body; // Destructure here
        const cashDetail = await CashDetails.findByIdAndUpdate(
            req.params.id,
            { Type, Date, Amount, ByWhom, Bank, Remark },
            { new: true, runValidators: true }
        );
        if (!cashDetail) return res.status(404).json({ message: 'Cash detail not found' });
        res.status(200).json(cashDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Delete cash details by ID
const deleteCashDetails = async (req, res) => {
    try {
        const cashDetail = await CashDetails.findByIdAndDelete(req.params.id);
        if (!cashDetail) return res.status(404).json({ message: 'Cash detail not found' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = {
    addCashDetails,
    getAllCashDetails,
    getCashDetailsById,
    updateCashDetails,
    deleteCashDetails
};
