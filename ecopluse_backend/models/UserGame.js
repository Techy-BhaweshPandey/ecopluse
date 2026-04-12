const mongoose = require("mongoose");

const userGameSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },

  // 🎮 GAME PROGRESSION
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  points: { type: Number, default: 0 },

  // 🌍 IMPACT METRICS
  totalCO2Saved: { type: Number, default: 0 },

  // 🔥 STREAK SYSTEM
  streak: { type: Number, default: 0 },
  lastActive: Date,

  // 🏅 BADGES
  badges: { type: [String], default: [] },

  // 🎯 CURRENT MISSION
  currentMission: {
  title: { type: String, default: "🌱 Start your eco journey" },
  type: { type: String, default: "onboarding" },
  target: { type: Number, default: 1 },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
},

  // 🎁 REWARDS HISTORY
  rewards: [
    {
      title: String,
      unlockedAt: Date
    }
  ]
});

module.exports = mongoose.model("UserGame", userGameSchema);