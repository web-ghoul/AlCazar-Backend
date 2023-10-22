const joi = require("joi");

const itemSchemaValidate = joi.object({
  admin:joi.object(),
  title: joi.string().required().messages({
    "string.base": "Title should be a string.",
    "any.required": "Title is required.",
  }),
  description: joi.string().required().messages({
    "string.base": "Description should be a string.",
    "any.required": "Description is required.",
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
  count: joi.number().required().messages({
    "number.base": "Count should be a number.",
    "any.required": "Count is required.",
  }),
  width: joi.number().required().messages({
    "number.base": "Width should be a number.",
    "any.required": "Width is required.",
  }),
  length: joi.number().required().messages({
    "number.base": "Length should be a number.",
    "any.required": "Length is required.",
  }),
  height: joi.number().required().messages({
    "number.base": "Height should be a number.",
    "any.required": "Height is required.",
  }),
});

const categorySchemaValidate = joi.object({
  admin:joi.object(),
  title: joi.string().required().messages({
    "string.base": "Title should be a string.",
    "any.required": "Title is required.",
  }),
  image: joi.object().messages({
    "array.base": "Image should be object",
    "any.required": "Image are required.",
  }),
});

module.exports = {
  itemSchemaValidate,
  categorySchemaValidate
};
