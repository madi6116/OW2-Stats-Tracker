import dotenv from "dotenv";
dotenv.config(); // load .env first

import express from "express";
import cors from "cors";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ SUPABASE SETUP ------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ------------------ TEST ROUTE ------------------
app.get("/api/test", (req, res) =>
  res.json({ ok: true, url: process.env.SUPABASE_URL })
);

// ------------------ SAVE SEARCH TO SUPABASE ------------------
app.post("/api/save-search", async (req, res) => {
  const { battletag } = req.body;
  try {
    const { error } = await supabase
      .from("search_history")
      .insert({ battletag });
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error("Supabase insert error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// ------------------ GET SEARCH HISTORY ------------------
app.get("/api/history", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("search_history")
      .select("*")
      .order("searched_at", { ascending: false })
      .limit(10);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Supabase fetch error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// ------------------ OVERFAST API: FETCH PLAYER STATS ------------------
app.get("/api/player/:btag", async (req, res) => {
  try {
    const btag = encodeURIComponent(req.params.btag);
    const url = `https://overfast-api.tekrop.fr/players/${btag}/summary`;

    const { data } = await axios.get(url);

    // Optional: save search automatically when player data is fetched
    await supabase.from("search_history").insert({ battletag: req.params.btag });

    res.json(data);
  } catch (err) {
    console.error("OverFast API error:", err.message);
    res
      .status(404)
      .json({ error: "Player not found or OverFast API unavailable" });
  }
});

// ------------------ DEFAULT ROUTE ------------------
app.get("/", (req, res) => {
  res.send("OW2 Insight Tracker backend is running 🚀");
});

// ------------------ SERVER LISTEN ------------------
const PORT = process.env.PORT || 5174;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
