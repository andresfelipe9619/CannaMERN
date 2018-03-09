const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
const User = require('./model/user');

const PORT = 5000;
// Connect To Database
mongoose.connect(config.database);
var db = mongoose.connection;

// On Connection
db.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// db.once('open', function () {
//     let newUser = new User({name: "juli", email: "juli@gmail.com", username: "jula", password: "cris123"});
//     console.log('USER: =>', newUser);
//     // we're connected!
//     newUser.save(function (err, newUser) {
//         if (err) 
//             return console.error(err);
//         console.log("USER ADDED!!!!");
        
//     });
// });
// On Error
db.on('error', (err) => {
    console.log('Database error: ' + err);
});

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
  
    token = token.replace('Bearer ', '');
  
    jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Please register Log in using a valid email to submit posts'
        });
      } else {
        req.user = user; //set the user to req so other routes can use it
        next();
      }
    });
  });
  
app.use('/users', users);

app.get('auth/facebook', (req, res) => {});

app.get('auth/google', (req, res) => {});

app.get('/home', (req, res) => {

});

// // Passport Middleware app.use(passport.initialize());
// app.use(passport.session());

app.listen(PORT, () => {
    console.log('app started at PORT ', PORT);
});