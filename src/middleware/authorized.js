const jwt = require("jsonwebtoken")
const User = require("../models/user")

const authorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1]
      const decode = jwt.verify(token, process.env.SECRET_KEY)
      req.userId = decode.userId
      next()
    } else {
      res.status(401).json({ error: "Not Authorized!!" })
    }
  } catch (error) {
    let msg = error.message
    if (error.message === "jwt expired") {
      msg = `${process.env.SESSION_EXPIRED_MESSAGE}`
    }
    if (error.message === "jwt malformed") {
      return;
    }
    res.status(401).json({ error: msg });
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    if (user) {
      if (user.isAdmin) {
        next()
      } else {
        res.status(401).json({ error: "You aren't Admin so, Not Authorized" });
      }
    } else {
      res.status(404).json({ error: "User isn't Exist" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { authorization, isAdmin }