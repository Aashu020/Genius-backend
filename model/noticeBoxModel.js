const mongoose = require("mongoose");

const noticeBoxModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Time:{
        type:String
    },
    Description:{
        type:String
    },
    Status:{
        type:String
    }
});

const NoticeBox = mongoose.model("NoticeBox", noticeBoxModel);
module.exports = NoticeBox; 