const joi = require("joi");

const itemSchemaValidate = joi.object({
  admin: joi.object(),
  title: joi.string().required().messages({
    "string.base": "Title should be a string.",
    "any.required": "Title is required.",
  }),
  price: joi.number().required().messages({
    "number.base": "Price should be a number.",
    "any.required": "Price is required.",
  }),
  category: joi.string().required().messages({
    "string.base": "Category should be a string.",
    "any.required": "Category is required.",
    "any.only": "Category must be one of Category1, Category2, or Category3.",
  }),
  images: joi.array().messages({
    "array.base": "Images should be an array of files.",
    "any.required": "Images are required.",
  }),
  quantity: joi.number().required().messages({
    "number.base": "Quantity should be a number.",
    "any.required": "Quantity is required.",
  }),
  dimensions: joi.array().required().messages({
    "number.base": "Dimensions should be a Array.",
    "any.required": "Dimensions is required.",
  })
});

const categorySchemaValidate = joi.object({
  admin: joi.object(),
  title: joi.string().required().messages({
    "string.base": "Title should be a string.",
    "any.required": "Title is required.",
  }),
  image: joi.array().messages({
    "array.base": "Image should be array",
    "any.required": "Image are required.",
  }),
});

module.exports = {
  itemSchemaValidate,
  categorySchemaValidate
};
