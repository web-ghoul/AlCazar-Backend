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
  getUsers,
  deleteUser
} = require("../controllers/dashboard");
const { authorization, isAdmin } = require("../middleware/authorized");


//Items
router
  .route("/addNewItem")
  .post(authorization, isAdmin, upload.array("images"), itemValidate, addNewItem);

router.route("/deleteItem/:itemId").delete(authorization, isAdmin, deleteItem);

router.route("/editItem/:itemId").patch(authorization, isAdmin, editItem);


//Categories
router
  .route("/addNewCategory")
  .post(authorization, isAdmin, upload.single("image"), categoryValidate, addNewCategory);

router.route("/deleteCategory/:categoryId").delete(authorization, isAdmin, deleteCategory);


//Users
router.route("/users").get(authorization, isAdmin, getUsers)

router.route("/deleteUser/:userId").delete(authorization, isAdmin, deleteUser)


module.exports = router;
