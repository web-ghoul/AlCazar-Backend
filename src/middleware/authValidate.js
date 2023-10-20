const validator = require("email-validator");
const emailExistence = require("email-existence");
const { loginSchemaValidate, registerSchemaValidate } = require("../utils/authSchemaValidate");

const emailValidate = (req,res,next) => {
  const { email } = req.body;
  if (validator.validate(email)) {
    next();
  } else {
    res.status(404).json({ error: "Email is not Valid" });
  }
};

const loginValidate = async (req, res, next) => {
  try {
    await loginSchemaValidate.validateAsync(req.body);
    next()
  } catch (err) {
    err.message = err.message
      .split("")
      .filter((char) => char !== '"' && char !== "/")
      .join("");
    res.status(405).json({ error: err.message });
  }
};

const registerValidate = async (req, res, next) => {
  try {
    await registerSchemaValidate.validateAsync(req.body);
    next()
  } catch (err) {
    err.message = err.message
      .split("")
      .filter((char) => char !== '"' && char !== "/")
      .join("");
    res.status(405).json({ error: err.message });
  }
};

module.exports = {emailValidate, loginValidate ,registerValidate};
