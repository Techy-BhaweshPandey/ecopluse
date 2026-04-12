const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

// -----------------------------
// 🔥 RATE LIMITER (ANTI SPAM)
// -----------------------------
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  message: {
    success: false,
    message: "Too many requests. Please slow down 🌱",
  },
});

router.use(limiter);
router.post("/coach", async (req, res) => {
  try {
    const {
      km,
      transport,
      electricity,
      diet,
      result,
      message,
    } = req.body;

    let prompt = "";

    // CASE 1: Carbon data
    if (km || electricity || diet || result) {
      prompt = `
You are an eco sustainability coach.

User data:
- Transport: ${transport || "unknown"}, ${km || 0} km/week
- Electricity: ${electricity || 0} units/month
- Diet: ${diet || "unknown"}
- Carbon footprint: ${result || "unknown"} kg CO2/week

Give 2-3 short actionable tips to reduce carbon footprint.
Keep it simple, motivational, and practical.
`;
    }

    // CASE 2: Chat message
    if (message) {
      prompt = `
You are an eco-friendly AI assistant.

User question:
${message}

Reply in a helpful, short, and practical eco-friendly way.
`;
    }

    if (!prompt) {
      return res.json({
        success: false,
        message: "No input provided",
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.json({
        success: false,
        message: data?.error?.message || "Gemini error",
      });
    }

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    return res.json({
      success: true,
      message: aiText,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
router.post("/waste-classifier", async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.json({
        success: false,
        message: "No image provided",
      });
    }

  const prompt = `
You are a smart waste classification and sustainability assistant.

Task:
1. Classify the waste into:
- Recyclable ♻️
- Organic 🍌
- Landfill 🗑️

2. Then explain what the object is.

3. Then give eco-friendly suggestions:
- How to reuse it
- How to recycle it properly
- How it helps reduce carbon footprint

4. Keep response short, structured, and motivating.

Format:

Category: <Recyclable/Organic/Landfill>

Explanation: ...

Eco Tips:
- ...
- ...
- ...
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageBase64,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.json({
        success: false,
        message: data?.error?.message || "Image AI error",
      });
    }

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Could not classify image";

    return res.json({
      success: true,
      message: result,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
module.exports=router;