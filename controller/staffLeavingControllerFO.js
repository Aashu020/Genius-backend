const StaffLeaving = require('../model/staffLeavingModelFrontOffice');
const moment = require('moment-timezone');

// Create a new staff leaving record
const addLeavingRecord = async (req, res) => {
    console.log(req.body);
    const { Name, Department, Purpose, WillBack, TimeOfBack, VehicleUsed, TimeOfLeaving, ApprovedBy } = req.body;

    // Basic validation
    if (!Name || !Department || !Purpose) {
        return res.status(400).json({ message: 'Name, Department, and Purpose are required' });
    }

    try {
        const leavingRecord = new StaffLeaving({
            Name,
            Date: moment().tz("Asia/Kolkata").format('DD-MM-YYYY'),
            Time: moment().tz("Asia/Kolkata").format('HH:MM:SS'),
            Department,
            Purpose,
            WillBack,
            TimeOfBack,
            VehicleUsed,
            TimeOfLeaving,
            ApprovedBy
        });
        await leavingRecord.save();
        res.status(201).json(leavingRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

// Get all staff leaving records
const getAllLeavingRecords = async (req, res) => {
    try {
        const records = await StaffLeaving.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a leaving record by ID
const getLeavingRecordById = async (req, res) => {
    try {
        const record = await StaffLeaving.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a leaving record by ID
const updateLeavingRecord = async (req, res) => {
    try {
        const record = await StaffLeaving.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a leaving record by ID
const deleteLeavingRecord = async (req, res) => {
    try {
        const record = await StaffLeaving.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addLeavingRecord,
    getAllLeavingRecords,
    getLeavingRecordById,
    updateLeavingRecord,
    deleteLeavingRecord
};
