const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
   ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");

// converting req-body to json
app.use(express.json());

//    Mongoose connection setup
mongoose
   .connect(
      `mongodb+srv://rrahul1:${process.env.MONGO_PASSWORD}@cluster0.nijccyw.mongodb.net/?retryWrites=true&w=majority`
   )
   .then((x) => console.log("Connection Sucessful"))
   .catch((err) => console.log("Error while connecting to mongo"));

// passport-jwt setup
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretKey";

passport.use(
   new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ id: jwt_payload.sub }, function (err, user) {
         if (err) {
            return done(err, false);
         }
         if (user) {
            return done(null, user);
         } else {
            return done(null, false);
            // or you could create a new account
         }
      });
   })
);

// Express
app.get("/", (req, res) => {
   res.send("root working");
});

app.use("/auth", authRoutes);

app.listen(5000, () => {
   console.log("app listening on port 5000");
});
