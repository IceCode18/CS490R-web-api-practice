// Express variables
const express = require('express')
const bodyParser = require('body-parser')
const commentsRoute = require('./routes/comments');
const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/comments', commentsRoute); // Routes import

// DB connection variables
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/test", {useNewUrlParser: true, useUnifiedTopology: true  });

// Connect to DB
// mongoose.connection
// .once("open",() => console.log("Connected"))
// .on("error", error => {
//   console.log(error)
// });
//27017
app.listen("3000", (req, res) => {
    console.log("Now listening to port 3000");
});
