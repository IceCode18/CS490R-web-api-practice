const express = require('express')
const router = express.Router();
const models = require('../models');
const User = models.User;

// Logging the requests
router.use( (req, res, next) => {
    console.log("A request on users was initiated...")
    next();
})

router.get("/users/testAPI",  (req, res) => {
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

module.exports = router;