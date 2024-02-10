const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

mongoose
   .connect(
      `mongodb+srv://rrahul1:${process.env.MONGO_PASSWORD}@cluster0.nijccyw.mongodb.net/?retryWrites=true&w=majority`
   )
   .then((x) => console.log("Connection Sucessful"))
   .catch((err) => console.log("Error while connecting to mongo"));

app.get("/", (req, res) => {
   res.send("root working");
});

app.listen(5000, () => {
   console.log("app listening on port 5000");
});
