// Express variables
const express = require('express')
const bodyParser = require('body-parser')
// const commentsRoute = require('./routes/comments')
const passport =require('passport')
const routes = require('./routes')
const mongoose = require("mongoose")

require('./config/passport')(passport)

// Connect to DB
mongoose.connect("mongodb://mongo:27017/test", {useNewUrlParser: true, useUnifiedTopology: true  })
        .then( () => {
            const app = express()
            app.use(bodyParser.urlencoded({extended: true}))
            app.use(bodyParser.json())
            app.use('/api/auth', routes.auth)
            app.use('/api', passport.authenticate('jwt', { session: false }), routes.comments); // Routes import

            app.listen("3000", (req, res) => {
                console.log("Now listening to port 3000...");
            })
        })
        .catch(err => {
            console.error("Mongo Connection Error", err);
            process.exit();
        })


// mongoose.connection
// .once("open",() => console.log("Connected"))
// .on("error", error => {
//   console.log(error)
// });
//27017

