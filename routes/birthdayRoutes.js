const express = require('express');
const router = express.Router();
const { sendBirthdayWish, getBirthdayWishesByReceiverId } = require('../controller/birthdayWishesController');

// Route to send birthday wish
router.post('/send-birthday-wish', sendBirthdayWish);

// Route to get birthday wishes by ReceiverId
router.get('/wishes/:ReceiverId', getBirthdayWishesByReceiverId);

module.exports = router;
