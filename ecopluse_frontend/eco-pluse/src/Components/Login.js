import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user.email));
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e8f5e9, #ffffff)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 350,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="green" fontWeight="bold">
          🌿 EcoPulse
        </Typography>

        <Typography sx={{ mb: 3 }} color="text.secondary">
          Login to continue your eco journey
        </Typography>

        <TextField
          fullWidth
          label="Email"
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          sx={{ mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={loginUser}
        >
          Login
        </Button>
         <Typography textAlign="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/Register">Register</Link>
          </Typography>
      </Paper>
    </Box>
  );
};

export default Login;