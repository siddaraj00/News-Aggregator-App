const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors()); // Allows requests from the frontend

const API_KEY = "dec7864e1ae24a8e93a59c99d5e79547"; // Replace with your actual NewsAPI key

app.get("/news", async (req, res) => {
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

  try {
    const response = await fetch(apiUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(3001, () => console.log("Proxy server running on port 3001"));
