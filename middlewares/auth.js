const User = require("../models/user");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET =
  "877a775acb16b22fb7cdd56a964b4c715ca4c1b3ff3fb1332894d276842c901059dee05fa698796aa2e285047bae3e40b8c0996b480a082b0c7d3022712d150e";

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({
        message: "Please Login First",
      });
    }

    const decoded = await jwt.verify(token, TOKEN_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
