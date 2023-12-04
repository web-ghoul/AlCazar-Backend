const joi = require("joi");

const orderSchemaValidate = joi.object({
    userId: joi.string(),
    items: joi.array().required().messages({
        "string.base": "Items should be a string.",
        "any.required": "Items is required.",
    }),
    address: joi.string().required().messages({
        "number.base": "Address should be a number.",
        "any.required": "Address is required.",
    }),
    itemsTotal: joi.number().required().messages({
        "string.base": "Items Total should be a string.",
        "any.required": "Items Total is required.",
    }),
    deliveryFees: joi.number().required().messages({
        "string.base": "Delivery Fees should be a string.",
        "any.required": "Delivery Fees is required.",
    }),
    totalPrice: joi.number().required().messages({
        "string.base": "Total Price should be a string.",
        "any.required": "Total Price is required.",
    }),
});

module.exports = {
    orderSchemaValidate
};
