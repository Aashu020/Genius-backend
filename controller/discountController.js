const Discount = require('../model/discountModel');

// Create a new discount
exports.createDiscount = async (req, res) => {
    const { Title, Percentage } = req.body;
    try {
        const discount = new Discount({ Title, Percentage });
        await discount.save();
        res.status(201).json(discount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all discounts
exports.getAllDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.status(200).json(discounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get discount by ID
exports.getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findById(req.params.id);
        if (!discount) return res.status(404).json({ message: 'Discount not found' });
        res.status(200).json(discount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update discount
exports.updateDiscount = async (req, res) => {
    const { Title, Percentage } = req.body;
    try {
        const discount = await Discount.findByIdAndUpdate(
            req.params.id,
            { Title, Percentage },
            { new: true }
        );
        if (!discount) return res.status(404).json({ message: 'Discount not found' });
        res.status(200).json(discount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete discount
exports.deleteDiscount = async (req, res) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id);
        if (!discount) return res.status(404).json({ message: 'Discount not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};