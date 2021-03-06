var express = require("express");
var router = express.Router({ mergeParams: true });
var Ticket = require("../models/ticket");
var Board = require("../models/board");
var User = require("../models/user");
var middleware = require("../middleware"); //this automatically gets index.js from the middleware folder

// INDEX - SHOW ALL TICKETS
router.get("/", middleware.isLoggedIn, (req, res) => {

    // Get all tickets from DB
    Ticket.find({}, function (err, allTickets) {
        if (err) {
            console.log(err);
        } else {
            res.render("tickets/index", { tickets: allTickets, currentUser: req.user });
        }
    });

});
// CREATE - ADD NEW TICKET TO DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to ticket array
    var ticketCreator = req.body.ticketCreator;
    var title = req.body.title;
    var category = req.body.category;
    var description = req.body.description;
    var points = req.body.points;
    var assignedUser = req.body.assignedUser;
    var lane = req.body.lane;
    var newTicket = {
        ticketCreator: ticketCreator,
        title: title,
        category: category,
        description: description,
        points: points,
        assignedUser: assignedUser,
        lane: lane
    };

    // Create a new ticket and save to database
    Ticket.create(newTicket, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {

            // Add it to the right lane
            Board.findById(req.params.backlog_id, async (err, foundBoard) => {
                if (err) {
                    console.log(err);
                } else {
                    // Need to get the lane array, push to it
                    if (lane == 'Backlog') {
                        foundBoard.backlog.push(newlyCreated);
                    } else if (lane == 'To do') {
                        foundBoard.lane1.push(newlyCreated);
                    } else if (lane == 'In Progress') {
                        foundBoard.lane2.push(newlyCreated);
                    } else if (lane == 'Review') {
                        foundBoard.lane3.push(newlyCreated);
                    } else if (lane == 'Testing') {
                        foundBoard.lane4.push(newlyCreated);
                    } else if (lane == 'Done') {
                        foundBoard.lane5.push(newlyCreated);
                    }

                    foundBoard.save();
                }
            });

            // redirect back to backlog
            urlStr = "/projects/" + req.params.id + "/backlog/" + req.params.backlog_id;
            res.redirect(urlStr);
        }
    });

});
// NEW - SHOW FORM TO CREATE Ticket
router.get("/newTicket", middleware.isLoggedIn, (req, res) => {
    res.render("ticket/newTicket", { projectID: req.params.id, backlogID: req.params.backlog_id });
});

// SHOW - SHOWS INFO ABOUT SPECIFIC TICKET
router.get("/:ticket_id", middleware.isLoggedIn, async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticket_id, (err, foundTicket) => {
        if (err) {
            console.log(err);
        } else {
            res.render("ticket/viewTicket", { ticket: foundTicket, projectID: req.params.id, backlogID: req.params.backlog_id });
        }
    });
    console.log(req.params);

    // const ticket = await Ticket.findById(req.params.ticket_id);
    // res.render("ticket/viewTicket", { ticket: foundTicket, projectID: req.params.id, backlogID: req.params.backlog_id });

});

// EDIT Ticket ROUTE
router.get("/:ticket_id/editTicket", middleware.isLoggedIn, (req, res) => {
    Ticket.findById(req.params.ticket_id, (err, foundTicket) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("ticket/editTicket", { ticket: foundTicket, projectID: req.params.id, backlogID: req.params.backlog_id, ticketID: req.params.ticket_id });
        }
    });
});

// UPDATE TICKET ROUTE
router.put("/:ticket_id", middleware.isLoggedIn, (req, res) => {
    // find and update correct ticket

    changed = false;
    var ticketCreator = req.body.ticketCreator;
    var title = req.body.title;
    var category = req.body.category;
    var description = req.body.description;
    var points = req.body.points;
    var assignedUser = req.body.assignedUser;
    var lane = req.body.lane;
    var newTicket = {
        ticketCreator: ticketCreator,
        title: title,
        category: category,
        description: description,
        points: points,
        assignedUser: assignedUser,
        lane: lane
    };


    console.log(newTicket);


    Ticket.findByIdAndRemove(req.params.ticket_id, (err) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            // Create a new ticket and save to database
            Ticket.create(newTicket, function (err, newlyCreated) {
                if (err) {
                    console.log(err);
                } else {

                    // Add it to the right lane
                    Board.findById(req.params.backlog_id, async (err, foundBoard) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // Need to get the lane array, push to it
                            if (lane == 'Backlog') {
                                foundBoard.backlog.push(newlyCreated);
                            } else if (lane == 'To do') {
                                foundBoard.lane1.push(newlyCreated);
                            } else if (lane == 'In Progress') {
                                foundBoard.lane2.push(newlyCreated);
                            } else if (lane == 'Review') {
                                foundBoard.lane3.push(newlyCreated);
                            } else if (lane == 'Testing') {
                                foundBoard.lane4.push(newlyCreated);
                            } else if (lane == 'Done') {
                                foundBoard.lane5.push(newlyCreated);
                            }

                            foundBoard.save();
                        }
                    });

                    // redirect back to backlog
                    urlStr = "/projects/" + req.params.id + "/backlog/" + req.params.backlog_id;
                    res.redirect(urlStr);
                }
            });
        }
    });    

});

// delete ticket
router.delete("/:ticket_id", middleware.isLoggedIn, async (req, res) => {
    Ticket.findByIdAndDelete(req.params.ticket_id, (err) => {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            urlStr = "/projects/" + req.params.id + "/backlog/" + req.params.backlog_id;
            res.redirect(urlStr);
        }
    } )
});

module.exports = router;