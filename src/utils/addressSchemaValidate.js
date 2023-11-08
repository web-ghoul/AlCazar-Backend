const joi = require("joi");

const addressSchemaValidate = joi.object({
    userId: joi.string(),
    firstName: joi.string().required().messages({
        "string.base": "First Name should be a string.",
        "any.required": "First Name is required.",
    }),
    lastName: joi.string().required().messages({
        "string.base": "Last Name should be a string.",
        "any.required": "Last Name is required.",
    }),
    phone: joi.string().required().messages({
        "string.base": "Phone should be a string.",
        "any.required": "Phone is required.",
    }),
    address: joi.string().required().messages({
        "number.base": "Address should be a number.",
        "any.required": "Address is required.",
    }),
    city: joi.string().required().messages({
        "string.base": "City should be a string.",
        "any.required": "City is required.",
    }),
    country: joi.string().required().messages({
        "string.base": "Country should be a string.",
        "any.required": "Country is required.",
    }),
});

module.exports = {
    addressSchemaValidate
};
