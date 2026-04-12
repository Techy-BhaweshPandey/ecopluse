const express = require("express");
const router = express.Router();

const Carbon = require("../models/Carbon");
const UserGame = require("../models/UserGame");
const Community = require("../models/Community");


// ===============================
// 🎮 SAVE + GAMIFICATION ENGINE
// ===============================
router.post("/save", async (req, res) => {
  try {
    const { email, km, transport, electricity, diet, result } = req.body;

    // 1. Save carbon history
    const data = await Carbon.create({
      email,
      km,
      transport,
      electricity,
      diet,
      result
    });

    // 2. Get or create user
    let user = await UserGame.findOne({ email });

    if (!user) {
      user = await UserGame.create({
        email,
        points: 0,
        xp: 0,
        level: 1,
        streak: 0,
        badges: [],
        rewards: [],
        totalCO2Saved: 0,
        lastActive: new Date(),

        currentMission: {
          title: "🌱 Start your eco journey",
          type: "onboarding",
          target: 1,
          progress: 0,
          completed: false
        }
      });
    }

    // ===============================
    // 3. POINT SYSTEM
    // ===============================
    const points = Math.max(10 - result * 2, 2);

    user.points += points;
    user.xp += points;
    user.totalCO2Saved += result;

    // ===============================
    // 4. STREAK SYSTEM
    // ===============================
    const now = new Date();
    const last = new Date(user.lastActive || now);

    const diff = (now - last) / (1000 * 60 * 60 * 24);

    if (diff <= 1) user.streak += 1;
    else user.streak = 1;

    user.lastActive = now;

    // ===============================
    // 5. LEVEL SYSTEM
    // ===============================
    if (user.xp >= user.level * 100) {
      user.level += 1;
      user.xp = 0;

      user.badges.push(`🌟 Level ${user.level} Unlocked`);
    }

    // ===============================
    // 6. MISSION SYSTEM (FIXED + IMPROVED)
    // ===============================

    if (!user.currentMission) {
      user.currentMission = {
        title: "Log your first eco activity",
        type: "general",
        target: 1,
        progress: 0,
        completed: false
      };
    }

    // progress update
    user.currentMission.progress += 1;

    // mission completed
    if (user.currentMission.progress >= user.currentMission.target) {
      user.currentMission.completed = true;

      user.points += 50;
      user.badges.push("🎯 Mission Completed");

      user.rewards.push({
        title: user.currentMission.title,
        unlockedAt: new Date()
      });

      // 🔁 NEW RANDOM MISSION
      const missions = [
        { title: "Use public transport today", type: "transport", target: 2 },
        { title: "Reduce electricity usage", type: "electricity", target: 3 },
        { title: "Choose plant-based meal", type: "diet", target: 2 }
      ];

      const next = missions[Math.floor(Math.random() * missions.length)];

      user.currentMission = {
        ...next,
        progress: 0,
        completed: false
      };
    }

    // ===============================
    // 7. COMMUNITY UPDATE (FIXED)
    // ===============================
    let community = await Community.findOne();

    if (!community) {
      community = await Community.create({
        
        totalCO2Saved: 0,
        totalActions: 0,
        weekCO2Saved: 0,
        totalUsers: 1
      });
    }

    community.totalCO2Saved += result;
    community.totalActions += 1;
    community.weekCO2Saved += result;

    // update active users count
    const totalUsers = await UserGame.countDocuments();
    community.totalUsers = totalUsers;

    await community.save();
    await user.save();

    // ===============================
    // RESPONSE
    // ===============================
    res.json({
      success: true,
      message: "Gamification updated successfully 🎮",
      data,
      user,
      community
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


// ===============================
// 📊 GET USER HISTORY (CARBON LOGS)
// ===============================
router.get("/user8/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const data = await Carbon.find({ email });

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


// ===============================
// 🎮 NEW: GET USER GAME DATA (IMPORTANT)
// ===============================
router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const history = await Carbon.find({ email });

    const user = await UserGame.findOne({ email });

    res.json({
      success: true,
      user: user || {
        xp: 0,
        level: 1,
        points: 0,
        streak: 0,
        totalCO2Saved: 0,
        badges: [],
        currentMission: {
          title: "🌱 Start your eco journey",
          progress: 0,
          target: 1
        }
      },
      history
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

router.get("/user10", async (req, res) => {
  try {
    const data = await Community.find({});

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

router.get("/user12", async (req, res) => {
  try {
    const data = await UserGame.find({});

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

router.get("/user14/:email", async (req, res) => {
  try {
     const { email } = req.params;
    const data = await Community.find({ email });

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;