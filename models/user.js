const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET =
  "877a775acb16b22fb7cdd56a964b4c715ca4c1b3ff3fb1332894d276842c901059dee05fa698796aa2e285047bae3e40b8c0996b480a082b0c7d3022712d150e";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, TOKEN_SECRET);
};

module.exports = mongoose.model("User", userSchema);
