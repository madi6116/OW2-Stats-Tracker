import React, { useState } from "react";

export default function SearchPage({ onHomeClick, onLogoutClick }) {
  const [battleTag, setBattleTag] = useState("");

  const handleSearch = () => {
    if (!battleTag.trim()) {
      alert("⚠️ Please enter a BattleTag (e.g., Player-1234 or Player#1234)");
      return;
    }
    alert(`🔍 Searching for: ${battleTag}`);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%)",
        fontFamily: "Arial",
        display: "flex",
        flexDirection: "column",    // stack children vertically
        justifyContent: "flex-start",
        alignItems: "center",       // center children horizontally
        paddingTop: 24,
        boxSizing: "border-box",
      }}
    >
       {/* Header */}
        <div
          style={{
            width: 980,
            padding: "16px 32px 8px 32px",
            borderBottom: "0.8px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
            </div>


          {/* Logo + Title */}
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

          {/* Home + Logout */}
          <div
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 4,
            }}
          >
            <div
              onClick={onHomeClick}
              style={{
                width: 74.9,
                height: 40,
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  left: 16,
                  top: 6.2,
                  position: "relative",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 16,
                }}
              >
                Home
              </div>
            </div>

            <div
              onClick={onLogoutClick}
              style={{
                width: 77.5,
                height: 38.6,
                padding: "8.8px 16.8px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 6,
                border: "0.8px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ color: "white", fontSize: 14 }}>Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div
        style={{
          width: "100%",
          maxWidth: 916,
          height: 557.8,
          marginTop: 24,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Input Field + Search */}
        <div
          style={{
            height: 97.6,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ color: "white", fontSize: 16 }}>Player Search</div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <input
              value={battleTag}
              onChange={(e) => setBattleTag(e.target.value)}
              placeholder="Enter BattleTag (e.g., Player-1234 or Player#1234)"
              style={{
                flex: 1,
                height: 49.6,
                padding: "12px 16px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 8,
                border: "0.8px solid rgba(255,255,255,0.2)",
                color: "white",
                fontSize: 16,
                outline: "none",
              }}
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              style={{
                width: 119,
                height: 49.6,
                padding: "0 24px",
                background: "#FF5C00",
                borderRadius: 8,
                border: "none",
                color: "white",
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              🔍 Search
            </button>
          </div>
        </div>

        {/* Empty Placeholder */}
        <div
          style={{
            width: "100%",
            maxWidth: 916,
            height: 328,
            padding: "64px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div style={{ width: 120, height: 120, position: "relative" }}>
            <div
              style={{
                width: 113.68,
                height: 113.68,
                position: "absolute",
                left: 3.16,
                top: 3.16,
                border: "6.32px solid #5C6A75",
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <div style={{ width: "100%", maxWidth: 382.73, textAlign: "center" }}>
            <div
              style={{
                color: "white",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Search for a player
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 16,
              }}
            >
              Enter a BattleTag to view player stats and performance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
