const User = require("../models/user");
const Order = require("../models/order");
const Address = require("../models/address");
const Subscription = require("../models/subscription");
const uploadImage = require("../utils/uploadImage");
const { sendMail } = require("../utils/sendMail");
const confirmSubscription = require("../mails/confirmSubscription");
require("dotenv").config();

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    const addresses = await Address.find({ userId: req.userId })
    const orders = await Order.find({ userId: req.userId })
    const subscriptions = await Subscription.find({ userId: req.userId, confirmed: true })
    res.status(200).json({ user, addresses, orders, subscriptions });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const editAccount = async (req, res, next) => {
  try {
    req.body = req.body.data
    const userId = req.userId
    const { email } = req.body
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
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const deleteAccount = async (req, res, next) => {
  try {
    await User.findOneAndDelete({ _id: req.userId })
    res.status(200).json({ message: "Account is Deleted Successfully!!" });
  } catch (error) {
    res.status(405).json({ error: err.message });
  }
}

const addNewAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ userId: req.userId, address: req.body.address })
    if (address) {
      res.status(400).json({ error: "Address is already Exist" })
    } else {
      const newAddress = new Address({ userId: req.userId, ...req.body })
      await newAddress.save()
      res.status(200).json({ message: "Address is Added Successfully!!" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params
    await Address.findByIdAndDelete(id)
    res.status(200).json({ message: "Address is Added Successfully!!" });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const editAddress = async (req, res, next) => {
  try {
    const { id } = req.params
    await Address.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "Address is Updated Successfully!!" });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const confirmOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({ userId: req.userId, ...req.body })
    await newOrder.save()
    res.status(200).json({ message: "Order is Confirmed Successfully!!" });
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const subscriptedEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    const { subscriptedEmail } = req.body
    if (user.email === subscriptedEmail) {
      return res.status(401).json({ error: "Your Email is Already Subscripted" });
    }
    const emailIsExist = await Subscription.findOne({ subscriptedEmail: subscriptedEmail })
    if (emailIsExist) {
      return res.status(401).json({ error: "Email is Already Subscripted" });
    }
    const emailHasAccount = await User.findOne({ email: subscriptedEmail })
    if (emailHasAccount) {
      return res.status(401).json({ error: "Email Already has Account" });
    }
    const newSubscription = new Subscription({ userId: req.userId, subscriptedEmail: subscriptedEmail })
    await newSubscription.save()
    res.status(200).json({ message: "Thanks for Subscribing!" });
    sendMail(subscriptedEmail, "Confirm Your Subscription💌", confirmSubscription(`${process.env.CLIENT_THANKS_FOR_SUBSCRIPTION_URL}/${newSubscription._id}`, process.env.CLIENT_URL, process.env.CLIENT_SHOP_URL, process.env.CLIENT_ABOUT_URL, process.env.CLIENT_CONTACT_URL))
    return;
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const deleteSubscriptedEmail = async (req, res, next) => {
  try {
    const { subscriptedEmailId } = req.params
    const emailIsExist = await Subscription.findOne({ _id: subscriptedEmailId })
    if (emailIsExist) {
      await Subscription.findOneAndDelete({ _id: subscriptedEmailId })
      return res.status(200).json({ message: "Subscripted Email is Deleted Successfully!!" });
    } else {
      return res.status(404).json({ error: "Email is'nt Found in Subscripted Emails List" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

const changeAvatar = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      if (req.files[0].size > 1024 * 10240) {
        return res.status(402).json({ error: "Images Size is too large your limit for a image is 10MG" });
      }
      const avatar = await uploadImage(req.files[0]);
      await User.findOneAndUpdate({ _id: req.userId }, { avatar: avatar })
      return res.status(200).json({ message: "Avatar is Changed Successfully!!" });
    } else {
      res.status(404).json({ error: "Please Choose New Avatar" });
    }
  } catch (err) {
    return res.status(405).json({ error: err.message });
  }
}

module.exports = { getProfile, editAddress, deleteAccount, editAccount, addNewAddress, deleteAddress, confirmOrder, subscriptedEmail, deleteSubscriptedEmail, changeAvatar };
