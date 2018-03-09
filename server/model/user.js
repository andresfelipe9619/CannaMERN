const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type:String
    },
    admin: {
        type: Boolean
    },
    isEmailVerified: {
        type:Boolean
    },
    verifyEmailToken: {
        type:String
    },
  verifyEmailTokenExpires: {
      type: Date
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

function isUserUnique(reqBody, cb) {
    var username = reqBody.username ? reqBody.username.trim() : '';
    var email = reqBody.email ? reqBody.email.trim() : '';
  
    User.findOne({
      $or: [{
        'username': new RegExp(["^", username, "$"].join(""), "i")
      }, {
        'email': new RegExp(["^", email, "$"].join(""), "i")
      }]
    }, function(err, user) {
      if (err)
        throw err;
  
      if (!user) {
        cb();
        return;
      }
  
      var err;
      if (user.username === username) {
        err = {};
        err.username = '"' + username + '" is not unique';
      }
      if (user.email === email) {
        err = err ? err : {};
        err.email = '"' + email + '" is not unique';
      }
  
      cb(err);
    });
  }

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};