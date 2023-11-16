const mongoose = require("mongoose");

const { Schema } = mongoose;

const SubscriptionSchema = new Schema(
    {
        userId: {
            type: mongoose.ObjectId,
            required: [true, "UserId is Required"],
        },
        subscriptedEmail: {
            type: String,
            required: [true, "Subscripted Email is Required"],
        },
        confirmed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
