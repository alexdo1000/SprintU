var express = require("express");
var router = express.Router();
var Ticket = require("../models/ticket");
var middleware = require("../middleware");

// INDEX - SHOW ALL TICKETS
router.get("/", (req, res) => {

    // Get all tickets from DB
    Ticket.find({}, function(err, allTickets){
        if(err){
            console.log(err);
        } else {
            res.render("tickets/index", {tickets: allTickets, currentUser: req.user});
        }
    });

});
// CREATE - ADD NEW TICKET TO DB
router.post("/", (req, res) => {
    // get data from form and add to ticket array
    var ticketCreator = req.body.ticketCreator;
    var title = req.body.title;
    var category = req.body.category;
    var description = req.body.description;
    var points = req.body.points;
    var assignedUser = req.body.assignedUser;
    var lane = req.body.lane;
    var newTicket = {
        ticketCreator:ticketCreator, title:title, category:category,
        description:description, points:points, assignedUser:assignedUser, lane:lane
    };

    // Create a new ticket and save to database
    Ticket.create(newTicket, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to ticket page

            res.redirect("/backlog")
        }
    });


});
// NEW - SHOW FORM TO CREATE Ticket
router.get("/newTicket", (req , res) => {
    res.render("ticket/newTicket");
});

// SHOW - SHOWS INFO ABOUT SPECIFIC TICKET
router.get("/:id", async(req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    res.render("ticket/viewTicket",{ticket});

});

// EDIT Ticket ROUTE
router.get("/:id/editTicket", (req, res) => {
    Ticket.findById(req.params.id, (err, foundTicket) => {
        res.render("ticket/editTicket", {ticket: foundTicket});
    });
});

// UPDATE TICKET ROUTE
router.put("/:id",  (req, res) => {
    // find and update correct ticket
    Ticket.findByIdAndUpdate(req.params.id, req.body.ticket, (err, updatedTicket) => {
        if(err){
            res.redirect("/:id");
        } else {
            // redirect somewhere (show page)
            res.redirect("/backlog");
        }
    });

});

// delete ticket
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    await Ticket.findByIdAndRemove(id);
    res.redirect('/backlog');
});

module.exports = router;