const FeeData = require('../model/birthdayWishesModel'); // Import the Birthday Wishes Model

// Function to send birthday wish
const sendBirthdayWish = async (req, res) => {
    const { SenderId, SenderName, SenderRole, ReceiverId, ReceiverName } = req.body;

    try {
        // Check if a birthday wish already exists for this sender and receiver
        const existingWish = await FeeData.findOne({ SenderId, ReceiverId });

        if (existingWish) {
            return res.status(400).json({
                message: 'A birthday wish has already been sent by this sender to the receiver.',
            });
        }

        // Create the birthday wish
        const birthdayWish = new FeeData({
            SenderId,
            SenderName,
            SenderRole,
            ReceiverId,
            ReceiverName,
        });

        // Save the birthday wish to the database
        const savedWish = await birthdayWish.save();

        // Respond with the saved wish
        res.status(200).json({
            message: 'Birthday wish sent successfully!',
            data: savedWish,
        });
    } catch (err) {
        console.error('Error sending birthday wish:', err);
        res.status(500).json({
            message: 'Failed to send birthday wish.',
            error: err,
        });
    }
};

// Function to get all birthday wishes by ReceiverId
const getBirthdayWishesByReceiverId = async (req, res) => {
    const { ReceiverId } = req.params;

    try {
        // Find all birthday wishes for the given receiver
        const wishes = await FeeData.find({ ReceiverId });

        // Check if there are any wishes
        if (wishes.length === 0) {
            return res.status(404).json({
                message: `No birthday wishes found for receiver with ID: ${ReceiverId}`,
            });
        }

        // Return the birthday wishes
        res.status(200).json({
            message: 'Birthday wishes retrieved successfully!',
            data: wishes,
        });
    } catch (err) {
        console.error('Error fetching birthday wishes:', err);
        res.status(500).json({
            message: 'Failed to fetch birthday wishes.',
            error: err,
        });
    }
};

module.exports = { sendBirthdayWish, getBirthdayWishesByReceiverId };
