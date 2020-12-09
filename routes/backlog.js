var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Ticket = require("../models/ticket");
var Project = require("../models/project");
var Board = require("../models/board");
var middleware = require("../middleware");


router.get("/:backlog_id/", middleware.isLoggedIn, (req, res) => {
    foundBoard = Board.findById(req.params.backlog_id, async (err, foundBoard) => {
        if (err) {
            console.log(err);
        } else {
            var backlogTickets = [];
            console.log(foundBoard.backlog)
            if (foundBoard.backlog) {
                backlogTickets = await Ticket.find({
                    _id: {
                        $in: foundBoard.backlog
                    }
                }, function (err, docs) {
                    console.log(docs)
                    console.log(typeof (docs))
                });
            }

            res.render("backlog", { tickets: backlogTickets, backlogID: req.params.backlog_id });
        }
    });

});

module.exports = router;