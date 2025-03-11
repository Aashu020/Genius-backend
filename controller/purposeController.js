const Purpose = require('../model/purposeModel'); // Update the path accordingly

// GET all purposes
exports.getAllPurposes = async (req, res) => {
    try {
        const purposes = await Purpose.find();
        res.status(200).json(purposes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a purpose by ID
exports.getPurposeById = async (req, res) => {
    try {
        const purpose = await Purpose.findById(req.params.id);
        if (!purpose) return res.status(404).json({ message: 'Purpose not found' });
        res.status(200).json(purpose);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new purpose
exports.createPurpose = async (req, res) => {
    const purpose = new Purpose({
        PurposeTitle: req.body.PurposeTitle
    });

    try {
        const savedPurpose = await purpose.save();
        res.status(201).json(savedPurpose);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT (update) a purpose
exports.updatePurpose = async (req, res) => {
    try {
        const updatedPurpose = await Purpose.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPurpose) return res.status(404).json({ message: 'Purpose not found' });
        res.status(200).json(updatedPurpose);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a purpose
exports.deletePurpose = async (req, res) => {
    try {
        const deletedPurpose = await Purpose.findByIdAndDelete(req.params.id);
        if (!deletedPurpose) return res.status(404).json({ message: 'Purpose not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
