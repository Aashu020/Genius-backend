const PaySlip = require('../model/paySlipModel');

// Create a new Pay Slip
exports.createPaySlip = async (req, res) => {
    try {
        const { SlipId, EmployeeId, Month, EmployeeName, Amount, Date } = req.body;

        // Check if SlipId already exists
        const existingPaySlip = await PaySlip.findOne({ SlipId });
        if (existingPaySlip) {
            return res.status(400).json({ message: 'Slip ID already exists.' });
        }

        const paySlip = new PaySlip({
            SlipId,
            EmployeeId,
            Month,
            EmployeeName,
            Amount,
            Date
        });

        await paySlip.save();
        res.status(201).json({ message: 'Pay Slip created successfully!', data: paySlip });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all Pay Slips
exports.getAllPaySlips = async (req, res) => {
    try {
        const paySlips = await PaySlip.find();
        res.status(200).json(paySlips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get Pay Slip by SlipId
exports.getPaySlipBySlipId = async (req, res) => {
    try {
        const { SlipId } = req.params;
        const paySlip = await PaySlip.findOne({ SlipId });
        
        if (!paySlip) {
            return res.status(404).json({ message: 'Pay Slip not found.' });
        }

        res.status(200).json({ data: paySlip });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a Pay Slip by SlipId
exports.updatePaySlip = async (req, res) => {
    try {
        const { SlipId } = req.params;
        const { EmployeeId, Month, EmployeeName, Amount, Date } = req.body;

        const paySlip = await PaySlip.findOneAndUpdate(
            { SlipId },
            { EmployeeId, Month, EmployeeName, Amount, Date },
            { new: true }
        );

        if (!paySlip) {
            return res.status(404).json({ message: 'Pay Slip not found.' });
        }

        res.status(200).json({ message: 'Pay Slip updated successfully!', data: paySlip });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a Pay Slip by SlipId
exports.deletePaySlip = async (req, res) => {
    try {
        const { SlipId } = req.params;
        const paySlip = await PaySlip.findOneAndDelete({ SlipId });

        if (!paySlip) {
            return res.status(404).json({ message: 'Pay Slip not found.' });
        }

        res.status(200).json({ message: 'Pay Slip deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
