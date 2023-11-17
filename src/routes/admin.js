const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  itemValidate,
  categoryValidate,
} = require("../middleware/shopValidate");
const {
  addNewItem,
  addNewCategory,
  deleteItem,
  editItem,
  deleteCategory,
  getUser,
  getUsers,
  deleteUser,
  editCategory,
  editUser,
  makeUserAdmin,
  addNewAddress,
  deleteAddress,
  editAddress,
  deleteSubscriptedEmail,
  changeAvatar
} = require("../controllers/dashboard");
const { authorization, isAdmin } = require("../middleware/authorized");
const { userValidate } = require("../middleware/userValidate");
const { addressValidate } = require("../middleware/addressValidate");


//Items
router
  .route("/addNewItem")
  .post(authorization, isAdmin, upload.array("images"), itemValidate, addNewItem);

router.route("/deleteItem/:itemId").delete(authorization, isAdmin, deleteItem);

router.route("/editItem/:itemId").patch(authorization, isAdmin, upload.array("images"), itemValidate, editItem);


//Categories
router
  .route("/addNewCategory")
  .post(authorization, isAdmin, upload.array("image"), categoryValidate, addNewCategory);

router.route("/deleteCategory/:categoryId").delete(authorization, isAdmin, deleteCategory);

router.route("/editCategory/:categoryId").patch(authorization, isAdmin, upload.array("image"), categoryValidate, editCategory);

//Users
router.route("/user/:id").get(authorization, isAdmin, getUser)

router.route("/users").get(authorization, isAdmin, getUsers)

router.route("/deleteUser/:userId").delete(authorization, isAdmin, deleteUser)

router.route("/editUser/:userId").patch(authorization, isAdmin, upload.array("image"), userValidate, editUser)

router.route("/addNewAddress/:userId").post(authorization, isAdmin, addressValidate, addNewAddress)

router.route("/deleteAddress/:userId/:addressId").delete(authorization, isAdmin, deleteAddress)

router.route("/editAddress/:userId/:addressId").patch(authorization, isAdmin, addressValidate, editAddress)

router.route("/deleteSubscriptedEmail/:userId/:subscriptedEmailId").patch(authorization, isAdmin, deleteSubscriptedEmail)

router.route("/changeAvatar/:userId").patch(authorization, isAdmin, upload.array("image"), changeAvatar)


//Admins
router.route("/addNewAdmin").patch(authorization, isAdmin, makeUserAdmin)

module.exports = router;
