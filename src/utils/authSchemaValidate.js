const joi = require("joi");

const loginSchemaValidate = joi.object({
  email: joi.string().required().email({ minDomainSegments: 2 }),
  password: joi.string().required().min(8)
});

const registerSchemaValidate = joi.object({
  isAdmin: joi.boolean(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phone: joi.string().required(),
  avatar: joi.string(),
  email: joi.string().required().email({ minDomainSegments: 2 }),
  password: joi.string().required().min(8),
  confirmPassword: joi.string().required().min(8),
});

module.exports = {
  loginSchemaValidate,
  registerSchemaValidate,
};
