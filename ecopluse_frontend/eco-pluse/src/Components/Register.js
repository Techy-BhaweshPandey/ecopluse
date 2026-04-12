import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("https://ecopluse-je8y.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user.email));
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("Register error:", err);
    }
  };

  return (
    <Box sx={{ background: "#e8f5e9", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" textAlign="center" color="green" gutterBottom>
            Join EcoPulse 🌍
          </Typography>

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/Login">Login</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
