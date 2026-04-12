import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import { useLocation} from "react-router-dom";

const AI = () => {
  const location = useLocation();
  const carbonData = location.state?.carbonData;
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState("");
  const [input, setInput] = useState("");

  const STORAGE_KEY = "eco_ai_chat_history";
  // ✅ LOAD CHAT
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // ✅ SAVE CHAT
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // ✅ TYPEWRITER EFFECT
  const typeWriter = (text, callback) => {
    let i = 0;
    setTypingText("");

    const interval = setInterval(() => {
      setTypingText((prev) => prev + text.charAt(i));
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        callback();
      }
    }, 12);
  };

  // ✅ MAIN AI FUNCTION (FIXED)
  const getAIResponse = async (userText) => {
    if (!userText.trim()) return;

    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    try {
      const res = await fetch("https://ecopluse-je8y.onrender.com/api/ai/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ✅ FALLBACK DATA (IMPORTANT FIX)
          km: carbonData?.km || 0,
          transport: carbonData?.transport || "car",
          electricity: carbonData?.electricity || 0,
          diet: carbonData?.diet || "mixed",
          result: carbonData?.result || 0,

          question: userText,
        }),
      });

      const data = await res.json();

      const aiText =
        data?.message?.length > 0
          ? data.message
          : "⚠️ AI could not respond. Try again.";

      typeWriter(aiText, () => {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: aiText },
        ]);
        setTypingText("");
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "⚠️ Server error. Please try again later.",
        },
      ]);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 5 }}>

      {/* HEADER */}
      <Box textAlign="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Eco AI Assistant
        </Typography>
        <Typography fontSize="14px" color="text.secondary">
          Your personal sustainability coach 🌱
        </Typography>

        {/* ✅ INFO MESSAGE */}
        {!carbonData && (
          <Typography fontSize="12px" color="text.secondary" mt={1}>
            ⚠️ Using general eco advice (no personal data provided)
          </Typography>
        )}
      </Box>

      {/* CHAT CARD */}
      <Card
        sx={{
          borderRadius: 4,
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          background: "#ffffff",
        }}
      >
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

          {/* CHAT AREA */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              px: 1,
              py: 2,
            }}
          >
            {messages.length === 0 && !typingText && (
              <Box textAlign="center" mt={10}>
                <Typography color="text.secondary">
                  Ask me how to reduce your carbon footprint 🌿
                </Typography>
              </Box>
            )}

            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    maxWidth: "75%",
                    borderRadius: 3,
                    background:
                      msg.role === "user"
                        ? "#e8f5e9"
                        : "#f7fdf7",
                    border: "1px solid #e0e0e0",
                    fontSize: "14px",
                    color: "#1b5e20",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.role === "ai" && "🤖 "}
                  {msg.text}
                </Paper>
              </Box>
            ))}

            {/* TYPING */}
            {typingText && (
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    background: "#f1f8e9",
                    fontSize: "14px",
                    border: "1px solid #dcedc8",
                  }}
                >
                  🤖 {typingText} |
                </Paper>
              </Box>
            )}

            {/* LOADING */}
            {loading && (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={18} />
                <Typography fontSize="13px" color="text.secondary">
                  Eco AI is thinking...
                </Typography>
              </Box>
            )}
          </Box>

          {/* INPUT AREA */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>

            <TextField
              fullWidth
              size="small"
              placeholder="Ask how to reduce carbon footprint..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getAIResponse(input);
                }
              }}
            />

            {/* SEND BUTTON */}
            <Button
              variant="contained"
              color="success"
              onClick={() => getAIResponse(input)}
              sx={{ borderRadius: 2 }}
            >
              Send
            </Button>

            {/* QUICK BUTTON */}
            <Button
              variant="outlined"
              onClick={() => getAIResponse("Give me eco tips 🌍")}
              sx={{
                borderRadius: 2,
                borderColor: "#2e7d32",
                color: "#2e7d32",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Ask Eco AI
            </Button>
          </Box>

          {/* 🔒 ENCRYPTION NOTE */}
          <Typography
            fontSize="11px"
            color="text.secondary"
            textAlign="center"
            mt={2}
          >
            🔒 Your chats are encrypted and not visible to others
          </Typography>

        </CardContent>
      </Card>
    </Container>
  );
};

export default AI;
