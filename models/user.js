const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    isAdmin: { type: Boolean, required: true, default: false },
    isVerify: { type: Boolean, required: true, default: false },
    firstName: {
      type: String,
      required: [true, "First Name is Required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number is Required"],
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dzajwg1m4/image/upload/v1698131822/ebtpl4jki1dpw4r4yfod.png"
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      min: [8, "Must Password will be 8 Characters at least"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
