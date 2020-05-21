// Express variables
const express = require('express')
const app = express();

// DB connection variables
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://projectTester:projecttestersupersecret@projecttest-pgisb.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes import
const commentsRoute = require('./routes/comments');
app.use('/comments', commentsRoute);


// Connect to DB
client.connect(err => {
  //const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("Connected")
  client.close();
});

app.listen("3000", (req, res) => {
    console.log("Now listening to port 3000");
});
