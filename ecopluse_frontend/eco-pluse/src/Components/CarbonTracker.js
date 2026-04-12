import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { FaCar, FaBolt, FaUtensils, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const CarbonTracker = () => {
  const [km, setKm] = useState("");
  const [transport, setTransport] = useState("car");
  const [electricity, setElectricity] = useState("");
  const [diet, setDiet] = useState("mixed");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
 const location = useLocation();
 const email =
  location.state?.email ||
  JSON.parse(localStorage.getItem("user"))?.email;
//console.log("EMAIL RECEIVED:", location.state?.email);
  const navigate = useNavigate();
useEffect(()=>{
  if(!email) navigate("/login");
})
  const calculateCarbon = async () => {
    const kmValue = Number(km) || 0;
    const electricityValue = Number(electricity) || 0;

    let transportFactor = 0;
    if (transport === "car") transportFactor = 0.2;
    if (transport === "bus") transportFactor = 0.05;

    const transportEmission = kmValue * transportFactor;
    const electricityEmission = (electricityValue * 0.7) / 4;

    let foodEmission = 5;
    if (diet === "veg") foodEmission = 2;
    if (diet === "meat") foodEmission = 8;

    const totalValue =
      transportEmission + electricityEmission + foodEmission;

    const finalResult = totalValue.toFixed(2);
    setResult(finalResult);

    // messages
    if (totalValue > 20) {
      setMessage("⚠️ High footprint — try reducing energy or travel.");
    } else if (totalValue < 10) {
      setMessage("🌱 Great job — you're eco-friendly!");
    } else {
      setMessage("👍 Moderate footprint — small changes can improve it.");
    }

    // SAVE TO BACKEND
    try {
      await fetch("https://ecopluse-je8y.onrender.com/api/carbon/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          km: kmValue,
          transport,
          electricity: electricityValue,
          diet,
          result: totalValue,
          email:email,
        }),
      });
    } catch (err) {
      console.log("Save failed:", err);
    }
  };

  return (
    <Box sx={{ background: "#f4f9f4", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <FaLeaf size={36} color="#2e7d32" />
          <Typography variant="h4" fontWeight="600" mt={2}>
            EcoPulse Tracker
          </Typography>
          <Typography color="text.secondary" fontSize="15px">
            Understand your impact in seconds
          </Typography>
        </Box>

        {/* Inputs */}
        <Card sx={{ borderRadius: 4, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <FaCar />
                  <Typography variant="body1">Transport</Typography>
                </Box>

                <TextField
                  label="Km per week"
                  type="number"
                  fullWidth
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  sx={{ mt: 1 }}
                />

                <TextField
                  select
                  fullWidth
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="car">Car</MenuItem>
                  <MenuItem value="bus">Bus</MenuItem>
                  <MenuItem value="bike">Bike</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <FaBolt />
                  <Typography>Electricity</Typography>
                </Box>

                <TextField
                  label="Units per month"
                  type="number"
                  fullWidth
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                  sx={{ mt: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <FaUtensils />
                  <Typography>Diet</Typography>
                </Box>

                <TextField
                  select
                  fullWidth
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="veg">Vegetarian</MenuItem>
                  <MenuItem value="mixed">Mixed</MenuItem>
                  <MenuItem value="meat">Meat-heavy</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* Button */}
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={calculateCarbon}
            >
              Calculate Impact
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card
            sx={{
              mt: 4,
              borderRadius: 4,
              textAlign: "center",
              background: "linear-gradient(135deg, #e8f5e9, #ffffff)",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography color="text.secondary">
                Weekly Carbon Output
              </Typography>

              <Typography
                variant="h2"
                fontWeight="bold"
                color="#2e7d32"
              >
                {result}
              </Typography>

              <Typography fontSize="14px">kg CO₂</Typography>

              <Typography mt={2} fontWeight="500">
                {message}
              </Typography>

              <Typography mt={2} color="text.secondary" fontSize="13px">
                ≈ {(result * 5).toFixed(0)} km driving equivalent
              </Typography>

              {/* 🔥 AI BUTTON (ADDED ONLY AFTER RESULT) */}
              <Button
  variant="outlined"
  color="success"
  sx={{ mt: 3, borderRadius: 3 }}
  onClick={() =>
    navigate("/AI", {
      state: {
        carbonData: {
          km: Number(km),
          transport,
          electricity: Number(electricity),
          diet,
          result: Number(result),
        },
      },
    })
  }
>
  🤖 Ask AI Coach
</Button>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default CarbonTracker;
