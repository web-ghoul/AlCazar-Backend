const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User is'not Exist" });
    } else {
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ message: `Welcome ${user.firstName} ${user.lastName}`, token, user });
      } else {
        res.status(401).json({ error: "email or password is incorrect" });
      }
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
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
      const newUser = new User({isAdmin:false,...req.body});
      await newUser.save();
      res.status(200).json({ message: "Account is created successfully!!" });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = { login, register };
