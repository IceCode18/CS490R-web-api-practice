const express = require('express')
const router = express.Router();
const Comment = require('../models/comment');

router.get("/testAPI",  (req, res) => {
    const resObject = {
        message: "Test API is working"
    }
    res.send(resObject);
});

// Read all
router.get("/", async (req, res) => {
    try{
        const comments = await Comment.find();
        res.json(comments);
    }catch(error){
        res.json({ message: error });
    }
});

// Read one
router.get("/:commentId", async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    }catch(error){
        res.json({ message: error });
    }
});

// Create
router.post("/", async (req, res) => {
   const comment = new Comment({
       user_id: req.body.user_id,
       post_id: req.body.post_id,
       body: req.body.body
   });
   try{
       const savedComment = await comment.save();
       res.json(savedComment);
   }catch(error){
       res.json({ message: error });
   }
});

// Update
router.patch("/:commentId", async (req, res) => {
    try{
        const updatedComment = await Comment.updateOne(
            { _id: req.params.commentId },
            { $set: { body: req.body.body, } } 
            );
        res.json(updatedComment);
    }catch(error){
        res.json({ message: error });
    }
});

// Delete
router.delete("/:commentId", async (req, res) => {
    try{
        const removedComment = await Comment.remove({ _id: req.params.commentId });
        res.json(removedComment);
    }catch(error){
        res.json({ message: error });
    }
});

module.exports = router;