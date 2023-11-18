const express = require("express");
const router = express.Router();

const {
    webHook,
    messagingWebHook,
} = require("../controllers/facebookMessengerBot");

const { isEmailValidAndNotFake } = require("../middleware/isEmailValidAndNotFake");

const {
    emailValidate,
    registerValidate,
    loginValidate,
} = require("../middleware/authValidate");

const { login, register, forgotPassword, resetPassword } = require("../controllers/authentication");

router.route("/login").post(loginValidate, emailValidate, login);

router.route("/register").post(registerValidate, isEmailValidAndNotFake, emailValidate, register);

router.route("/forgotPassword").post(isEmailValidAndNotFake, emailValidate, forgotPassword);

router.route("/resetPassword/:userId").patch(resetPassword);

router.route("/webhook").post(webHook);

router.route("/webhook").get(messagingWebHook);

module.exports = router;
