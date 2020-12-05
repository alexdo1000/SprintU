var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var middleware = require("../middleware"); //this automatically gets index.js from the middleware folder

// INDEX - SHOW ALL PROJECT
router.get("/", (req, res) => {

    // Get all projects from DB
    Project.find({}, function(err, allProjects){
        if(err){
            console.log(err);
        } else {
            res.render("project/index", {projects: allProjects});
        }
    });

});

// CREATE - ADD NEW PROJECT TO DB
router.post("/", (req, res) => {
    // get data from form and add to project array
    var title = req.body.title;
    var description = req.body.description;
    var owner = {
        id: req.user._id,
    };
    var members = []

    var newProject = {
        title: title, 
        description: description,
        owner: owner,
        members: members
    };
    
    // Create a new project and save to database
    Project.create(newProject, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to project page
            res.redirect("/project")
        }
    });


});

// NEW - SHOW FORM TO CREATE PROJECT
router.get("/newProject", (req , res) => {
    res.render("project/newProject");
});

// SHOW - SHOWS INFO ABOUT SPECIFIC PROJECT
router.get("/:id", async(req, res) => {
    const project = await Project.findById(req.params.id);
    res.render("project/viewProject",{project});

});

// EDIT PROJECT ROUTE
router.get("/:id/editProject", (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        res.render("project/editProject", {project: foundProject});
    });
});

// UPDATE PROJECT ROUTE
router.put("/:id",  (req, res) => {
    // find and update correct project
    Project.findByIdAndUpdate(req.params.id, req.body.project, (err, updatedProject) => {
        if(err){
            res.redirect("/:id");
        } else {
            // redirect somewhere (show page)
            res.redirect("/project");
        }
    });

});

// delete project
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    await Project.findByIdAndRemove(id);
    res.redirect('/backlog');
});

module.exports = router;