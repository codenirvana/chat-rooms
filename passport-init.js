var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('./models/users');


var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
}

var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        User.findOne({
                'username': username
            },
            function(err, user) {
                if (err)
                    return done(err);
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
                return done(null, user);
            }
        );
    }));

passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        findOrCreateUser = function() {
            User.findOne({
                'username': username
            }, function(err, user) {
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                if (user) {
                    console.log('User already exists');
                    return done(null, false,
                        req.flash('message', 'User Already Exists'));
                } else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param('email');

                    newUser.save(function(err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    }));
