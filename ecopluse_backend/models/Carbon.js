const mongoose = require("mongoose");

const carbonSchema = new mongoose.Schema({
  email: String,

  km: Number,
  transport: String,
  electricity: Number,
  diet: String,

  result: Number, // CO₂ emitted

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Carbon", carbonSchema);