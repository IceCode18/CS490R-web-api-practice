// Express variables
const express = require('express')
const app = express();
const bodyParser = require('body-parser')

// Use body-parser middleware
app.use(bodyParser.json())

// DB connection variables
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", {useNewUrlParser: true, useUnifiedTopology: true  });

// Routes import
const commentsRoute = require('./routes/comments');
app.use('/comments', commentsRoute);


// Connect to DB
mongoose.connection
.once("open",() => console.log("Connected"))
.on("error", error => {
  console.log(error)
});

app.listen("27017", (req, res) => {
    console.log("Now listening to port 3000");
});
