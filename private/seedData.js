var mongoose    = require("mongoose");
var Ticket  = require("../models/ticket");

var ticketData = [
    {
        ticketID: 1,
        ticketCreator: "Alex Do",
        title: "Add board functionality",
        category: "Board",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        points: 5,
        assignedUser: "Alex Do",
        lane: "To Do",
    },
    {
        ticketID: 2,
        ticketCreator: "Ticket Creator",
        title: "Backlog feature",
        category: "Board",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        points: 5,
        assignedUser: "Assigned User",
        lane: "In Progress",
    }, 
    {
        ticketID: 2,
        ticketCreator: "Bob Joe",
        title: "Backlog feature",
        category: "Board",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        points: 5,
        assignedUser: "Bob Joe",
        lane: "In Progress",
    },
]

function seedDB() {
    // add the ticketData
    ticketData.forEach((seed) => {
        Ticket.create(seed, (err, ticket) => {
            if(err) console.log(err);
            else {
                console.log("Added ticket")
            }
        });
    });
}

module.exports = seedDB;