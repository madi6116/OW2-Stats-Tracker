import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 Search by BattleTag or name
app.get("/api/search/:query", async (req, res) => {
  try {
    const query = req.params.query;

    // If exact BattleTag search: Player-1234 or Player#1234
    const isBattleTag = query.includes("#") || query.includes("-");

    if (isBattleTag) {
      const formatted = query.replace("#", "-");

      try {
        const fast = await axios.get(
          `https://overfast-api.tekrop.fr/players/${formatted}`
        );

        const s = fast.data.summary;

        return res.json([
          {
            battletag: s.battle_tag,
            username: s.username,
            icon: s.portrait,
            level: s.level,
            endorsement: s.endorsement,
            ranks: s.competitive,
          },
        ]);
      } catch (err) {
        return res.json([]);
      }
    }

    // Otherwise: do a partial username search
    const searchRes = await axios.get(
      `https://overfast-api.tekrop.fr/players/search?name=${encodeURIComponent(
        query
      )}`
    );

    const filtered = searchRes.data.filter(
      (p) => p.platform === "pc" && p.privacy === false
    );

    // Fetch basic stats for each result
    const results = [];
    for (const p of filtered.slice(0, 20)) {
      try {
        const fast = await axios.get(
          `https://overfast-api.tekrop.fr/players/${p.battle_tag}`
        );
        const s = fast.data.summary;

        results.push({
          battletag: s.battle_tag,
          username: s.username,
          icon: s.portrait,
          level: s.level,
          endorsement: s.endorsement,
          ranks: s.competitive,
        });
      } catch {}
    }

    return res.json(results);
  } catch (err) {
    console.log(err.response?.data || err);
    res.status(500).json({ error: "Search failed" });
  }
});

// 📊 FULL PLAYER STATS (used by StatsPage)
app.get("/api/player/:btag", async (req, res) => {
  try {
    const fast = await axios.get(
      `https://overfast-api.tekrop.fr/players/${req.params.btag}`
    );
    res.json(fast.data);
  } catch (err) {
    res.status(404).json({ error: "Player not found" });
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));
