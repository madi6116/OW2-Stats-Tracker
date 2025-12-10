import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function SearchPage() {
  const [battleTag, setBattleTag] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSearch = async () => {
    if (!battleTag.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(`http://localhost:3001/api/search/${battleTag}`);
      const data = await res.json();
      setResults(data);
    } catch {
      alert("Search failed.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%)",
        fontFamily: "Arial",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 24,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          width: 980,
          padding: "16px 32px 8px 32px",
          borderBottom: "0.8px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Logo */}
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
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
              ></div>
            </div>
            <div style={{ fontSize: 16, color: "white" }}>
              Overwatch Stats Tracker
            </div>
          </div>

          {/* Navigation */}
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 4,
            }}
          >
            <Link
              to="/home"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              Home
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "8.8px 16.8px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 6,
                border: "0.8px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >
              <span style={{ color: "white", fontSize: 14 }}>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH INPUT */}
      <div
        style={{
          width: "100%",
          maxWidth: 916,
          marginTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "white", fontSize: 16 }}>Player Search</div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <input
              value={battleTag}
              onChange={(e) => setBattleTag(e.target.value)}
              placeholder="Enter Username or BattleTag (e.g. Player-1234)"
              style={{
                flex: 1,
                height: 50,
                padding: "12px 16px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 8,
                border: "0.8px solid rgba(255,255,255,0.2)",
                color: "white",
                fontSize: 16,
                outline: "none",
              }}
            />

            <button
              onClick={handleSearch}
              style={{
                width: 119,
                height: 50,
                background: "#FF5C00",
                borderRadius: 8,
                border: "none",
                color: "white",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              🔍 Search
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ color: "white", fontSize: 18 }}>Searching...</div>
        )}

        {/* RESULTS */}
        {!loading && results.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {results.map((p) => (
              <Link
                to={`/stats/${p.battletag}`}
                key={p.battletag}
                style={{
                  textDecoration: "none",
                  color: "white",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 8,
                  padding: 16,
                  border: "0.8px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <img
                  src={p.icon}
                  width={60}
                  height={60}
                  style={{ borderRadius: 6 }}
                />

                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: "bold" }}>
                    {p.username}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)" }}>
                    {p.battletag}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div>Tank: {p.ranks?.tank?.division || "—"}</div>
                  <div>DPS: {p.ranks?.damage?.division || "—"}</div>
                  <div>Support: {p.ranks?.support?.division || "—"}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
