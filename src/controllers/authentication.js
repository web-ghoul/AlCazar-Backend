const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");
const { welcomeMail } = require("../mails/welcomeMail");
const { resetPasswordMail } = require("../mails/resetPasswordMail");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(404).json({ error: "User is'not Exist" });
    } else {
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: "30d",
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
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(405).json({ error: "User is already Exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      req.body.email = email.toLowerCase()
      const newUser = new User({ isAdmin: false, ...req.body });
      await newUser.save();
      sendMail(email, "Welcome To Our House🏡", welcomeMail())
      res.status(200).json({ message: "Account is created successfully!!" });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const verify = async (req, res, next) => {
  try {

  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const isUserExist = await User.findOne({ email: email })
    if (isUserExist) {
      sendMail(email, "Reset Your Password 🔒", resetPasswordMail(`${process.env.CLIENT_URL}/reset-password/${isUserExist._id}`))
      res.status(200).json({ message: "Check your gmail inbox" });
    } else {
      res.status(404).json({ error: "User isn't Exist" });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { password } = req.body
    const isUserExist = await User.findOne({ _id: userId })
    if (isUserExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate({ _id: userId }, { password: hashedPassword })
      res.status(200).json({ message: "Password is Reset Successfully!!" });
    } else {
      res.status(404).json({ error: "User isn't Exist" });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

const googleAuth = async (req, res, next) => {
  try {
    const email = req.user.emails[0].value
    const user = await User.findOne({ email })
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + 30 * 24 * 60 * 60 * 1000,
    );
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });

      res.cookie('AlCazar_token', token, {
        expires: expirationDate,
        sameSite: false,
        path: "/",
        domain: "alcazarfinewood.vercel.app"
      });

      res.cookie('AlCazar_userId', user._id, {
        expires: expirationDate,
        sameSite: false,
        path: "/",
        domain: "alcazarfinewood.vercel.app"
      });

      res.redirect(`${process.env.CLIENT_URL}`)
    } else {
      const password = await bcrypt.hash(process.env.SECRET_KEY, 10);
      const avatar = req.user.photos[0].value
      const firstName = req.user.name.givenName
      const lastName = req.user.name.familyName
      const newUser = new User({ avatar, email, firstName, lastName, password, phone: "00" });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      sendMail(email, "Welcome To Our House🏡", welcomeMail())

      res.cookie('AlCazar_token', token, {
        expires: expirationDate,
        sameSite: false,
        path: "/",
        domain: "alcazarfinewood.vercel.app"
      });

      res.cookie('AlCazar_userId', newUser._id, {
        expires: expirationDate,
        sameSite: false,
        path: "/",
        domain: "alcazarfinewood.vercel.app"
      });

      res.redirect(`${process.env.CLIENT_URL}`)
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = { login, register, verify, forgotPassword, resetPassword, googleAuth };
