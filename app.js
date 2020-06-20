// Express variables
const express = require('express');
const bodyParser = require('body-parser');
const passport =require('passport');
const routes = require('./routes');
const mongoose = require("mongoose");
const cors = require("cors");

require('./config/passport')(passport);

// Connect to DB
mongoose.connect("mongodb://mongo:27017/test", {useNewUrlParser: true, useUnifiedTopology: true  })
        .then( () => {
            const app = express();
            app.use(bodyParser.urlencoded({extended: true}));
            app.use(bodyParser.json());
            app.use(cors());
            app.use('/api/auth', routes.auth);
            app.use('/api', passport.authenticate('jwt', { session: false }), routes.comments); // Routes import
            app.use('/api', passport.authenticate('jwt', { session: false }), routes.users);
            
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

