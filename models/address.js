const mongoose = require("mongoose");

const { Schema } = mongoose;

const addressSchema = new Schema(
    {
        userId: {
            type: mongoose.ObjectId,
            required: [true]
        },
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
        address: {
            type: String,
            required: [true, "Address is Required"],
        },
        city: {
            type: String,
            required: [true, "City is Required"],
        },
        country: {
            type: String,
            required: [true, "Country is Required"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
