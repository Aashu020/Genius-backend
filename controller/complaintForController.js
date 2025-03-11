const ComplaintFor = require('../model/conplaintForModel');

// Get all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await ComplaintFor.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get complaint by ID
const getComplaintById = async (req, res) => {
    const { id } = req.params;
    try {
        const complaint = await ComplaintFor.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Create a new complaint
const createComplaint = async (req, res) => {
    const { ComplaintForName } = req.body;
    try {
        const newComplaint = new ComplaintFor({ ComplaintForName });
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (error) {
        res.status(400).json({ message: "Error creating complaint", error });
    }
};

// Update a complaint
const updateComplaint = async (req, res) => {
    const { id } = req.params;
    const { ComplaintForName } = req.body;
    try {
        const updatedComplaint = await ComplaintFor.findByIdAndUpdate(id, { ComplaintForName }, { new: true });
        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(400).json({ message: "Error updating complaint", error });
    }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComplaint = await ComplaintFor.findByIdAndDelete(id);
        if (!deletedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        res.status(200).json({ message: "Complaint deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    getAllComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
};
