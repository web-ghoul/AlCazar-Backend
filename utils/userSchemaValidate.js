const joi = require("joi");

const userSchemaValidate = joi.object({
    avatar: joi.array(),
    firstName: joi.string().required().messages({
        "string.base": "First Name should be a string.",
        "any.required": "First Name is required.",
    }),
    lastName: joi.string().required().messages({
        "string.base": "Last Name should be a string.",
        "any.required": "Last Name is required.",
    }),
    email: joi.string().required().messages({
        "number.base": "Email should be a number.",
        "any.required": "Email is required.",
    }),
    phone: joi.string().required().messages({
        "string.base": "Phone should be a string.",
        "any.required": "Phone is required.",
    })
});

module.exports = {
    userSchemaValidate
};
