//facebook.routes.js


const express = require('express');
const router = express.Router();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user.model');
const config = require('../config/config');

// Facebook login
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model');
const config = require('../config/config');


// Facebook login


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
}
);

// Facebook login strategy

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    (accessToken, refreshToken, profile, done) => {
        // Check if user already exists in database
        User.findOne({ 'facebook.id': profile.id }, (err, user) => {
            if (err) return done(err);
            if (user) {
                return done(null, user);
            } else {
                // If user doesn't exist, create new user with Facebook profile information
                let newUser = new User();
                newUser.facebook.id = profile.id;
                newUser.facebook.token = accessToken;
                newUser.name = profile.displayName;
                newUser.email = profile.emails[0].value;
                newUser.photo = profile.photos[0].value;

                newUser.save((err) => {
                    if (err) return done(err);
                    return done(null, newUser);
                });
            }
        });

    }
));

module.exports = router;
