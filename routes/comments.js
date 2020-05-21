const express = require('express')
const router = express.Router();
const Comment = require('../models/comment');

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

// Delete

module.exports = router;