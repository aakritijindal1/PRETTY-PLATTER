const mongoose = require("mongoose");
// const menuItemSchema = require('../models/menuItems')
const TOKEN_SECRET =
  "877a775acb16b22fb7cdd56a964b4c715ca4c1b3ff3fb1332894d276842c901059dee05fa698796aa2e285047bae3e40b8c0996b480a082b0c7d3022712d150e";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  location: String,
  // menu: [menuItemSchema],
  // menu: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'menuItems'
  // }],
  menu: [
    {
      itemName: {
        type: String,
        required: true,
      },
      description: String,
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  pricing: String,
  isOnline: {
    type: Boolean,
    default: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  menuItemIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menuItemSchema",
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
