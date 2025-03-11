const ApprovedBy = require("../model/approvedByModel");

// Get all approvedBy records
const getAllApprovedBy = async (req, res) => {
    try {
        const approvedByList = await ApprovedBy.find();
        res.status(200).json(approvedByList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get approvedBy record by ID
const getApprovedByById = async (req, res) => {
    try {
        const approvedBy = await ApprovedBy.findById(req.params.id);
        if (!approvedBy) return res.status(404).json({ message: "Not found" });
        res.status(200).json(approvedBy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new approvedBy record
const createApprovedBy = async (req, res) => {
    const approvedBy = new ApprovedBy({
        ApprovedByTitle: req.body.ApprovedByTitle,
    });

    try {
        const savedApprovedBy = await approvedBy.save();
        res.status(201).json(savedApprovedBy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an approvedBy record
const updateApprovedBy = async (req, res) => {
    try {
        const updatedApprovedBy = await ApprovedBy.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedApprovedBy) return res.status(404).json({ message: "Not found" });
        res.status(200).json(updatedApprovedBy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an approvedBy record
const deleteApprovedBy = async (req, res) => {
    try {
        const deletedApprovedBy = await ApprovedBy.findByIdAndDelete(req.params.id);
        if (!deletedApprovedBy) return res.status(404).json({ message: "Not found" });
        res.status(204).send(); // No content to return
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllApprovedBy,
    getApprovedByById,
    createApprovedBy,
    updateApprovedBy,
    deleteApprovedBy,
};
