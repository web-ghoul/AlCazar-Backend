const express = require("express")
const router = express.Router()
const passport = require("passport")
const PinterestStrategy = require("passport-pinterest").Strategy

passport.use(new PinterestStrategy({
    clientID: process.env.PINTEREST_CLIENT_ID,
    clientSecret: process.env.PINTEREST_CLIENT_SECRET,
    scope: ['read_public', 'read_relationships'],
    callbackURL: "https://localhost:3000/auth/pinterest/callback",
    state: true
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ pinterestId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

router.get('/auth/pinterest',
    passport.authenticate('pinterest')
);

router.get('/auth/pinterest/callback', 
    passport.authenticate('pinterest', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

module.exports = router