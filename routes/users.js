var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
const turl = require('turl');

router.get('/register', function(req, res){
    res.render('register');
});


router.get('/login', function(req, res){
    res.render('login');
});

router.post('/register', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var address = req.body.address;
    var mobile = req.body.mobile;

     {
        User.findOne({email:email, username:username}).then(function(currentUser){
            if(currentUser){
                console.log('user is already registered:',currentUser);
                res.redirect('/users/register')

            }
            else {
                var newUser = new User({
                    name: name,
                    email:email,
                    username: username,
                    password: password,
                    address: address,
                    mobile: mobile
                });

                newUser.save(function(err,user){
                    if(err) throw err;
                    console.log(user);
                })

                res.redirect('/users/login');
            }
        })

    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/users/login'}),
    function(req, res) {
        res.redirect('/dashboard');
    });

router.get('/logout', function(req, res){
    req.logout();

    res.redirect('/users/login');
});


/* GET All Users. */
router.get('/AllUsers', function(req, res, next) {
    User.find(function(err, user) {
      res.render('AllUsers', { title: 'Node Project', users: user });
  });
});


turl.shorten('http://localhost:8000/').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
turl.shorten('http://localhost:8000/users/login').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
turl.shorten('http://localhost:8000/users/register').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
turl.shorten('http://localhost:8000/users/AllUsers').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
turl.shorten('http://localhost:8000/dashboard').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

turl.shorten('https://docs.google.com/document/d/18d8dnPHv5DDsmzK5yMp7_z5bVjE5qlmJyB1Am0HBtVc/edit').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

module.exports = router;