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
  deleteCategory
} = require("../controllers/shop");

router
  .route("/addNewItem")
  .post(upload.array("images"), itemValidate, addNewItem);

router
  .route("/addNewCategory")
  .post(upload.single("image"), categoryValidate, addNewCategory);

router.route("/deleteItem/:itemId").delete(deleteItem);

router.route("/deleteCategory/:categoryId").delete(deleteCategory);

router.route("/updateItem/:itemId").patch(updateItem);

module.exports = router;
