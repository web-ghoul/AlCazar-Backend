const express = require("express");
const { login, register } = require("../controllers/authentication");
const router = express.Router();
const {
  emailValidate,
  registerValidate,
  loginValidate,
} = require("../middleware/authValidate");
const {
  getItems,
  getCategories,
  getItem,
  getDimensions,
  contactWithMe,
  confirmSubscriptedEmail
} = require("../controllers/public");
const {
  webHook,
  messagingWebHook,
} = require("../controllers/facebookMessengerBot");
const { isEmailValidAndNotFake } = require("../middleware/isEmailValidAndNotFake");

//Authentication
router.route("/login").post(loginValidate, emailValidate, login);

router.route("/register").post(registerValidate, emailValidate, register);

router.route("/webhook").post(webHook);

router.route("/webhook").get(messagingWebHook);

//Shop Data
router.route("/shop/items/:itemId").get(getItem);

router.route("/shop/items").get(getItems);

router.route("/shop/categories").get(getCategories);

router.route("/shop/dimensions").get(getDimensions);

//User Actions
router.route("/contactWithMe").post(isEmailValidAndNotFake, contactWithMe)

router.route("/confirmSubscriptedEmail/:subscriptedEmailId").patch(confirmSubscriptedEmail)

module.exports = router;
