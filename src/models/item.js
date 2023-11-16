const mongoose = require("mongoose");

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: [true, "Title is Required"],
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
    quantity: {
      type: Number,
      required: [true, "Count is Required"],
    },
    dimensions: {
      type: Array,
      of: Map,
      required: [true, "Dimensions is Required"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
