const express = require('express');
const router = express.Router();
const noticeBoxController = require('../controller/noticeBoxController');

// GET all notices
router.get('/all', noticeBoxController.getAllNotices);

// GET a single notice by ID
router.get('/get/:id', noticeBoxController.getNoticeById);

// POST a new notice
router.post('/add', noticeBoxController.createNotice);

// PUT (update) a notice by ID
router.put('/update/:id', noticeBoxController.updateNotice);

// DELETE a notice by ID
router.delete('/delete/:id', noticeBoxController.deleteNotice);

module.exports = router;
