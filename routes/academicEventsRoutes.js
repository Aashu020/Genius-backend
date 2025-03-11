const express = require('express');
const router = express.Router();
const academicEventsController = require('../controller/academicEventsController');

// GET all academic events
router.get('/all', academicEventsController.getAllEvents);

// GET an event by ID
router.get('/get/:id', academicEventsController.getEventById);

// POST a new academic event
router.post('/add', academicEventsController.createEvent);

// PUT (update) an event by ID
router.put('/update/:id', academicEventsController.updateEvent);

// DELETE an event by ID
router.delete('/delete/:id', academicEventsController.deleteEvent);

module.exports = router;
