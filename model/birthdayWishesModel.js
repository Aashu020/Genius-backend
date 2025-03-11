const mongoose = require('mongoose');

// Birthday Wishes Schema
const birthdayWishesModel = new mongoose.Schema({
    SenderId: {
        type: String,
    },
    SenderName: {
        type: String,
    },
    SenderRole: {
        type: String,
    },
    ReceiverId: {
        type: String,
    },
    ReceiverName: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to the current date/time when created
    },
});

// Add TTL index to the `createdAt` field to delete documents after 24 hours (86400 seconds)
birthdayWishesModel.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const FeeData = mongoose.model("BirthdayWishes", birthdayWishesModel);

module.exports = FeeData;
