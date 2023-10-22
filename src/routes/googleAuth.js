const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { ObjectId } = require("bson");

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/auth/login/success",
    failureRedirect: "http://localhost:3000/auth/login/failed",
  })
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

router.route("/login/success").get(async (req, res) => {
  if (req.user) {
    try {
      const user = req.user;
      const isUserExist = await User.findOne({ email: user.emails[0].value });
      if (isUserExist) {
        res.status(200).json({
          message: "Logged in Successfully!!",
          userId: isUserExist._id,
        });
      } else {
        await User.create({
          firstName: user.name.givenName,
          lastName: user.name.familyName,
          email: user.emails[0].value,
          avatar: user.photos[0].value,
          phone: "020",
          password: `${user.id}google`,
        });
        res.status(200).json({
          message: "Logged in Successfully!!",
          userId: user.id,
        });
      }
    }catch(err){
        res.status(405).json({
            error:err.message
        })
    }
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
});

router.route("/logout").get((req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
