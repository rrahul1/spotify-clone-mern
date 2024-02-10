const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

// registering new user

router.post("/register", async (req, res) => {
   const { email, password, firstname, lastname, username } = req.body;

   // Check if user exists
   const user = await User.findOne({ email: email });
   if (user) {
      console.log(user);
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

module.exports = router;
