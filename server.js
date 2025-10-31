// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ✅ Your real OpenWeather key (safe here, not public)
const OPENWEATHER_KEY = "22400ace065a9d9066a5ed6501ee38a9";

// ✅ Use environment variable for OpenAI (never store key directly)
const OPENAI_KEY = process.env.OPENAI_KEY;

// 🌦 Weather route
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// 🤖 AI route (to generate summaries or answers)
app.post("/ai", async (req, res) => {
  const { prompt } = req.body;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy server running on port ${PORT}`));
