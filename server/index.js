import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint your frontend will call
app.get("/api/player/:btag", async (req, res) => {
  try {
    const battleTag = req.params.btag.replace("#", "-"); // convert for API

    // OverFast API (best choice)
    const url = `https://overfast-api.tekrop.fr/players/${battleTag}`;

    const response = await axios.get(url);

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: "Player not found or API error" });
  }
});

app.listen(3001, () => {
  console.log("Backend listening on http://localhost:3001");
});
