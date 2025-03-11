const FeeReceipt = require('../model/feeReciptModel');

// Add a new fee receipt
exports.addFeeReceipt = async (req, res) => {
    try {
        const feeReceipt = new FeeReceipt(req.body);
        await feeReceipt.save();
        res.status(201).json({ message: 'Fee receipt created successfully', feeReceipt });
    } catch (error) {
        res.status(400).json({ message: 'Error creating fee receipt', error });
    }
};

// Get all fee receipts
exports.getAllFeeReceipts = async (req, res) => {
    try {
        const feeReceipts = await FeeReceipt.find();
        res.status(200).json(feeReceipts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fee receipts', error });
    }
};

// Get fee receipt by ReceiptId
exports.getFeeReceiptById = async (req, res) => {
    try {
        const feeReceipt = await FeeReceipt.findOne({ ReceiptId: req.params.receiptId });
        if (!feeReceipt) {
            return res.status(404).json({ message: 'Fee receipt not found' });
        }
        res.status(200).json(feeReceipt);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fee receipt', error });
    }
};

// Update fee receipt
exports.updateFeeReceipt = async (req, res) => {
    try {
        const feeReceipt = await FeeReceipt.findOneAndUpdate(
            { ReceiptId: req.params.receiptId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!feeReceipt) {
            return res.status(404).json({ message: 'Fee receipt not found' });
        }
        res.status(200).json({ message: 'Fee receipt updated successfully', feeReceipt });
    } catch (error) {
        res.status(400).json({ message: 'Error updating fee receipt', error });
    }
};

// Delete fee receipt
exports.deleteFeeReceipt = async (req, res) => {
    try {
        const feeReceipt = await FeeReceipt.findOneAndDelete({ ReceiptId: req.params.receiptId });
        if (!feeReceipt) {
            return res.status(404).json({ message: 'Fee receipt not found' });
        }
        res.status(200).json({ message: 'Fee receipt deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting fee receipt', error });
    }
};
