const express = require('express')
const router = express.Router();
const Comment = require('../models/comment');

router.get("/", (req, res) => {
    res.send("You are on home directory."); 
});

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

module.exports = router;