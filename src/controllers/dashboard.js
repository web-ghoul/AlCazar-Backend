const uploadImage = require("../utils/uploadImage");
const Item = require("../models/item");
const Category = require("../models/category");
const User = require("../models/user");


//Categories

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
            await Category.create({ admin: req.userId, ...req.body });
            return res
                .status(200)
                .json({ message: "Category is Added Successfully!!" });
        }
    } catch (err) {
        res.status(405).json({ error: err.message });
    }
};


//Items

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
            await Item.create({ admin: req.userId, ...req.body });
            return res
                .status(200)
                .json({ message: "Item is Created Successfully!!" });
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

const editItem = async (req, res, next) => {
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


//Users

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.status(200).json({ users });
    } catch (error) {
        res.status(405).json({ error: err.message });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.findOne({ _id: userId })
        if (user) {
            await User.findOneAndDelete({ _id: userId })
            res.status(200).json({ message: "User is Deleted Successfully!!" })
        } else {
            res.status(404).json({ error: "User isn't Exist" })
        }
    } catch (error) {
        res.status(405).json({ error: err.message });
    }
}

module.exports = {
    deleteItem,
    addNewItem,
    editItem,
    deleteCategory,
    addNewCategory,
    deleteUser,
    getUsers
};
