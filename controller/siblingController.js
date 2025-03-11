const Sibling = require('../model/SiblingModel'); 

// Add a new sibling
const addSibling = async (req, res) => {
    const { SiblingId, StudentId, StudentName, Sibling } = req.body;
    try {
        const newSibling = new Sibling({ SiblingId, ExistingStudentId, ExistingStudentName, Sibling });
        await newSibling.save();
        res.status(201).json(newSibling);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get sibling by SiblingId
const getSiblingById = async (req, res) => {
    try {
        const sibling = await Sibling.findOne({ SiblingId: req.params.siblingId });
        if (!sibling) return res.status(404).json({ message: "Sibling not found" });
        res.json(sibling);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all siblings
const getAllSiblings = async (req, res) => {
    try {
        const siblings = await Sibling.find();
        res.json(siblings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update sibling by SiblingId
const updateSibling = async (req, res) => {
    const { StudentId, StudentName, Sibling } = req.body;
    try {
        const sibling = await Sibling.findOneAndUpdate(
            { SiblingId: req.params.siblingId },
            { StudentId, StudentName, Sibling },
            { new: true, runValidators: true }
        );
        if (!sibling) return res.status(404).json({ message: "Sibling not found" });
        res.json(sibling);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete sibling by SiblingId
const deleteSibling = async (req, res) => {
    try {
        const sibling = await Sibling.findOneAndDelete({ SiblingId: req.params.siblingId });
        if (!sibling) return res.status(404).json({ message: "Sibling not found" });
        res.json({ message: "Sibling deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addSibling,
    getSiblingById,
    getAllSiblings,
    updateSibling,
    deleteSibling
};
