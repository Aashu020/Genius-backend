const Designation = require('../model/designationModel'); // Adjust the path as necessary

// Get all designations
exports.getAllDesignations = async (req, res) => {
    try {
        const designations = await Designation.find();
        res.status(200).json(designations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a designation by ID
exports.getDesignationById = async (req, res) => {
    try {
        const designation = await Designation.findById(req.params.id);
        if (!designation) return res.status(404).json({ message: 'Designation not found' });
        res.status(200).json(designation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new designation
exports.createDesignation = async (req, res) => {
    const designation = new Designation({
        DesignationName: req.body.DesignationName,
        Description: req.body.Description
    });

    try {
        const savedDesignation = await designation.save();
        res.status(201).json(savedDesignation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a designation
exports.updateDesignation = async (req, res) => {
    try {
        const updatedDesignation = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDesignation) return res.status(404).json({ message: 'Designation not found' });
        res.status(200).json(updatedDesignation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a designation
exports.deleteDesignation = async (req, res) => {
    try {
        const deletedDesignation = await Designation.findByIdAndDelete(req.params.id);
        if (!deletedDesignation) return res.status(404).json({ message: 'Designation not found' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
