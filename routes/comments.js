const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
    res.send("You are on home directory."); 
});
router.get("/other", (req, res) => {
    res.send("You are on other."); 
});



module.exports = router;