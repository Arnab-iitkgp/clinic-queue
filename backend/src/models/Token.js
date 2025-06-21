const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  number: {
    type: Number,
    // required: true,
  },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["waiting", "called", "done"],
    default: "waiting",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
