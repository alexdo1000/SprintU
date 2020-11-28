var mongoose = require("mongoose");

// SCHEMA SETUP
var ticketSchema = new mongoose.Schema({
    ticketID: String,
    ticketCreator: String,
    title: String,
    category: String,
    description: String,
    points: Double,
    assignedUser: String,
    lane: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Ticket", ticketSchema);
