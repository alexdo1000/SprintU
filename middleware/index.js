var Project = require("../models/project");
// var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkProjectMembership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Project.findById(req.params.id, (err, foundProject) => {
            if (err) {
                req.flash("error", "Project not found");
                res.redirect("back");
            } else {
                // is the user a member of the project?
                if (foundProject.owner.id.equals(req.user._id) || foundProject.members.includes(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to do that");
        res.redirect("back");
    }

}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;