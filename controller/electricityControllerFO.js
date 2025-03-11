const ElectricityFrontOffice = require('../model/electricityFrontOfficeModel');

// Create a new electricity reading
const addReading = async (req, res) => {
    const { Date, MeterNo, Reading } = req.body;

    // Basic validation
    if (!Date || !MeterNo || !Reading) {
        return res.status(400).json({ message: 'Date, MeterNo, and Reading are required' });
    }

    try {
        const reading = new ElectricityFrontOffice({
            Date,
            MeterNo,
            Reading
        });
        await reading.save();
        res.status(201).json(reading);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all electricity readings
const getAllReadings = async (req, res) => {
    try {
        const readings = await ElectricityFrontOffice.find();
        res.status(200).json(readings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get reading by ID
const getReadingById = async (req, res) => {
    try {
        const reading = await ElectricityFrontOffice.findById(req.params.id);
        if (!reading) return res.status(404).json({ message: 'Reading not found' });
        res.status(200).json(reading);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update reading by ID
const updateReading = async (req, res) => {
    try {
        const reading = await ElectricityFrontOffice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!reading) return res.status(404).json({ message: 'Reading not found' });
        res.status(200).json(reading);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete reading by ID
const deleteReading = async (req, res) => {
    try {
        const reading = await ElectricityFrontOffice.findByIdAndDelete(req.params.id);
        if (!reading) return res.status(404).json({ message: 'Reading not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addReading,
    getAllReadings,
    getReadingById,
    updateReading,
    deleteReading
};