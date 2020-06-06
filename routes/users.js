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
            const updatedUser =  await User.updateOne(
                    { _id: req.params.id },
                    { $set: 
                        {   name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            user_type: req.body.user_type } 
                        } 
                    );
            res.json(updatedUser);
            console.log("User patch request authorized");
        }
        catch(error){
            res.status(500)
            res.json({ message: error });
        } 
    } else{
        res.status(401);
        console.log("Invalid authorization to execute edit user command.")
        res.json({ message: "You don't have proper authorization to edit user." });
    }
});

// Update user for admin
router.patch("/users/edit", async (req, res) => {
    try{
        const updatedUser =  await User.updateOne(
                { _id: req.user.id },
                { $set: 
                    {   name: req.body.name,
                        email: req.body.email,
                        password: req.body.password} 
                    } 
                );
        res.json(updatedUser);
        console.log("User patch request authorized");
    }
    catch(error){
        res.status(500)
        res.json({ message: error });
    } 
});

module.exports = router;