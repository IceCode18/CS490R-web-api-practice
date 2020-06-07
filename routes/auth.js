const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const config = require("../config/config")

const router = express.Router();

router.post('/signup', (req, res) => {
    if(! req.body.name || ! req.body.email || ! req.body.password) {
        res.status(400)
        res.json({success: false, message: "Full name, email, and password required."})
    }else{
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        newUser.save((err) => {
            if (err) {
                console.log(err)
                res.status(400)
                return res.json({success: false, message: "Email already exists in the database."})
            }
            res.json({
                success: true,
                message: "User succesfully created!",
                user: newUser
            })
        })
    }
})

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email}, function(err, user){
        if (err) throw err;
        if (!user) {
            res.status(401).send({success: false, message: "User not found"})
        } else{
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch){
                    const tokenObj = { _id: user.id, email: user.email}
                    const token = jwt.sign(tokenObj, config.secret)
                    res.send({success: true, token: 'JWT '+token})
                } else{
                    res.status(401).send({success: false, message: 'Wrong password'})
                }
            })
        }
    })
})

module.exports = router;