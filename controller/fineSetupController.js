const FineSetup = require('../model/fineSetupModel');

// Create a new fine setup
exports.createFineSetup = async (req, res) => {
    const { Name, Amount } = req.body; 
    try {
        const fineSetup = new FineSetup({ Name, Amount });
        await fineSetup.save();
        res.status(201).json(fineSetup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all fine setups
exports.getAllFineSetups = async (req, res) => {
    try {
        const fineSetups = await FineSetup.find();
        res.status(200).json(fineSetups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get fine setup by ID
exports.getFineSetupById = async (req, res) => {
    try {
        const fineSetup = await FineSetup.findById(req.params.id);
        if (!fineSetup) return res.status(404).json({ message: 'Fine setup not found' });
        res.status(200).json(fineSetup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update fine setup
exports.updateFineSetup = async (req, res) => {
    const { Name, Amount } = req.body;
    try {
        const fineSetup = await FineSetup.findByIdAndUpdate(
            req.params.id,
            { Name, Amount },
            { new: true }
        );
        if (!fineSetup) return res.status(404).json({ message: 'Fine setup not found' });
        res.status(200).json(fineSetup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete fine setup
exports.deleteFineSetup = async (req, res) => {
    try {
        const fineSetup = await FineSetup.findByIdAndDelete(req.params.id);
        if (!fineSetup) return res.status(404).json({ message: 'Fine setup not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};