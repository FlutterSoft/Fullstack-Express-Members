// Import the model for User from models folder
const Member = require("../models/Member");

// Users Controller
module.exports = {
    // Gets a list of all users and renders views/users page passing in the list to the ejs
    getMembers: async (req, res) => {
        try{
            let members = await Member.find({ user: req.user.id })
            res.render("members", { members: members, user: req.user });
        }
        catch(err){
            console.log(err)
        }
    },
    // Adds a new user to the DB 
    addMember: async (req, res) => {
        try {
            // Only if both name and position filled
            if(req.body.name && req.body.position){
                // Mongoose creates a new user in DB
                await Member.create({
                    name: req.body.name,
                    position: req.body.position,
                    number: req.body.number,
                    membershipLevel: req.body.membershipLevel,
                    user: req.user.id,
                  });
                  console.log("Member has been added!");
            }
            else{
                console.log("Details missing.")
            }
            res.redirect("/members");
        } 
        catch(err) {
            console.log(err);
        }
    },
    // Delete a user from the DB
    deleteMember: async (req, res) => {
        try {
            let member = await Member.findById({ _id: req.params.id })
            await Member.deleteOne({ _id: req.params.id })
            console.log("Member has been deleted!");
            res.redirect("/members"); 
        } 
        catch(err) {
            console.log(err);
            res.redirect("/members")
        }
    }
  }
  

