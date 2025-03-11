const moment = require('moment-timezone');
const StudentLeaving = require('../model/studentLeavingModelFrontOffice');

// Create a new student leaving record
const addLeavingRecord = async (req, res) => {
    const { Name, Class, Section, Purpose, LeavingWith, Relation, verifiedVisitorId, TimeOfLeaving, ApprovedBy } = req.body;

    // Basic validation
    if (!Name || !Class || !Purpose || !LeavingWith) {
        return res.status(400).json({ message: 'Name, Class, Purpose, and LeavingWith are required' });
    }

    try {
        const leavingRecord = new StudentLeaving({
            Name,
            Date:moment().tz("Asia/Kolkata").format('DD-MM-YYYY'),
            Time:moment().tz("Asia/Kolkata").format('HH:MM:SS'),
            Class,
            Section,
            Purpose,
            LeavingWith,
            Relation,
            verifiedVisitorId,
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

// Get all student leaving records
const getAllLeavingRecords = async (req, res) => {
    try {
        const records = await StudentLeaving.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a leaving record by ID
const getLeavingRecordById = async (req, res) => {
    try {
        const record = await StudentLeaving.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a leaving record by ID
const updateLeavingRecord = async (req, res) => {
    try {
        const record = await StudentLeaving.findByIdAndUpdate(
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
        const record = await StudentLeaving.findByIdAndDelete(req.params.id);
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
