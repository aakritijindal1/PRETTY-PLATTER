const mongoose = require("mongoose");
// const menuItemSchema = require('../models/menuItems')
const TOKEN_SECRET =
  "877a775acb16b22fb7cdd56a964b4c715ca4c1b3ff3fb1332894d276842c901059dee05fa698796aa2e285047bae3e40b8c0996b480a082b0c7d3022712d150e";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  orderedItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menuItemSchema",
    },
  ],
  totalPrice: {
    type: Number,
    // required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "delivered"],
    default: "pending",
  },
  rating: {
    type: Number,
    default: 0,
  },
  deliveryAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryAgent",
  },
});

module.exports = mongoose.model("Order", orderSchema);
