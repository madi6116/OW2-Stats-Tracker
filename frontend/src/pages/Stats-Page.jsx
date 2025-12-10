import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function StatsPage() {
  const { btag } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);

      try {
        const res = await fetch(`http://localhost:3001/api/player/${btag}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Stats fetch failed:", err);
      }

      setLoading(false);
    };

    loadStats();
  }, [btag]);

  if (loading || !data) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: 24,
          fontFamily: "Arial",
        }}
      >
        Loading stats...
      </div>
    );
  }

  const summary = data.summary;
  const competitive = summary.competitive || {};

  const heroStats = data.heroes?.stats || {};
  const mapStats = data.maps?.stats || {};
  const recentMatches = data.games?.recent_matches || [];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflowY: "auto",
        fontFamily: "Arial",
        color: "white",
        paddingTop: 24,
        paddingBottom: 80,
      }}
    >
      <div style={{ width: 980, margin: "0 auto" }}>
        {/* HEADER */}
        <div
          style={{
            width: 980,
            paddingTop: 16,
            paddingLeft: 32,
            paddingRight: 32,
            borderBottom: "0.8px solid rgba(255,255,255,0.10)",
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%)",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, position: "relative" }}>
              <div
                style={{
                  width: 26.67,
                  height: 33.34,
                  left: 6.67,
                  top: 3.33,
                  position: "absolute",
                  border: "3.33px solid #FF5C00",
                  borderRadius: 4,
                }}
              />
            </div>
            <div style={{ fontSize: 16 }}>Overwatch Stats Tracker</div>
          </div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 8,
            }}
          >
            <Link
              to="/home"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Home
            </Link>

            <Link
              to="/search"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 6,
                border: "0.8px solid rgba(255,255,255,0.2)",
                padding: "8px 16px",
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
              }}
            >
              Search
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "0.8px solid rgba(255,255,255,0.2)",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div
          style={{
            width: 916,
            margin: "32px auto",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {/* Back & Player Info */}
          <div>
            <Link
              to="/search"
              style={{
                width: 80,
                height: 40,
                background: "rgba(255,255,255,0.05)",
                border: "0.8px solid rgba(255,255,255,0.2)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
              }}
            >
              ← Back
            </Link>

            <div style={{ fontSize: 20, marginTop: 8 }}>
              {summary.username}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
              Level {summary.level} • {summary.region}
            </div>
          </div>

          {/* RANK SUMMARY */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            {[
              { label: "Tank", key: "tank", color: "#FA9C1E" },
              { label: "DPS", key: "damage", color: "#0098DC" },
              { label: "Support", key: "support", color: "#768A9A" },
            ].map((r) => {
              const role = competitive[r.key];
              return (
                <div
                  key={r.label}
                  style={{
                    flex: 1,
                    minWidth: 250,
                    background: "rgba(255,255,255,0.05)",
                    border: `0.8px solid ${r.color}`,
                    borderRadius: 12,
                    padding: 24,
                  }}
                >
                  <div style={{ color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                    {r.label}
                  </div>
                  <div style={{ fontSize: 16 }}>
                    {role?.division || "Unranked"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* QUICK STATS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "space-between",
            }}
          >
            {[
              { label: "Games Played", value: summary.games_played },
              { label: "Wins", value: summary.wins },
              { label: "Losses", value: summary.losses },
              { label: "Win Rate", value: summary.winrate + "%" },
              { label: "K/D Ratio", value: summary.kd || "N/A" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  minWidth: 160,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 12,
                  border: "0.8px solid rgba(255,255,255,0.1)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 24 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* HERO STATS */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: 24,
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3>🦸 Top Heroes</h3>

            {Object.entries(heroStats)
              .slice(0, 5)
              .map(([hero, stats]) => (
                <div key={hero} style={{ marginBottom: 12 }}>
                  <strong>{hero}</strong> — {stats.winrate}% WR,{" "}
                  {stats.games_played} games
                </div>
              ))}
          </div>

          {/* MAP STATS */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: 24,
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3>🗺️ Map Performance</h3>

            {Object.entries(mapStats)
              .slice(0, 5)
              .map(([map, stats]) => (
                <div key={map} style={{ marginBottom: 12 }}>
                  <strong>{map}</strong> — {stats.winrate}% WR (
                  {stats.games} games)
                </div>
              ))}
          </div>

          {/* RECENT MATCHES */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: 24,
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3>📅 Recent Matches</h3>

            {recentMatches.length === 0 && (
              <div>No recent matches available.</div>
            )}

            {recentMatches.map((m, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                {m.result} — {m.map} — {m.competition} — {m.hero} — K/D:{" "}
                {m.kd}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
