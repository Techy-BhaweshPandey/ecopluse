import React, { useEffect, useState, useMemo } from "react";
import "./gamification.css";
import { useNavigate, useLocation } from "react-router-dom";

const Gamification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    JSON.parse(localStorage.getItem("user"))?.email;

  const [data, setData] = useState(null);

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(1);

  const [missionPopup, setMissionPopup] = useState(false);
  const [prevMissionProgress, setPrevMissionProgress] = useState(0);

  // FETCH USER
  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost:5000/api/carbon/user/${email}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [email]);

  const user = data?.user || {
    xp: 0,
    level: 1,
    points: 0,
    streak: 0,
    totalCO2Saved: 0,
    badges: [],
    currentMission: {
      title: "🌱 Start your eco journey",
      progress: 0,
      target: 1,
    },
  };

  const xpPercent = user.xp % 100;

  // ===============================
  // 🎉 LEVEL UP POPUP
  // ===============================
  useEffect(() => {
    if (user.level > prevLevel) {
      setShowLevelUp(true);
      setPrevLevel(user.level);

      setTimeout(() => setShowLevelUp(false), 2500);
    }
  }, [user.level,prevLevel]);

  // ===============================
  // 🎯 MISSION COMPLETE DETECTION
  // ===============================
  useEffect(() => {
    const progress = user.currentMission?.progress || 0;

    if (progress > prevMissionProgress && progress >= user.currentMission?.target) {
      setMissionPopup(true);

      setTimeout(() => setMissionPopup(false), 3000);
    }

    setPrevMissionProgress(progress);
  }, [user.currentMission?.progress,user.currentMission?.target,prevMissionProgress]);

  // ===============================
  // 🔥 DAILY BONUS
  // ===============================
  const dailyBonus = useMemo(() => {
    const today = new Date().getDate();
    return today % 2 === 0 ? 10 : 5;
  }, []);

  if (!data) {
    return <div className="loading">Loading your eco journey...</div>;
  }

  return (
    <div className="container">

      {/* LEVEL UP POPUP */}
      {showLevelUp && (
        <div className="levelup-modal">
          🎉 Level Up! You reached Level {user.level}
        </div>
      )}

      {/* 🎯 MISSION COMPLETE POPUP */}
      {missionPopup && (
        <div className="mission-modal">
          <div className="mission-card-anim">
            🎯 Mission Completed! <br />
            <span>+50 XP Earned 🚀</span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="header">
        <div>
          <h2>🌍 Eco Gamification Dashboard</h2>
          <p>{email}</p>
        </div>

        <button
          className="start-btn"
          onClick={() => navigate("/Carbontracker")}
        >
          ▶ Start Tracking
        </button>
      </div>

      {/* STATS */}
      <div className="grid">

        {/* XP + LEVEL */}
        <div className="card">
          <h3>🏆 Level {user.level}</h3>

          <div className="bar">
            <div
              className="fill animated-fill"
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <p>{xpPercent}/100 XP</p>
        </div>

        {/* STREAK */}
        <div className="card streak-card">
          <h3>
            🔥 Streak
            <span className={`fire fire-${Math.min(user.streak, 5)}`}>🔥</span>
          </h3>
          <p>{user.streak} Days</p>
        </div>

        <div className="card">
          <h3>🌍 CO₂ Saved</h3>
          <p>{user.totalCO2Saved} kg</p>
        </div>

        <div className="card">
          <h3>⭐ Points</h3>
          <p>{user.points}</p>
        </div>
      </div>

      {/* DAILY BONUS */}
      <div className="mission bonus-box">
        <h3>🎁 Daily Reward</h3>
        <p>Complete today’s activity to earn +{dailyBonus} XP bonus</p>
      </div>

      {/* MISSION */}
      <div className="mission">
        <h3>🎯 Current Mission</h3>
        <p>{user.currentMission?.title}</p>

        <div className="bar">
          <div
            className="fill animated-fill"
            style={{
              width: `${
                ((user.currentMission?.progress || 0) /
                  (user.currentMission?.target || 1)) * 100
              }%`,
            }}
          />
        </div>

        <p>
          {user.currentMission?.progress || 0} /{" "}
          {user.currentMission?.target}
        </p>
      </div>

      {/* BADGES */}
      <div className="badges">
        <h3>🏅 Badges</h3>

        {user.badges.length === 0 ? (
          <p className="muted">No badges yet 🌱</p>
        ) : (
          <div className="badge-grid">
            {user.badges.map((b, i) => (
              <div key={i} className="badge-card glow">
                🏆 <span>{b}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gamification;