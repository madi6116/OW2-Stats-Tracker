import React, { useState } from "react";
import "./modal.css"; // optional CSS file if you prefer

export default function LinkAccountModal({ onSubmit }) {
  const [battleTag, setBattleTag] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!battleTag.trim()) {
      setError("Please enter a BattleTag");
      return;
    }

    onSubmit(battleTag, setError);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      <div style={{
        width: 400,
        background: "#0D1117",
        borderRadius: 12,
        padding: 24,
        border: "1px solid #333",
        color: "white",
        fontFamily: "Arial"
      }}>
        <h2 style={{ marginBottom: 12 }}>Link Your Overwatch Account</h2>

        <p style={{ marginBottom: 16, color: "rgba(255,255,255,0.7)" }}>
          Enter your BattleTag to personalize your homepage and stats.
        </p>

        <input
          value={battleTag}
          onChange={(e) => setBattleTag(e.target.value)}
          placeholder="Player-1234"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            fontSize: 16
          }}
        />

        {error && (
          <div style={{ marginTop: 12, color: "#FF5C00" }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            background: "#FF5C00",
            border: "none",
            borderRadius: 6,
            color: "white",
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Link Account
        </button>
      </div>
    </div>
  );
}
