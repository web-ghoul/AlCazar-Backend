const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
    {
        userId: {
            type: mongoose.ObjectId,
            required: [true, "UserId is Required"],
        },
        address:
            { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
        items: {
            type: Array,
            of: Map,
            required: [true, "Items is Required"],
        },
        itemsTotal: {
            type: Number,
            required: [true, "Items Total is Required"],
        },
        deliveryFees: {
            type: Number,
            required: [true, "Delivery Fees is Required"],
        },
        totalPrice: {
            type: Number,
            required: [true, "Total Price is Required"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
