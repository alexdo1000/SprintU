var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var middleware = require("../middleware"); //this automatically gets index.js from the middleware folder
var User = require("../models/user");
var Board = require("../models/board");

// INDEX - SHOW ALL PROJECT
router.get("/", middleware.isLoggedIn, (req, res) => {

    // Get the users projects and only show those projects they're part of
    const userProjects = req.user.projects

    // Get the user's projects from the db
    projectArr = Project.find({
        _id: {
            $in: userProjects
        }
    }, (err, allProjects) => {
        if(err){
            console.log(err);
        } else {
            res.render("project/index", {projects: allProjects});
        }
    });

});

// CREATE - ADD NEW PROJECT TO DB
router.post("/", middleware.isLoggedIn, async (req, res) => {
	// get data from form and add to project array
	// also need to create the board object for the project
	var title = req.body.title;
	var description = req.body.description;
	var owner = {
		id: req.user._id,
	};
	var members = [];
	var newBoard = {
		lane1: [],
		lane2: [],
		lane3: [],
		lane4: [],
		lane5: [],
		backlog: [],
	};
	var newProject = {
		title: title,
		description: description,
		owner: owner,
		board: {}, // Need to create the board in the db, then set its ID
		members: members,
	};

	// Create the board, then in the callback, create the project including the new board
	var createdBoard = Board.create(newBoard, (err, createdBoard) => {
		if (err) {
			req.flash("error", "Something went wrong");
			console.log(err);
		} else {
            newProject.board.id = createdBoard._id;

			// Create a new project and save to database
			Project.create(newProject, function (err, newlyCreated) {
				if (err) {
					console.log(err);
				} else {
					// Add the current project to user's project array
					req.user.projects.push(newlyCreated);
					req.user.save();
					req.flash("success", "Successfully created new project");

					// redirect back to project page
					res.redirect("/projects");
				}
			});
		}
	});
});

// NEW - SHOW FORM TO CREATE PROJECT
router.get("/newProject", middleware.isLoggedIn, (req , res) => {
    res.render("project/newProject");
});

// SHOW - SHOWS INFO ABOUT SPECIFIC PROJECT
router.get("/:id", middleware.checkProjectMembership, async(req, res) => {
    const project = await Project.findById(req.params.id);
    const owner = await User.findById(project.owner.id)
    res.render("project/viewProject",{project, owner});

});

// EDIT PROJECT ROUTE
router.get("/:id/editProject", middleware.checkProjectMembership, (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        res.render("project/editProject", {project: foundProject});
    });
});

// UPDATE PROJECT ROUTE
router.put("/:id", middleware.checkProjectMembership, (req, res) => {
    // find and update correct project
    Project.findByIdAndUpdate(req.params.id, req.body.project, (err, updatedProject) => {
        if(err){
            res.redirect("/:id");
        } else {
            // redirect somewhere (show page)
            res.redirect("/projects");
        }
    });

});

// EDIT MEMBER ROUTE
router.get("/:id/shareProject", (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        res.render("project/shareProject", {project: foundProject});
    });
});

//UPDATE MEMBER ROUTE
router.put("/:id",  (req, res) => {
    
    Project.findByIdAndUpdate(req.params.id, req.body.project, (err, updatedProject) => {
        if(err){
            res.redirect("/:id");
        } else {

            var userName={};

            if (req.body.addUser.userName) {
                userName = User.findOne({
                    username: {
                        $eq: req.body.addUser.userName
                    }
                   
                }, function (err, docs) {
                    console.log(docs)
                    console.log(typeof (docs))
                });
                console.log("hello");
                updatedProject.members.push(userName);
                req.body.addUser.save();               
            }

            res.redirect("/projects");
        }
    });

});

// delete project
router.delete("/:id", middleware.checkProjectMembership, async (req, res) => {
    const {id} = req.params;
    await Project.findByIdAndRemove(id);
    res.redirect('/projects');
});

module.exports = router;

