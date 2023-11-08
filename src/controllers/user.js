const User = require("../models/user");
const Item = require("../models/item");
const Order = require("../models/order");
const Address = require("../models/address");
const uploadImage = require("../utils/uploadImage");
require("dotenv").config();

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (user) {
      const addresses = await Address.find({ userId: req.userId })
      const orders = await Order.find({ userId: req.userId })
      res.status(200).json({ user, addresses, orders });
    } else {
      res.status(404).json({ error: "User is not Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const editAccount = async (req, res, next) => {
  try {
    req.body = req.body.data
    const userId = req.userId
    const { email } = req.body
    const isExist = await User.findOne({ _id: userId })
    if (isExist) {
      const user = await User.findOne({ email: email })
      if (user && user._id != userId) {
        res.status(401).json({ error: "Email is Already Exist" });
      } else {
        //Upload File
        if (req.files && req.files.length > 0) {
          if (req.files[0].size > 1024 * 10240) {
            res.status(402).json({ error: "Images Size is too large your limit for a image is 10MG" });
          }
          const avatar = await uploadImage(req.files[0]);
          req.body.avatar = avatar
        } else {
          req.body.avatar = req.body.avatar[0]
        }
        await User.findOneAndUpdate({ _id: userId }, req.body)
        res.status(200).json({ message: "Account is Edited Successfully!!" });
      }
    } else {
      res.status(404).json({ error: "Account isn't Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    if (user) {
      await User.findOneAndDelete({ _id: req.userId })
      res.status(200).json({ message: "Account is Deleted Successfully!!" });
    } else {
      res.status(404).json({ error: "User is not Exist" });
    }
  } catch (error) {
    res.status(405).json({ error: err.message });
  }
}

const addNewAddress = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    if (user) {
      const address = await Address.findOne({ userId: req.userId, address: req.body.address })
      if (address) {
        res.status(400).json({ error: "Address is already Exist" })
      } else {
        const newAddress = new Address({ userId: req.userId, ...req.body })
        await newAddress.save()
        res.status(200).json({ message: "Address is Added Successfully!!" });
      }
    } else {
      res.status(404).json({ error: "User is not Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const deleteAddress = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    if (user) {
      const { id } = req.params
      await Address.findByIdAndDelete(id)
      res.status(200).json({ message: "Address is Added Successfully!!" });
    } else {
      res.status(404).json({ error: "User is not Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const editAddress = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    if (user) {
      const { id } = req.params
      await Address.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: "Address is Updated Successfully!!" });
    } else {
      res.status(404).json({ error: "User is not Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const confirmOrder = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    if (user) {
      const newOrder = new Order({ userId: req.userId, ...req.body })
      await newOrder.save()
      res.status(200).json({ message: "Order is Confirmed Successfully!!" });
    } else {
      res.status(404).json({ error: "User is not Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}


module.exports = { getProfile, editAddress, deleteAccount, editAccount, addNewAddress, deleteAddress, confirmOrder };
