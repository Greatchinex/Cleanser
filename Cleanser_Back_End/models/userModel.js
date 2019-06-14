const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require("../config/database");

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        minlength: 8
    }
})


const User =  module.exports = mongoose.model('User', UserSchema);


// User Functions

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username,callback) =>{
    const query = {username:username}
    User.findOne(query,callback)
}

module.exports.getUserByPhone = (phone,callback) =>{
    const query = {phone:phone}
    User.findOne(query,callback)
}

module.exports.getUserByEmail = (email, callback) => {
    const query = {email:email}
    User.findOne(query, callback)
}

// add User and Hash Password
module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            // Check For Error
            if(err) throw err;
            // Set Password to the hashed Value 
            newUser.password = hash;
            // Add User
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        // Check For Error
        if(err) throw err;
        
        callback(null, isMatch);
    })
}