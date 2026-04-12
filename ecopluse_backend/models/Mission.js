const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
  title: String,
  description: String,

  type: String, // transport / diet / electricity

  condition: {
    transport: String,
    diet: String,
    maxKm: Number,
    maxElectricity: Number
  },

  rewardXP: Number,
  rewardPoints: Number,

  badge: String
});

module.exports = mongoose.model("Mission", missionSchema);