var mongoose = require("mongoose");

// SCHEMA SETUP
var projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    board: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
        },
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    
});

module.exports = mongoose.model("Project", projectSchema);
