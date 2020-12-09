var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Ticket = require("../models/ticket");
var Project = require("../models/project");
var Board = require("../models/board");
var middleware = require("../middleware"); //this automatically gets index.js from the middleware folder

router.get("/:board_id/", middleware.isLoggedIn, (req, res) => {
    // Get all tickets from DB
    
    // Get the board from the database, then get ticket bundles, then render the view with the board
    foundBoard = Board.findById(req.params.board_id, async (err, foundBoard) => {
        if (err) {
            console.log(err);
        } else {

            // Now get the arrays of tickets using the lanes which contain all the ticket IDs
                
            
            var lane1Tickets = [];
            var lane2Tickets = [];
            var lane3Tickets = [];
            var lane4Tickets = [];
            var lane5Tickets = [];

            if (foundBoard.lane1) {
                lane1Tickets = await Ticket.find({
                    _id: {
                        $in: foundBoard.lane1
                    }
                }).toArray(function (err, items){
                    if (err) {
                        console.log(err);
                    } 
                });
            }

            if (foundBoard.lane2) {
                lane2Tickets = await Ticket.find({
                    _id: {
                        $in: foundBoard.lane2
                    }
                }).toArray();
            }

            if (foundBoard.lane3) {
                lane3Tickets = await Ticket.find({
                    _id: {
                        $in: foundBoard.lane3
                    }
                }).toArray();
            }

            if (foundBoard.lane4) {
                lane4Tickets = await Ticket.find({
                    _id: {
                        $in: foundBoard.lane4
                    }
                }).toArray();
            }

            if (foundBoard.lane5) {
                lane5Tickets = await Ticket.find({
                    _id: {
                        $in: foundBoard.lane5
                    }
                }).toArray();
            }


            res.render("board", { lane1: lane1Tickets, lane2: lane2Tickets, lane3: lane3Tickets, lane4: lane4Tickets, lane5: lane5Tickets });
        }

    });
    


    // Board.findById

    // Ticket.find({}, function (err, allTickets) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render("board", { tickets: allTickets });
    //     }
    // });
});

module.exports = router;