const moment = require('moment-timezone');
const VisitorFrontOffice = require('../model/visitorFrontOfficeModel');

// Create a new visitor record
const   addVisitorRecord = async (req, res) => {
    const { Category, Name, TotalVisitorNo, Purpose, MobileNo, OTP, verifiedVisitorId } = req.body;

    // Basic validation
    if (!Category || !Name || !Purpose || !MobileNo) {
        return res.status(400).json({ message: 'Category, Date, Time, Name, Purpose, and MobileNo are required' });
    }

    try {
        const visitorRecord = new VisitorFrontOffice({
            Category,
            Date:moment().tz("Asia/Kolkata").format('DD-MM-YYYY'),
            InTime:moment().tz("Asia/Kolkata").format('HH:MM:SS'),
            OutTime:'-',
            Name,
            TotalVisitorNo,
            Purpose,
            MobileNo,
            OTP,
            verifiedVisitorId
        });
        await visitorRecord.save();
        res.status(201).json(visitorRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
};

// Get all visitor records
const getAllVisitorRecords = async (req, res) => {
    try {
        const records = await VisitorFrontOffice.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a visitor record by ID
const getVisitorRecordById = async (req, res) => {
    try {
        const record = await VisitorFrontOffice.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a visitor record by ID
const updateVisitorRecord = async (req, res) => {
    try {
        const record = await VisitorFrontOffice.findByIdAndUpdate(
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

// Delete a visitor record by ID
const deleteVisitorRecord = async (req, res) => {
    try {
        const record = await VisitorFrontOffice.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update OutTime by ID
const updateOutTime = async (req, res) => {
    const { id } = req.params; // Get ID from request parameters
    const { OutTime } = req.body; // Get OutTime from request body

    try {
        const visitor = await VisitorFrontOffice.findByIdAndUpdate(
            id,
            { OutTime:moment().tz("Asia/Kolkata").format('HH:MM:SS') },
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        res.status(200).json({ message: "OutTime updated successfully", visitor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating OutTime", error });
    }
};

module.exports = {
    addVisitorRecord,
    getAllVisitorRecords,
    getVisitorRecordById,
    updateVisitorRecord,
    deleteVisitorRecord,
    updateOutTime
};
