const mongoose = require("mongoose");

const loginModel = new mongoose.Schema({
    Id:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Role:{
        type: String,
        required: true
    },
    DesignationName: {
        type: String
    }
});

const Login = mongoose.model("Login", loginModel);
module.exports = Login;