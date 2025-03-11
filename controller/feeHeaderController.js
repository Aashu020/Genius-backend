const FeeHeader = require('../model/addFeeHeaderModel');

// Add a new FeeHeader
exports.addFeeHeader = async (req, res) => {
    try {
        const { Name, SchoolRevenue, FeeMode, Description } = req.body; 
        const feeHeader = new FeeHeader({ Name, SchoolRevenue, FeeMode, Description });
        await feeHeader.save();
        res.status(201).json(feeHeader);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a FeeHeader by ID
exports.updateFeeHeader = async (req, res) => {
    try {
        const { Name, SchoolRevenue, FeeMode, Description } = req.body;
        const feeHeader = await FeeHeader.findByIdAndUpdate(
            req.params.id,
            { Name, SchoolRevenue, FeeMode, Description },
            { new: true }
        );
        if (!feeHeader) {
            return res.status(404).json({ message: 'FeeHeader not found' });
        }
        res.json(feeHeader);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Delete a FeeHeader by ID
exports.deleteFeeHeader = async (req, res) => {
    try {
        const feeHeader = await FeeHeader.findByIdAndDelete(req.params.id);
        if (!feeHeader) {
            return res.status(404).json({ message: 'FeeHeader not found' });
        }
        res.json({ message: 'FeeHeader deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all FeeHeaders
exports.getAllFeeHeaders = async (req, res) => {
    try {
        const feeHeaders = await FeeHeader.find();
        res.json(feeHeaders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a FeeHeader by ID
exports.getFeeHeaderById = async (req, res) => {
    try {
        const feeHeader = await FeeHeader.findById(req.params.id);
        if (!feeHeader) {
            return res.status(404).json({ message: 'FeeHeader not found' });
        }
        res.json(feeHeader);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
