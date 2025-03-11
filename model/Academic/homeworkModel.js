const mongoose = require('mongoose');

const homeworkModel = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    Section: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Chapter: {
        type: String
    },
    Image: {
        type: String
    },
    Title: {
        type: String,
        required: true
    },
    Details: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    }

});

const Homework = mongoose.model("Homework", homeworkModel);
module.exports = Homework;