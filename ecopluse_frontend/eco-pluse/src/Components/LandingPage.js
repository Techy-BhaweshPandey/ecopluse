import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { FaLeaf, FaCar, FaBolt, FaUtensils } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  // ✅ Check login on load
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const email = JSON.parse(user);
      setUserEmail(email);

      // 🚀 auto redirect to dashboard if logged in
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="success">
        <Toolbar>
          <FaLeaf style={{ marginRight: "10px" }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EcoPulse
          </Typography>

          {/* ✅ LOGIN / USER UI (ONLY CHANGE) */}
          {userEmail ? (
            <>
              <Typography sx={{ mr: 2 }} color="inherit">
                {userEmail}
              </Typography>

              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setUserEmail(null);
                  navigate("/"); // back to landing
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          py: 10,
          textAlign: "center",
          background: "linear-gradient(to right, #e8f5e9, #ffffff)",
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Track Your Carbon Footprint 🌍
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Small changes in your lifestyle can make a big impact on the planet.
          </Typography>

          <Link to="/Login">
            <Button variant="contained" color="success" size="large">
              Start Tracking
            </Button>
          </Link>
        </Container>
      </Box>

      {/* What is Carbon Footprint */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          What is a Carbon Footprint?
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          maxWidth="700px"
          mx="auto"
        >
          Your carbon footprint is the total amount of CO₂ you produce through
          daily activities like traveling, using electricity, and food habits.
        </Typography>

        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <FaCar size={40} />
                <Typography variant="h6" mt={2}>
                  Transport
                </Typography>
                <Typography color="text.secondary">
                  Driving cars and commuting adds emissions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <FaBolt size={40} />
                <Typography variant="h6" mt={2}>
                  Electricity
                </Typography>
                <Typography color="text.secondary">
                  Power usage contributes to carbon output.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <FaUtensils size={40} />
                <Typography variant="h6" mt={2}>
                  Food
                </Typography>
                <Typography color="text.secondary">
                  Diet choices impact environmental sustainability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Why It Matters */}
      <Box sx={{ py: 8, backgroundColor: "#f1f8e9" }}>
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Why It Matters 🌱
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            maxWidth="700px"
            mx="auto"
          >
            A higher carbon footprint contributes to climate change, rising
            temperatures, and extreme weather. Reducing it helps protect our
            planet for future generations.
          </Typography>
        </Container>
      </Box>

      {/* How EcoPulse Helps */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          How EcoPulse Helps You
        </Typography>

        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">📊 Track Emissions</Typography>
                <Typography color="text.secondary">
                  Monitor your carbon footprint with simple inputs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">🤖 Smart Suggestions</Typography>
                <Typography color="text.secondary">
                  Get AI-based tips to reduce your impact.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">🏆 Earn Rewards</Typography>
                <Typography color="text.secondary">
                  Gain points and badges for eco-friendly actions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA */}
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Ready to Make a Difference?
        </Typography>

        <Link to="/Login">
          <Button variant="contained" color="success" size="large">
            Calculate Your Footprint
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default LandingPage;