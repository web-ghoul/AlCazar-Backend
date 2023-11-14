const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer");

const { getProfile, deleteAddress, editAddress, deleteAccount, editAccount, addNewAddress, confirmOrder, subscriptedEmail } = require("../controllers/user")
const { authorization } = require("../middleware/authorized")
const { userValidate } = require("../middleware/userValidate");
const { addressValidate } = require("../middleware/addressValidate");
const { orderValidate } = require("../middleware/orderValidate");
const { subscriptionValidate } = require("../middleware/subscriptionValidate");

router.route("/").get(authorization, getProfile)

router.route("/editAccount").patch(authorization, upload.array("image"), userValidate, editAccount)

router.route("/deleteAccount").delete(authorization, deleteAccount)

router.route("/addNewAddress").post(authorization, addressValidate, addNewAddress)

router.route("/deleteAddress/:id").delete(authorization, deleteAddress)

router.route("/editAddress/:id").patch(authorization, addressValidate, editAddress)

router.route("/confirmOrder").post(authorization, orderValidate, confirmOrder)

router.route("/subscriptedEmail").post(authorization, subscriptionValidate, subscriptedEmail)

module.exports = router