const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

const { isEmailValidAndNotFake } = require("../middleware/isEmailValidAndNotFake");

const {
    emailValidate,
    registerValidate,
    loginValidate,
} = require("../middleware/authValidate");

const { login, register, forgotPassword, resetPassword, googleAuth } = require("../controllers/authentication");

router.route("/login").post(loginValidate, emailValidate, login);

router.route("/register").post(registerValidate, isEmailValidAndNotFake, emailValidate, register);

router.route("/forgotPassword").post(isEmailValidAndNotFake, emailValidate, forgotPassword);

router.route("/resetPassword/:userId").patch(resetPassword);


//Google Authentication
router.route("/google/callback").get(
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
    }),
    googleAuth,
);

router
    .route("/google")
    .get(passport.authenticate("google", ["profile", "email"]));

router.route("/login/failed").get((req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

router.route("/logout").get((req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});


module.exports = router;
