const express = require('express')
const app = express();

// DB connection variables
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://projectTester:projecttestersupersecret@projecttest-pgisb.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
    res.send("You are on home directory."); 
});

app.listen("3000", (req, res) => {
    console.log("Now listening to port 3000");
});



client.connect(err => {
  //const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("Connected")
  client.close();
});
