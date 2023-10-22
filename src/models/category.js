const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: [true, "Title is Required"],
    },
    image: {
      type: String,
      required: [true, "Image is Required"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
