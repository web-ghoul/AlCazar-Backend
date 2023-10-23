const User = require("../models/user");
require("dotenv").config();

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: "User is not Exist" });
    }
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    console.log(req.userId)
    const user = await User.findOne({ _id: req.userId })
    if (user) {
      res.status(200).json({ message: "Account is Deleted Successfully!!" });
    } else {
      res.status(404).json({ error: "User is not Exist" });
    }
  } catch (error) {
    res.status(405).json({ error: err.message });
  }
}

module.exports = { getUser, deleteAccount };
