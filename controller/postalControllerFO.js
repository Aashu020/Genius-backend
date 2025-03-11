const PostalDispatchedFrontOffice = require('../model/postalDispatchedFrontOfficeModel');

// Create a new postal dispatch record
const addDispatch = async (req, res) => {
    const { Category, Name, Date, Item, UnitNo, ReferenceNo, Address, FromWhom, Remark } = req.body;

    // Basic validation
    if (!Category || !Name || !Date || !Item || !UnitNo || !ReferenceNo || !Address || !FromWhom) {
        return res.status(400).json({ message: 'All fields except Remark are required' });
    }

    try {
        const dispatch = new PostalDispatchedFrontOffice({
            Category,
            Name,
            Date,
            Item,
            UnitNo,
            ReferenceNo,
            Address,
            FromWhom,
            Remark
        });
        await dispatch.save();
        res.status(201).json(dispatch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all postal dispatch records
const getAllDispatches = async (req, res) => {
    try {
        const dispatches = await PostalDispatchedFrontOffice.find();
        res.status(200).json(dispatches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get dispatch by ID
const getDispatchById = async (req, res) => {
    try {
        const dispatch = await PostalDispatchedFrontOffice.findById(req.params.id);
        if (!dispatch) return res.status(404).json({ message: 'Dispatch not found' });
        res.status(200).json(dispatch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update dispatch by ID
const updateDispatch = async (req, res) => {
    try {
        const dispatch = await PostalDispatchedFrontOffice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!dispatch) return res.status(404).json({ message: 'Dispatch not found' });
        res.status(200).json(dispatch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete dispatch by ID
const deleteDispatch = async (req, res) => {
    try {
        const dispatch = await PostalDispatchedFrontOffice.findByIdAndDelete(req.params.id);
        if (!dispatch) return res.status(404).json({ message: 'Dispatch not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addDispatch,
    getAllDispatches,
    getDispatchById,
    updateDispatch,
    deleteDispatch
};
