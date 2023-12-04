const express = require("express");
const router = express.Router();

const {
  getItems,
  getCategories,
  getItem,
  getDimensions,
  contactWithMe,
  confirmSubscriptedEmail,
} = require("../controllers/public");

const { isEmailValidAndNotFake } = require("../middleware/isEmailValidAndNotFake");

//Shop Data
router.route("/shop/items/:itemId").get(getItem);

router.route("/shop/items").get(getItems);

router.route("/shop/categories").get(getCategories);

router.route("/shop/dimensions").get(getDimensions);

//User Actions
router.route("/contactWithMe").post(isEmailValidAndNotFake, contactWithMe)

router.route("/confirmSubscriptedEmail/:subscriptedEmailId").patch(confirmSubscriptedEmail)

module.exports = router;
