const CompliantFrontOffice = require('../model/complaintFrontOfficeModel');
const moment = require('moment-timezone');
const Counter = require('../model/counterModel');



// Create a new complaint
const addComplaint = async (req, res) => {
    const { Source, Type, AddComplaint, ComplaintFor } = req.body;

    const month = moment().format('MM');
    const year = moment().format('YYYY');
    let id;

    // Basic validation
    if (!Source || !Type || !AddComplaint || !ComplaintFor ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    
    
    try {
        let counter = await Counter.findOne({ Title: `COM-${year}-${month}` });
    
        if (!counter) {
            counter = new Counter({ Title: `COM-${year}-${month}`, Count: 1 });
        } else {
            counter.Count += 1;
        }
    
        id = `COM${year}${month}${counter.Count.toString().padStart(4, '0')}`;

        const complaint = new CompliantFrontOffice({
            CompliantNo: id,
            Source,
            Type,
            Date: moment().tz("Asia/Kolkata").format('DD-MM-YYYY'),
            AddComplaint,
            ComplaintFor,
            Status: "Pending"
        });
        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'ComplaintNo must be unique' });
        }
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await CompliantFrontOffice.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get complaint by ComplaintNo
const getComplaintByComplaintNo = async (req, res) => {
    try {
        const complaint = await CompliantFrontOffice.findOne({ CompliantNo: req.params.complaintNo });
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update complaint by ComplaintNo
const updateComplaint = async (req, res) => {
    try {
        const complaint = await CompliantFrontOffice.findOneAndUpdate(
            { CompliantNo: req.params.complaintNo },
            req.body,
            { new: true }
        );
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.status(200).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete complaint by ComplaintNo
const deleteComplaint = async (req, res) => {
    try {
        const complaint = await CompliantFrontOffice.findOneAndDelete({ CompliantNo: req.params.complaintNo });
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addComplaint,
    getAllComplaints,
    getComplaintByComplaintNo,
    updateComplaint,
    deleteComplaint
};
