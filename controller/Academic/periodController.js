const Period = require('../../model/Academic/periodModel');

// Add a new period
exports.addPeriod = async (req, res) => {
    const { Title, StartTime, EndTime } = req.body;
    try {
        const period = new Period({ Title, StartTime, EndTime });
        await period.save();
        res.status(201).json(period);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all periods
exports.getAllPeriods = async (req, res) => {
    try {
        const periods = await Period.find();
        res.status(200).json(periods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get period by ID
exports.getPeriodById = async (req, res) => {
    try {
        const period = await Period.findById(req.params.id);
        if (!period) {
            return res.status(404).json({ message: 'Period not found' });
        }
        res.status(200).json(period);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update period
exports.updatePeriod = async (req, res) => {
    const { Title, StartTime, EndTime } = req.body;
    try {
        const period = await Period.findByIdAndUpdate(
            req.params.id,
            { Title, StartTime, EndTime },
            { new: true, runValidators: true }
        );
        if (!period) {
            return res.status(404).json({ message: 'Period not found' });
        }
        res.status(200).json(period);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete period
exports.deletePeriod = async (req, res) => {
    try {
        const period = await Period.findByIdAndDelete(req.params.id);
        if (!period) {
            return res.status(404).json({ message: 'Period not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
