const express = require('express')
const router = express.Router();
const models = require('../models');
const Comment = models.Comment;

// Logging the requests
router.use( (req, res, next) => {
    console.log("A request was initiated...")
    next();
})

// Test to see if API is working
router.get("/testAPI",  (req, res) => {
    const resObject = {
        message: "Test API is working"
    }
    res.send(resObject);
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
router.get("/comments/:commentId", async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
        console.log("Read one comment request was successful...");
    }catch(error){
        res.status(500)
        res.json({ message: error });
    }
});

// Create
router.post("/comments", async (req, res) => {
    if(!req.body.user_id || !req.body.post_id || !req.body.body){
        res.status(400)
        res.json({success: false, error: "Missing post_id, user_id, or body."})
    }
   const comment = new Comment({
       user_id: req.body.user_id,
       post_id: req.body.post_id,
       body: req.body.body
   });
   try{
       const savedComment = await comment.save();
       res.json(savedComment);
       console.log("Post request was successful...");
   }catch(err){
       res.status(500)
       res.json({ sucess: false, error: err });
   }
});

// Update
router.patch("/comments/:commentId", async (req, res) => {
    try{
        const updatedComment = await Comment.updateOne(
            { _id: req.params.commentId },
            { $set: { body: req.body.body, } } 
            );
        res.json(updatedComment);
        console.log("Patch request was successful...");
    }catch(error){
        res.status(500)
        res.json({ message: error });
    }
});

// Delete
router.delete("/comments/:commentId", async (req, res) => {
    try{
        const removedComment = await Comment.remove({ _id: req.params.commentId });
        res.json(removedComment);
        console.log("Delete request was successful...");
    }catch(error){
        res.status(500)
        res.json({ message: error });
    }
});

module.exports = router;