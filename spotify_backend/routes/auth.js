const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// registering new user

router.post("/register", async (req, res) => {
   const { email, password, firstname, lastname, username } = req.body;

   // Check if user exists
   const user = await User.findOne({ email: email });
   if (user) {
      return res
         .status(403)
         .json({ error: "A user with this email already exists" });
   }

   // Hash password
   const hashPassword = await bcrypt.hash(password, 10);

   // Create new user
   const newUserData = {
      email,
      password: hashPassword,
      firstname,
      lastname,
      username,
   };
   const newUser = await User.create(newUserData);

   // Generate token
   const token = await getToken(email, newUser);

   // Return user data without password
   const userReturn = { ...newUser.toJSON(), token };
   delete userReturn.password;
   return res.status(200).json(userReturn);
});

// login a existing user
router.post("/login", async (req, res) => {
   const { email, password } = req.body;

   //    checking if the email exist
   const user = await User.findOne({ email: email });

   //    if email doesn't exist
   if (!user) {
      return res
         .status(403)
         .json({ error: "Invalid Credentials, Please Sign up to login" });
   }

   //    checking if the entered password is wrong
   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
      return res.status(403).json({ error: "Invalid Credentials" });
   }

   //    if the credentials are correct
   const token = await getToken(user.email, user);
   const userReturn = { ...user.toJSON(), token };
   delete userReturn.password;
   return res.status(200).json(userReturn);
});

// get user details

router.get("/userdetail/:token", async (req, res) => {
   let token = req.params.token;
   const id = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
         console.error("Error decoding token:", err.message);
         return;
      }

      return decoded.identifier;
   });

   const user = await User.findOne({ _id: id });
   if (!user) {
      return res.status(403).json({ error: "User doesn't exist" });
   }
   return res.status(200).json(user);
});

module.exports = router;
