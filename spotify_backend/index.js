const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
   ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");

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
   new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
         // Look up the user in the database based on the user ID from the JWT payload
         const user = await User.findOne({ id: jwt_payload.sub });

         // If user is found, return the user object
         if (user) {
            return done(null, user);
         } else {
            // If user is not found, return false
            return done(null, false);
            // Optionally, you could create a new account here
         }
      } catch (error) {
         // If an error occurs during the database query, pass the error to the done callback
         console.error("Error finding user:", error);
         return done(error, false);
      }
   })
);

// Express
app.get("/", (req, res) => {
   res.send("root working");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);

app.listen(5000, () => {
   console.log("app listening on port 5000");
});
