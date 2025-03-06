const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors()); // Allows requests from the frontend

const API_KEY = "103dbc2ab9e842c3b99314cd7708a646"; // Replace with your actual NewsAPI key

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
