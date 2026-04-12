import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
} from "@mui/material";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import jsPDF from "jspdf";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
const chartRef = useRef();
  const email = useMemo(() => {
    const storageUser = localStorage.getItem("user");
    if (!storageUser) return null;
    try {
      const parsed = JSON.parse(storageUser);
      return typeof parsed === "string" ? parsed : parsed?.email;
    } catch {
      return "User";
    }
  }, []);

  const [history, setHistory] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const fetchHistory = useCallback(async () => {
    if (!email) return;
    const res = await fetch(`http://localhost:5000/api/carbon/user8/${email}`);
    const data = await res.json();
    if (data.success) setHistory(data.data);
  }, [email]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const filteredData = useMemo(() => {
    if (!filterDate) return history;
    return history.filter((i) => i.createdAt?.includes(filterDate));
  }, [history, filterDate]);

  const avgCarbon = useMemo(() => {
    if (!filteredData.length) return 0;
    return filteredData.reduce((a, b) => a + b.result, 0) / filteredData.length;
  }, [filteredData]);

  const ecoScore = Math.max(100 - avgCarbon * 3, 0);

  const downloadPDF = async () => {
  const doc = new jsPDF();

  // =========================
  // HEADER (BRANDING)
  // =========================
  doc.setFontSize(18);
  doc.setTextColor(22, 163, 74);
  doc.text("EcoPulse Sustainability Report", 20, 20);

  doc.setFontSize(11);
  doc.setTextColor(80);
  doc.text(`User: ${email}`, 20, 30);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 37);

  // =========================
  // KPI SECTION
  // =========================
  doc.setFontSize(12);
  doc.setTextColor(0);

  doc.text(`Eco Score: ${ecoScore.toFixed(0)}/100`, 20, 50);
  doc.text(`Avg Carbon: ${avgCarbon.toFixed(2)}`, 20, 57);
  doc.text(`Total Logs: ${history.length}`, 20, 64);

  // =========================
  // CHART CAPTURE
  // =========================
  const canvas = await html2canvas(chartRef.current);
  const imgData = canvas.toDataURL("image/png");

  doc.addImage(imgData, "PNG", 15, 75, 180, 70);

  // =========================
  // TABLE TITLE
  // =========================
  doc.addPage();
  doc.setFontSize(14);
  doc.setTextColor(22, 163, 74);
  doc.text("Activity Logs", 20, 20);

  // =========================
  // TABLE HEADER
  // =========================
  let y = 35;

  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.text("Transport", 20, y);
   doc.text("KM" , 20, y);
    doc.text("Electricity", 20, y);
     doc.text("Diet", 20, y);
      doc.text("CO₂", 20, y);
  y += 10;

  // =========================
  // TABLE DATA
  // =========================
  filteredData.forEach((row, i) => {
    const line = `${row.transport} | ${row.km} | ${row.electricity} | ${row.diet} | ${row.result}`;
    doc.text(line, 20, y);
    y += 8;

    // page break safety
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  // =========================
  // SAVE
  // =========================
  doc.save("EcoPulse_Report.pdf");
};
  return (
    <Box className="eco-app">

      {/* MOBILE TOP BAR */}
     {/* MOBILE TOP BAR */}
<Box className="mobileBar">
  <Button className="menuBtn" onClick={() => setSidebarOpen(true)}>
    ☰
  </Button>

  <Typography sx={{ fontWeight: 800, color: "#16a34a" }}>
    EcoPulse
  </Typography>
</Box>

{/* OVERLAY */}
{sidebarOpen && (
  <div className="overlay" onClick={() => setSidebarOpen(false)} />
)}

{/* SIDEBAR */}
<Box className={`sidebar ${sidebarOpen ? "open" : ""}`}>

  {/* CLOSE BUTTON */}
  <div className="closeBtn" onClick={() => setSidebarOpen(false)}>
    ✕
  </div>

  <Typography className="logo">🌿 EcoPulse</Typography>

  {/* PROFILE */}
  <Avatar className="avatar">
    {email?.charAt(0)}
  </Avatar>

  <Typography className="user">{email}</Typography>

  {/* NAVIGATION */}
  <Box className="nav">
    {[
      { n: "Overview", p: "/dashboard" },
      { n: "Tracker", p: "/Carbontracker" },
      { n: "AI Insights", p: "/AI" },
      { n: "Classifier", p: "/WasteClassifier" },
      { n: "Gamification", p: "/gamification" },
    ].map((item) => (
      <Button
        key={item.n}
        onClick={() => {
          navigate(item.p, { state: { email } });
          setSidebarOpen(false);
        }}
        className="nav-btn"
      >
        {item.n}
      </Button>
    ))}
  </Box>

  {/* LOGOUT (INSIDE MENU) */}
  <Button
    className="logout"
    onClick={() => navigate("/login")}
  >
    Logout
  </Button>
</Box>

      {/* MAIN */}
      <Box className="main">

        {/* HEADER */}
        <Box className="header">
  <Box>
    <Typography className="title">Carbon Dashboard</Typography>
    <Typography className="subtitle">{email}</Typography>
  </Box>

  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
    <TextField
      type="date"
      size="small"
      onChange={(e) => setFilterDate(e.target.value)}
    />

    {/* ✅ ADD THIS BUTTON */}
    <Button
      onClick={downloadPDF}
      sx={{
        background: "#16a34a",
        color: "white",
        fontWeight: 700,
        textTransform: "none",
        "&:hover": { background: "#15803d" }
      }}
    >
      Download PDF
    </Button>
  </Box>
</Box>

        {/* CARDS */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card className="glass-card eco-card">
              <h3>Eco Score</h3>
              <h1>{ecoScore.toFixed(0)}</h1>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="glass-card">
              <h3>Avg Carbon</h3>
              <h1>{avgCarbon.toFixed(2)} kg</h1>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="glass-card">
              <h3>Total Logs</h3>
              <h1>{history.length}</h1>
            </Card>
          </Grid>
        </Grid>

        {/* CHART (FIXED TOOLTIP FULLY USED) */}
        <Card className="chart-card" ref={chartRef}>
          <Typography className="section-title">
            Carbon Trend Analytics
          </Typography>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={filteredData}>

              {/* ✅ NOW USED */}
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

              {/* ✅ NOW USED */}
              <XAxis dataKey="createdAt" hide />

              {/* ✅ NOW USED */}
              <YAxis />

              {/* ✅ NOW USED (IMPORTANT FIX) */}
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value) => [`${value} kg CO₂`, "Carbon"]}
              />

              <Area
                type="monotone"
                dataKey="result"
                stroke="#16a34a"
                fill="#bbf7d0"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* TABLE */}
        <Card className="table-card">
          <Typography>Activity Logs</Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["Transport", "KM", "Electricity", "Diet", "CO₂"].map((h) => (
                    <TableCell key={h}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.transport}</TableCell>
                    <TableCell>{row.km}</TableCell>
                    <TableCell>{row.electricity}</TableCell>
                    <TableCell>
                      <Chip label={row.diet} />
                    </TableCell>
                    <TableCell className="green">
                      {row.result}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

      </Box>
    </Box>
  );
};

export default Dashboard;