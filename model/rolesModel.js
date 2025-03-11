const mongoose = require("mongoose");

const rolesModel = new mongoose.Schema({
    RoleName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const Roles = mongoose.model("Roles", rolesModel);
module.exports = Roles;