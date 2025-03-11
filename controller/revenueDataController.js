const RevenueData = require('../model/revenueDataModel'); // Adjust the path as necessary

// Create a new revenue data entry
exports.createRevenueData = async (req, res) => {
    const { Date, Label, Name, Amount, Vendor, Type, PaymentMode, Detail } = req.body; // Destructure fields

    try {
        const revenueData = new RevenueData({ Date, Label, Name, Amount, Type, Vendor, PaymentMode, Detail });
        await revenueData.save();
        res.status(201).json(revenueData);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Get all revenue data entries
exports.getAllRevenueData = async (req, res) => {
    try {
        const revenueDataEntries = await RevenueData.find();
        res.status(200).json(revenueDataEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get revenue data by ID
exports.getRevenueDataById = async (req, res) => {
    try {
        const revenueData = await RevenueData.findById(req.params.id);
        if (!revenueData) return res.status(404).json({ message: 'Revenue data not found' });
        res.status(200).json(revenueData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update revenue data by ID
exports.updateRevenueData = async (req, res) => {
    const { Date, Label, Name, Amount, Vendor, PaymentMode, Type, Detail } = req.body; // Destructure fields

    try {
        const revenueData = await RevenueData.findByIdAndUpdate(
            req.params.id,
            { Date, Label, Name, Amount, Vendor, PaymentMode, Type, Detail },
            { new: true, runValidators: true }
        );
        if (!revenueData) return res.status(404).json({ message: 'Revenue data not found' });
        res.status(200).json(revenueData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete revenue data by ID
exports.deleteRevenueData = async (req, res) => {
    try {
        const revenueData = await RevenueData.findByIdAndDelete(req.params.id);
        if (!revenueData) return res.status(404).json({ message: 'Revenue data not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
