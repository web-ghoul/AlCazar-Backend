const joi = require("joi");

const subscriptionSchemaValidate = joi.object({
    userId: joi.string(),
    email: joi.string().required().messages({
        "string.base": "Subscripted Email should be a string.",
        "any.required": "Subscripted Email is required.",
    }),
});

module.exports = {
    subscriptionSchemaValidate
};
