const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const utils = requiere('../config/token')
const User = require('../model/user');

// // Register router.post('/sign_up', (req, res, next) => {     let newUser =
// new User({         name: req.body.name,         email: req.body.email,
// username: req.body.username,         password: req.body.password     });
// User.addUser(newUser, (err, user) => {         if (err) { res.json({ success:
// false, msg: 'Failed to register user' });         } else {
// res.json({ success: true, msg: 'User registered' });         }    }); });

router.get('/users/?', function(req, res) {

    if (!req.user || !req.user.admin)
      return res.status(401).json({
        error: 'You must be admin to access this route.'
      });
  
    User
      .find({})
      .select({
        password: 0,
        __v: 0,
        updatedAt: 0,
        createdAt: 0
      }) //make sure to not return password (although it is hashed using bcrypt)
      .limit(100)
      .sort({
        createdAt: -1
      })
      .exec(function(err, users) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: 'Could not retrieve users'
          });
        }
        res.json(users);
      });
  });
  
  router.post('/users/signin', function(req, res) {
    User
      .findOne({
        username: req.body.username
      })
      .select({
        __v: 0,
        updatedAt: 0,
        createdAt: 0
      }) //make sure to not return password (although it is hashed using bcrypt)
      .exec(function(err, user) {
        if (err)
          throw err;
  
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong'
          });
        }
  
        bcrypt.compare(req.body.password, user.password, function(err, valid) {
          if (!valid) {
            return res.status(404).json({
              error: true,
              message: 'Username or Password is Wrong'
            });
          }
          //make sure to NOT pass password and anything sensitive inside token
          //Pass anything tht might be used in other parts of the app
          var token = utils.generateToken(user);
  
          user = utils.getCleanUser(user);
  
          res.json({
            user: user,
            token: token
          });
        });
      });
  });

router.post('/users/signup', function (req, res, next) {
    var body = req.body;
    var hash = bcrypt.hashSync(body.password.trim(), 10);
    var user = new User({
        name: body
            .name
            .trim(),
        username: body
            .username
            .trim(),
        email: body
            .email
            .trim(),
        password: hash,
        admin: false,
        isEmailVerified: false
    });

    user.save(function (err, user) {
        if (err) 
            throw err;
        
        var token = utils.generateToken(user);
        res.json({user: user, token: token});
    });

});
router.post('/users/signin', function (req, res) {
    User
        .findOne({username: req.body.username})
        .exec(function (err, user) {
            if (err) 
                throw err;
            
            if (!user) {
                return res
                    .status(404)
                    .json({error: true, message: 'Username or Password is Wrong'});
            }

            bcrypt
                .compare(req.body.password, user.password, function (err, valid) {
                    if (!valid) {
                        return res
                            .status(404)
                            .json({error: true, message: 'Username or Password is Wrong'});
                    }

                    var token = utils.generateToken(user);

                    user = utils.getCleanUser(user);

                    res.json({user: user, token: token});
                });
        });
});

//get current user from token
router.get('/me/from/token', function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token;
    if (!token) {
     return res.status(401).json({message: 'Must pass token'});
    }
  
  // Check token that was passed by decoding token using secret
   jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
      if (err) throw err;
  
     //return user using the id from w/in JWTToken
      User.findById({
    '_id': user._id
      }, function(err, user) {
         if (err) throw err;
  
            user = utils.getCleanUser(user); 
  
           //Note: you can renew token by creating new token(i.e.    
           //refresh it)w/ new expiration time at this point, but I’m 
           //passing the old token back.
           // var token = utils.generateToken(user);
  
          res.json({
              user: user, 
              token: token
          });
  
       });
    });
  });

// // Profile router.get('/profile', passport.authenticate('jwt', { session:
// false }), (req, res, next) => {     res.json({ user: req.user }); });

module.exports = router;