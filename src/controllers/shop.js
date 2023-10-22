const Item = require("../models/item");
const Category = require("../models/category");

const getItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({ _id: itemId }).populate("admin");
    if (item) {
      res.status(200).json({ item });
    } else {
      res.status(404).json({ error: "Item isn't Found" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({}).populate("admin")
    res.status(200).json({ items });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getCategoryItems = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (category) {
      const Items = await Item.find({ category: category.title }).populate("admin");
      res.status(200).json({ Items });
    } else {
      res.status(404).json({ error: "Category isn't Found" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).populate("admin");
    res.status(200).json({ categories });
  } catch (err) {
    console.log(err.message)
    res.status(405).json({ error: err.message });
  }
};


module.exports = {
  getItems,
  getItem,
  getCategories,
  getCategoryItems,
};
