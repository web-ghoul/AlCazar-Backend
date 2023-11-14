const mongoose = require("mongoose");

const { Schema } = mongoose;

const SubscriptionSchema = new Schema(
    {
        userId: {
            type: mongoose.ObjectId,
            required: [true, "UserId is Required"],
        },
        email: {
            type: String,
            required: [true, "Subscripted Email is Required"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
