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
  updateItem,
  deleteCategory,
  getUsers
} = require("../controllers/dashboard");
const { authorization, isAdmin } = require("../middleware/authorized");

router.route("/users").get(authorization, isAdmin, getUsers)

router
  .route("/addNewItem")
  .post(authorization, isAdmin, upload.array("images"), itemValidate, addNewItem);

router
  .route("/addNewCategory")
  .post(authorization, isAdmin, upload.single("image"), categoryValidate, addNewCategory);

router.route("/deleteItem/:itemId").delete(authorization, isAdmin, deleteItem);

router.route("/deleteCategory/:categoryId").delete(authorization, isAdmin, deleteCategory);

router.route("/updateItem/:itemId").patch(authorization, isAdmin, updateItem);

module.exports = router;
