const express = require("express");
const { login, register } = require("../controllers/authentication");
const router = express.Router();
const {
  emailValidate,
  registerValidate,
  loginValidate,
} = require("../middleware/authValidate");
const { getItems, getCategories, getItem, getCategoryItems } = require("../controllers/shop");

router.route("/").get((req, res) => {
  res.send("Hello Server");
});

router.route("/shop/items/:itemId").get(getItem)

router.route("/shop/items").get(getItems);

router.route("/shop/itemsOfCategory/:categoryId").get(getCategoryItems)

router.route("/shop/categories").get(getCategories);

router.route("/login").post(loginValidate, emailValidate, login);

router.route("/register").post(registerValidate, emailValidate, register);

module.exports = router;
