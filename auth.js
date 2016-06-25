var express = require('express');
var passport = require('passport');
var db = require('./db');
var mongoose = require('mongoose');
mongoose.connect(db.url);

var router = express.Router();
module.exports = router;

router.get('/login', function(req, res) {
    if (req.user) {
        res.redirect('/');
    } else {
        res.render('login', {
            title: "Login",
            message: req.flash('message')
        });
    }

});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/signup', function(req, res) {
    res.render('signup', {
        title: "Register",
        message: req.flash('message')
    });
});

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}));

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
})
