const mongoose = require("mongoose");

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: [true, "Title is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    price: {
      type: Number,
      required: [true, "Price is Required"],
    },
    category: {
      type: String,
      enum: [],
      required: [true, "Category is Required"],
    },
    images: {
      type: Array,
      of: String,
      required: [true, "Images is Required"],
    },
    count: {
      type: Number,
      required: [true, "Count is Required"],
    },
    width: {
      type: Number,
      required: [true, "Width is Required"],
    },
    length: {
      type: Number,
      required: [true, "Length is Required"],
    },
    height: {
      type: Number,
      required: [true, "Height is Required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
