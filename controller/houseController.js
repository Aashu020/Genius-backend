// controllers/houseController.js
const House = require('../model/houseModel');

// Get all houses
exports.getHouses = async (req, res) => {
    try {
        const houses = await House.find();
        res.status(200).json(houses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching houses", error: err.message });
    }
};

// Get a house by ID
exports.getHouseById = async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }
        res.status(200).json(house);
    } catch (err) {
        res.status(500).json({ message: "Error fetching house by ID", error: err.message });
    }
};

// Create a new house
exports.createHouse = async (req, res) => {
    const { HouseName, Color } = req.body;

    // Check if all fields are provided
    if (!HouseName || !Color) {
        return res.status(400).json({ message: "Please provide HouseName and Color" });
    }

    try {
        const newHouse = new House({ HouseName, Color });
        await newHouse.save();
        res.status(201).json(newHouse);
    } catch (err) {
        res.status(500).json({ message: "Error creating house", error: err.message });
        console.log(err); 
    }
};

// Update a house by ID
exports.updateHouse = async (req, res) => {
    const { HouseName, Color } = req.body;
    try {
        const updatedHouse = await House.findByIdAndUpdate(
            req.params.id,
            { HouseName, Color },
            { new: true }
        );
        
        if (!updatedHouse) {
            return res.status(404).json({ message: "House not found" });
        }
        res.status(200).json(updatedHouse);
    } catch (err) {
        res.status(500).json({ message: "Error updating house", error: err.message });
    }
};

// Delete a house by ID
exports.deleteHouse = async (req, res) => {
    try {
        const deletedHouse = await House.findByIdAndDelete(req.params.id);
        if (!deletedHouse) {
            return res.status(404).json({ message: "House not found" });
        }
        res.status(200).json({ message: "House deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting house", error: err.message });
    }
};
