const FeeSlab = require('../model/feeSlabModel');

// Add a new FeeSlab
exports.addFeeSlab = async (req, res) => {
    try {
        const { Class, Fees, ClassId, TotalFee } = req.body;
        const fee = await FeeSlab.findOne({ ClassId });
        
        if (fee) {
            return res.status(400).json({ message: "Class already exists" });
        }

        const feeSlab = new FeeSlab({ Class, ClassId, Fees, TotalFee });
        await feeSlab.save();
        res.status(201).json(feeSlab);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Update a FeeSlab by ID
exports.updateFeeSlab = async (req, res) => {
    try {
        const { Class, ClassId, Fees, TotalFee } = req.body;
        const feeSlab = await FeeSlab.findByIdAndUpdate(
            req.params.id,
            { Class, Fees, ClassId, TotalFee },
            { new: true }
        );
        if (!feeSlab) {
            return res.status(404).json({ message: 'FeeSlab not found' });
        }
        res.json(feeSlab);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a FeeSlab by ID
exports.deleteFeeSlab = async (req, res) => {
    try {
        const feeSlab = await FeeSlab.findByIdAndDelete(req.params.id);
        if (!feeSlab) {
            return res.status(404).json({ message: 'FeeSlab not found' });
        }
        res.json({ message: 'FeeSlab deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all FeeSlabs
exports.getAllFeeSlabs = async (req, res) => {
    try {
        const feeSlabs = await FeeSlab.find();
        res.json(feeSlabs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a FeeSlab by ID
exports.getFeeSlabById = async (req, res) => {
    try {
        const feeSlab = await FeeSlab.findById(req.params.id);
        if (!feeSlab) {
            return res.status(404).json({ message: 'FeeSlab not found' });
        }
        res.json(feeSlab);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
