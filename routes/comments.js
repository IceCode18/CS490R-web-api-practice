const express = require('express')
const router = express.Router();
const Comment = require('../models/comment');

router.get("/", (req, res) => {
    res.send("You are on home directory."); 
});



module.exports = router;