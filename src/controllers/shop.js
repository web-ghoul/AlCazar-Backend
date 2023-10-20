const Item = require("../models/item");
const Category = require("../models/category");
const uploadImage = require("../utils/uploadImage");

const getItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({ _id: itemId });
    if (item) {
      res.status(200).json({ item });
    } else {
      res.status(404).json({ error: "Item isn't Found" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({ _id: itemId });
    if (item) {
      await Item.findOneAndDelete({ _id: itemId });
      res.status(200).json({ message: "Item is Deleted Successfully!!" });
    } else {
      res.status(404).json({ error: "Item isn't Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({ _id: itemId });
    if (item) {
      await Item.findOneAndUpdate({ _id: itemId }, req.body);
      res.status(200).json({ message: "Item is Updated Successfully!!" });
    } else {
      res.status(404).json({ error: "Item isn't Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({});
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
      const Items = await Item.find({ category: category.title });
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
    const categories = await Category.find({});
    res.status(200).json({ categories });
  } catch (err) {
    console.log(err.message)
    res.status(405).json({ error: err.message });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (category) {
      await Category.findOneAndDelete({ _id: categoryId });
      res.status(200).json({ message: "Category is Deleted Successfully!!" });
    } else {
      res.status(404).json({ error: "Category isn't Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const addNewItem = async (req, res, next) => {
  try {
    req.body = req.body.data;
    const { title } = req.body;
    const item = await Item.findOne({ title });
    if (item) {
      res.status(401).json({
        error: "Title is already Exist , Please Choose Another Title",
      });
    } else {
      //Upload Images
      const images = [];
      for (let i = 0; i < req.files.length; i++) {
        const image = await uploadImage(req.files[i]);
        images.push(image);
      }
      req.body.images = images;
      await Item.create(req.body);
      return res
        .status(200)
        .json({ message: "Item is Created Successfully!!" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const addNewCategory = async (req, res, next) => {
  try {
    req.body = req.body.data;
    const { title } = req.body;
    const category = await Category.findOne({ title });
    if (category) {
      res.status(401).json({
        error: "Title is already Exist , Please Choose Another Title",
      });
    } else {
      //Upload Image
      const image = await uploadImage(req.file);
      req.body.image = image;
      await Category.create(req.body);
      return res
        .status(200)
        .json({ message: "Category is Added Successfully!!" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

module.exports = {
  getItems,
  getItem,
  getCategories,
  getCategoryItems,
  deleteItem,
  addNewItem,
  updateItem,
  deleteCategory,
  addNewCategory,
};
