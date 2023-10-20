const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User is'not Exist" });
    } else {
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const token = jwt.sign({ email }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        console.log(user.firstName , "logged in")
        res.status(200).json({message:`Welcome ${user.firstName} ${user.lastName}` ,token, user });
      } else {
        res.status(401).json({ message: "email or password is incorrect" });
      }
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const register = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(405).json({ error: "User is already Exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json({ message: "Account is created successfully!!" });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = { login, register };
