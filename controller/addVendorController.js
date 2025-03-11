const Vendor = require('../model/addVendorModel');

// Add a new vendor
const addVendor = async (req, res) => {
    try {
        const { Name, MobileNo, GSTNo, Address, City, Remark } = req.body;
        const vendor = new Vendor({ Name, MobileNo, GSTNo, Address, City, Remark });
        await vendor.save();
        res.status(201).json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a vendor by ID
const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a vendor by ID
const updateVendor = async (req, res) => {
    try {
        const { Name, MobileNo, GSTNo, Address, City, Remark } = req.body;
        const vendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            { Name, MobileNo, GSTNo, Address, City, Remark },
            { new: true, runValidators: true }
        );
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(200).json(vendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a vendor by ID
const deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addVendor,
    getAllVendors,
    getVendorById,
    updateVendor,
    deleteVendor
};
