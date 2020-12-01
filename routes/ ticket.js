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
    var ticketID = req.body.ticketID;
    var ticketCreator = req.body.ticketCreator;
    var title = req.body.title;
    var category = req.body.category;
    var description = req.body.description;
    var points = req.body.points;
    var assignedUser = req.body.assignedUser;
    var lane = req.body.lane;
    var newTicket = {
        ticketID:ticketID, ticketCreator:ticketCreator, title:title, category:category,
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
// NEW - SHOW FORM TO CREATE CAMPGROUND
router.get("/new", (req , res) => {
    res.render("campgrounds/new");
});
// SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/:id", (req, res) => {
    // find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) console.log(err);
        else{
            console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            // redirect somewhere (show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });

});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) res.redirect("/campgrounds");
        else res.redirect("/campgrounds");
    });
});

module.exports = router;