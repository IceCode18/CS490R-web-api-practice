const express = require('express')
const app = express();

app.get("/", (req, res) => {
    res.send("You are on home directory."); 
});

app.listen("3000", (req, res) => {
    console.log("Now listening to port 3000");
});