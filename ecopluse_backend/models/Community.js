const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  totalCO2Saved: { type: Number, default: 0 },
  totalUsers: { type: Number, default: 0 },
  totalActions: { type: Number, default: 0 },

  weekCO2Saved: { type: Number, default: 0 },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Community", communitySchema);