const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
const User = require("../models/userModel");
const config = require("../config/database");
const verify = require('../config/verify');


// Verify token
// function verifyToken() {
//     if(!req.headers.authorization) {
//         return res.status(401).send("UnAuthorized Request");
//     }
//     let token = req.headers.authorization.split(' ')[1];
//     if(token === null) {
//         return res.status(401).send("UnAuthorized Request");
//     } 
//     let payload = jwt.verify(token, config.secret);
//     if(!payload) {
//         return res.status(401).send("UnAuthorized Request");
//     }
//     req.userId = payload.subject;
//     next();
// }


// Register
router.post("/register", (req, res, next) => {
    // Create a New User
    let newUser = new User({
        // Get The user details that is submitted
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })

    // Add a user: The addUser Function that adds the user is in the userModel.js file inside the models folder
    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({
                success: false,
                message: "Failed To Register User"
            })
        } else {
            res.json({
                success: true,
                message: "User Registered Successfully"
            })
        }
    })
})

// Authenticate
router.post("/authenticate", (req, res, next) => {
    // Get the User Details(User will enter an email and password)
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        // Check For Error
        if(err) throw err;

        // If no error Then Check for the user details in the Db
        // If User is not found in the Db
        if(!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }

        // If user Is Found then Compare the password to check if it matches
        // Comapare password function is in the userModel.js file inside the models folder
        User.comparePassword(password, user.password, (err, isMatch) => {
            // Check For Error
            if(err) throw err;
            // Check If Passwords match
            if(isMatch) {
                // Create a token for user
                const token = jwt.sign({user:user}, config.secret, {
                    expiresIn: 604800 // The Token Expires After (604800 secs: 1week), so the user has to login again after 1week
                })

                // Response to the front end
                res.json({
                    success: true,
                    token: "JWT " + token,
                    // token: `Bearer ${token}`,
                    // I did not send the entire user object because i dont want to send the password back
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone
                    }
                })
            } else {
                return res.json({
                    success: false,
                    message: "Wrong Password"
                })
            }
        })
    })
})

// Profile
// passport.authenticate("jwt", {session:false}): is to protect the route
router.get("/profile", passport.authenticate("jwt", {session:false}), (req, res, next) => {
//    res.header('Access-Control-Allow-Origin', "*");
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.json({
       user: req.user
   })
    // res.send(req.user.profile);

})











module.exports = router;