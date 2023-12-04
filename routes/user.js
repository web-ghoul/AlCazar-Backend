const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer");

const { getProfile, deleteAddress, editAddress, deleteAccount, editAccount, addNewAddress, confirmOrder, subscriptedEmail, deleteSubscriptedEmail, confirmSubscriptedEmail, changeAvatar } = require("../controllers/user")
const { authorization } = require("../middleware/authorized")
const { userValidate } = require("../middleware/userValidate");
const { addressValidate } = require("../middleware/addressValidate");
const { orderValidate } = require("../middleware/orderValidate");
const { subscriptionValidate } = require("../middleware/subscriptionValidate");
const { isUserExist } = require("../middleware/isUserExist");

router.route("/").get(authorization, isUserExist, getProfile)

router.route("/editAccount").patch(authorization, isUserExist, upload.array("image"), userValidate, editAccount)

router.route("/deleteAccount").delete(authorization, isUserExist, deleteAccount)

router.route("/addNewAddress").post(authorization, isUserExist, addressValidate, addNewAddress)

router.route("/deleteAddress/:id").delete(authorization, isUserExist, deleteAddress)

router.route("/editAddress/:id").patch(authorization, isUserExist, addressValidate, editAddress)

router.route("/confirmOrder").post(authorization, isUserExist, orderValidate, confirmOrder)

router.route("/subscriptedEmail").post(authorization, isUserExist, subscriptionValidate, subscriptedEmail)

router.route("/deleteSubscriptedEmail/:subscriptedEmailId").delete(authorization, isUserExist, deleteSubscriptedEmail)

router.route("/changeAvatar").patch(authorization, upload.array("image"), changeAvatar)


module.exports = router