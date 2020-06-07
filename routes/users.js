const express = require('express')
const router = express.Router();
const models = require('../models');
const User = models.User;

// Logging the requests
router.use( (req, res, next) => {
    console.log("A request on users was initiated...")
    next();
})

// Check usertype of current user
router.get("/users/usertype",  (req, res) => {
    const admin = User.isAdmin(req.user);
    if(admin){
        const resObject = {
            message: "User is admin",
            user: req.user
        }
        return res.send(resObject);
    }else{
        const resObject = {
            message: "User is not admin",
            user: req.user
        }
        return res.send(resObject);
    }
});

// Show all users
router.get("/users", function(req, res) {
    User.find({})
     .then(function(users){
        if( User.isAdmin(req.user) ){
            res.json(users);
            console.log("Read all users request was successful...");
        }else{
            res.status(401);
            console.log("Invalid authorization to execute delete command.")
            res.json({ message: "You don't have proper authorization to execute the command." });
        }
     })
    .catch(function(err){
        res.status(500)
        res.json({ success: false, error: err });
    })
});

// Show one user
router.get("/users/:id", function(req, res) {
    User.findOne({_id: req.params.id },{name: 1, posts: 1})
    .then(function(user){
        if(user){
            res.json(user)
            console.log("Read one user request was successful...");
        }else{
            res.status(404)
            res.json({ error: "User does not exist."})
        }
    })
    .catch(function(err) {
            console.log(err)
            res.status(500)
            res.json({message: "Error", error: err })
    })
});

// Update user for admin
router.patch("/users/:id", async (req, res) => {
    if( User.isAdmin(req.user)){
        try{
            const user = await User.findOne({_id: req.params.id});
            user.name = req.body.name;
            user.email =  req.body.email;
            user.password = req.body.password;
            user.user_type = req.body.user_type;
            //const user = await User.findOne({_id: req.params.id});
            user.save((err) => {
                if (err) {
                    console.log(err)
                    res.status(400)
                    return res.json({success: false, message: "An error happened."})
                }
                res.json({
                    success: true,
                    message: "User succesfully saved!",
                    user: user
                })
            })         
            //res.json(updatedUser);
            console.log("User patch request authorized");
        }
        catch(error){
            res.status(500)
            res.json({ message: error });
        } 
    } else{
        res.status(403);
        console.log("Invalid authorization to execute edit user command.")
        res.json({ message: "You don't have proper authorization to edit user." });
    }
});

// Update user for user
router.patch("/users/edit", async (req, res) => {
    console.log("A user's request to edit account was initiated...")
    try{
        const user = await User.findOne({_id: req.user.id});
        if(user.password===req.body.old_password){
            user.name = req.body.name;
            user.email =  req.body.email;
            user.password = req.body.new_password;
            user.save((err) => {
                if (err) {
                    console.log(err)
                    res.status(400)
                    return res.json({success: false, message: "Update account failure."})
                }
                res.json({
                    success: true,
                    message: "User account changes succesfully saved!",
                    user: user
                })
            })         
            console.log("A user's request to edit account was authorized.");
        }
        else{
            console.log("A user's request to edit account was unauthorized")
            res.status(403)
            return res.json({success: false, message: "You don't have proper authorization to edit this user."})
        }
    }
    catch(error){
        res.status(500)
        res.json({ message: error });
    }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
    if( User.isAdmin(req.user)){
        try{
            const removedUser = await User.remove({ _id: req.params.id });
            res.json(removedUser);
            console.log("User delete request was successful...");
        }
        catch(error){
            res.status(500)
            res.json({ message: error });
        } 
    } else{
        res.status(403);
        console.log("Invalid authorization to execute delete user command.")
        res.json({ message: "You don't have proper authorization to execute delete user command." });
    }
});
module.exports = router;