import { useEffect, useState, useMemo } from "react";
import "./Leaderboard.css";
import { useLocation,useNavigate } from "react-router-dom";

import { FaCrown, FaMedal, FaAward, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function CommunityLeaderboard() {
  const [users, setUsers] = useState([]);
  const [globalStats, setGlobalStats] = useState({});
  const [prevRanks, setPrevRanks] = useState({});

  const location = useLocation();
const navigate=useNavigate();
  const email =
    location.state?.email ||
    JSON.parse(localStorage.getItem("user"))?.email;

  // ---------------- REAL TIME FETCH ----------------
  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 7000);

    return () => clearInterval(interval);
  }, );
useEffect(()=>
{
    if(!email) navigate("/login");
})
  const loadData = async () => {
   // const res1 = await fetch("http://localhost:5000/api/carbon/user10");
    // const g = await res1.json();

    const res2 = await fetch("http://localhost:5000/api/carbon/user12");
    const u = await res2.json();

    const usersList = u.data || [];

    // ✅ FIX: calculate correct stats
    const totalUsers = usersList.length;

    const totalCO2 = usersList.reduce(
      (sum, user) => sum + Number(user.totalCO2Saved || 0),
      0
    );

    setGlobalStats({
      totalUsers,
      totalCO2Saved: totalCO2
    });

    const ranked = rankUsers(usersList);

    const newPrev = {};
    ranked.forEach((u) => {
      newPrev[u.email] = u.rank;
    });

    setPrevRanks(newPrev);
    setUsers(ranked);
  };

  // ---------------- RANKING ----------------
  const rankUsers = (list) => {
    const sorted = [...list].sort((a, b) => {
      if (b.totalCO2Saved !== a.totalCO2Saved)
        return b.totalCO2Saved - a.totalCO2Saved;

      if (b.points !== a.points) return b.points - a.points;

      if (b.streak !== a.streak) return b.streak - a.streak;

      return (b.badges?.length || 0) - (a.badges?.length || 0);
    });

    let rank = 1;
    let prev = null;
    let skip = 0;

    return sorted.map((u) => {
      const key = `${u.totalCO2Saved}-${u.points}-${u.streak}-${u.badges?.length}`;

      if (key === prev) {
        skip++;
      } else {
        rank += skip;
        skip = 1;
        prev = key;
      }

      return {
        ...u,
        rank,
        xp: Math.floor(u.xp || 0), // ✅ safe fix
        level: Math.floor(u.totalCO2Saved / 50) + 1
      };
    });
  };

  // ---------------- MEDALS ----------------
  const getMedal = (rank) => {
    if (rank === 1) return <FaCrown className="gold" />;
    if (rank === 2) return <FaMedal className="silver" />;
    if (rank === 3) return <FaAward className="bronze" />;
    return null;
  };

  // ---------------- LOGGED USER ----------------
  const me = useMemo(
    () => users.find((u) => u.email === email),
    [users, email]
  );

  const getRankChange = (u) => {
    const prev = prevRanks[u.email];
    if (!prev) return null;

    if (u.rank < prev) return <FaArrowUp className="up" />;
    if (u.rank > prev) return <FaArrowDown className="down" />;
    return null;
  };

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="header">
        <h1>🌿 Carbon Impact Leaderboard</h1>
        <p>Real-time sustainability ranking system</p>
      </div>

      {/* LOGGED USER PROFILE CARD */}
      <div className="profileCard">
        <h2>👤 Your Profile</h2>

        <div className="profileGrid">
          <div><b>Email:</b> {email}</div>
          <div><b>Rank:</b> #{me?.rank || "-"}</div>
          <div><b>Points:</b> {me?.points || 0}</div>
          <div><b>Streak:</b> {me?.streak || 0} 🔥</div>
          <div><b>XP:</b> {me?.xp || 0}</div>
          <div><b>Level:</b> {me?.level || 1}</div>
        </div>
      </div>

      {/* GLOBAL STATS */}
      <div className="statsBar">
        <div>Users: {globalStats.totalUsers || 0}</div>
        <div>CO₂: {globalStats.totalCO2Saved?.toFixed(2) || 0}</div>
      </div>

      {/* TABLE HEADER */}
      <div className="tableContainer">

        <div className="tableHeader">
          <span>Rank</span>
          <span>Email</span>
          <span>CO₂</span>
          <span>Points</span>
          <span>Streak</span>
          <span>Badges</span>
        </div>

        {/* ROWS */}
        {users.map((u) => {
          const isMe = u.email === email;

          return (
            <div
              key={u.email}
              className={`row ${isMe ? "me" : ""}`}
            >
              <span className="rankBox">
                #{u.rank} {getMedal(u.rank)} {getRankChange(u)}
              </span>

              <span>{u.email}</span>
              <span>{Number(u.totalCO2Saved || 0).toFixed(2)}</span>
              <span>{u.points}</span>
              <span>{u.streak} 🔥</span>

              <span className="badges">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < (u.badges?.length || 0) ? "active" : ""}
                  >
                    🌱
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}