var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Ticket = require("../models/ticket");
var Project = require("../models/project");
var Backlog = require("../models/board");
var middleware = require("../middleware");


router.get("/:backlog_id/", middleware.isLoggedIn, (req, res) => {
    foundBacklog = Backlog.findById(req.params.backlog_id, async (err, foundBacklog) => {
        if(err){
            console.log(err);
        }else{
            const backlogTickets =[];

            if (backlogTickets.backlog) {
                backlogTickets = await Ticket.find({
                    _id: {
                        $in: foundBacklog.backlog
                    }
                }).toArray();
            }

            res.render("backlog", { backlog: backlogTickets});
        }
    });

});

module.exports = router;