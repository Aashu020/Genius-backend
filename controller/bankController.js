const AddBank = require('../model/addBankModel'); // Adjust the path as needed

// Create a new bank entry
exports.createBank = async (req, res) => {
    try {
        const newBank = new AddBank(req.body);
        await newBank.save();
        res.status(201).json(newBank);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};

// Get all bank entries
exports.getAllBanks = async (req, res) => {
    try {
        const banks = await AddBank.find();
        res.status(200).json(banks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a bank entry by ID
exports.getBankById = async (req, res) => {
    try {
        const bank = await AddBank.findById(req.params.id);
        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' });
        }
        res.status(200).json(bank);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a bank entry by ID
exports.updateBank = async (req, res) => {
    try {
        const bank = await AddBank.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' });
        }
        res.status(200).json(bank);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a bank entry by ID
exports.deleteBank = async (req, res) => {
    try {
        const bank = await AddBank.findByIdAndDelete(req.params.id);
        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
