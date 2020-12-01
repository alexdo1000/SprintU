var mongoose = require("mongoose");

// SCHEMA SETUP
var boardSchema = new mongoose.Schema({
    lane1: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Ticket"
        }
    ],
    lane2: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Ticket"
        }
    ],
    lane3: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Ticket"
        }
    ],
    lane4: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Ticket"
        }
    ],
    lane5: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Ticket"
        }
    ],
    backlog: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Ticket"
        }
    ]
});

module.exports = mongoose.model("Board", boardSchema);
