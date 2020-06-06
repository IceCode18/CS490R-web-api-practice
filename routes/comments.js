const express = require('express')
const router = express.Router();
const models = require('../models');
const Comment = models.Comment;
const User = models.User;

// Logging the requests
router.use( (req, res, next) => {
    console.log("A request was initiated...")
    next();
})

// Test to see if API is working
router.get("/testAPI",  (req, res) => {
    const resObject = {
        message: "Test API is working",
        user: req.user
    }
    return res.send(resObject);
});

// Read all
router.get("/comments", function(req, res) {
    Comment.find({})
     .then(function(comments){
        res.json(comments);
        console.log("Read all comments request was successful...");
     })
    .catch(function(err){
        res.status(500)
        res.json({ success: false, error: err });
    })
});

// Read one
router.get("/comments/:id", function(req, res) {
   Comment.findOne({_id: req.params.id })
   .populate('user_id','email')
   .then(function(comment){
       if(comment){
           res.json(comment)
           console.log("Read one comment request was successful...");
       }else{
           res.status(404)
           res.json({ error: "Comment does not exist."})
       }
   })
   .catch(function(err) {
        console.log(err)
        res.status(500)
        res.json({message: "Error", error: err })
   })
})

// Create
router.post("/comments", async (req, res) => {
    if(!req.user._id || !req.body.post_id || !req.body.body){
        res.status(400)
        res.json({success: false, error: "Missing post_id, user_id, or body."})
    }
   const comment = new Comment({
       user_id: req.user._id,
       post_id: req.body.post_id,
       body: req.body.body
   });
   try{
       const savedComment = await comment.save();
       res.json(savedComment);
       console.log("Comment post request was successful...");
   }catch(err){
       res.status(500)
       res.json({ sucess: false, error: err });
   }
});

// Update
router.patch("/comments/:id", async (req, res) => {
    if(await User.isCommentOwner(req.params.id, req.user)){
        try{
            const updatedComment =  await Comment.updateOne(
                    { _id: req.params.id },
                    { $set: { body: req.body.body, } } 
                    );
            res.json(updatedComment);
            console.log("Comment patch request authorized");
        }
        catch(error){
            res.status(500)
            res.json({ message: error });
        } 
    } else{
        res.status(401);
        console.log("Invalid authorization to execute edit comment command.")
        res.json({ message: "You don't have proper authorization to execute edit comment command." });
    }
});

// Delete
router.delete("/comments/:id", async (req, res) => {
    if(await User.isCommentOwner(req.params.id, req.user)){
        try{
            const removedComment = await Comment.remove({ _id: req.params.id });
            res.json(removedComment);
            console.log("Comment delete request was successful...");
        }catch(error){
            res.status(500)
            res.json({ message: error });
        }
    } else{
        res.status(401);
        console.log("Invalid authorization to execute delete comment command.")
        res.json({ message: "You don't have proper authorization to execute delete comment command." });
    }
});

module.exports = router;