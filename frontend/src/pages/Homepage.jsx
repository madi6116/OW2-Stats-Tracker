import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useSession } from "../hooks/SessionHook";

export default function Homepage() {
  const { session } = useSession();
  const user = session?.user;

  // Pull metadata from user
  const battleTag = user?.user_metadata?.battleTag || "Player";
  const region = user?.user_metadata?.region || "Unknown Region";
  const level = user?.user_metadata?.level || "—";
  const tankRank = user?.user_metadata?.tankRank || "Unranked";
  const dpsRank = user?.user_metadata?.dpsRank || "Unranked";
  const supportRank = user?.user_metadata?.supportRank || "Unranked";

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%)",
        display: "flex",
        overflowY: "auto",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: 980,
          minHeight: "100vh",
          margin: "0 auto",
          background: "transparent",
          color: "white",
          paddingBottom: 80,
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
                ></div>
              </div>
              <div style={{ fontSize: 16 }}>Overwatch Stats Tracker</div>
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginTop: 10,
              }}
            >
              <div style={{ color: "#FF5C00", fontWeight: "700" }}>Home</div>

              <Link
                to="/search"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "0.8px solid rgba(255,255,255,0.2)",
                  padding: "8px 16px",
                  borderRadius: 6,
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
                  padding: "8px 16px",
                  borderRadius: 6,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div
          style={{
            width: 916,
            margin: "0 auto",
            paddingTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {/* WELCOME */}
          <div>
            <div style={{ fontSize: 20, marginBottom: 6 }}>
              Welcome back, {battleTag}!
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)" }}>
              Level {level} • {region}
            </div>
          </div>

          {/* QUICK SEARCH & MY STATS */}
          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "space-between",
            }}
          >
            {/* Quick Search */}
            <div
              style={{
                flex: "0 0 446px",
                background: "rgba(255,255,255,0.05)",
                border: "0.8px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Quick Search</span>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1.6px solid #FA9C1E",
                  }}
                ></div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
                Look up any Overwatch player's stats.
              </p>

              <Link
                to="/search"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#FF5C00",
                  padding: "12px",
                  borderRadius: 6,
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Search Players
              </Link>
            </div>

            {/* MY STATS */}
            <div
              style={{
                flex: "0 0 446px",
                background: "rgba(255,255,255,0.05)",
                border: "0.8px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Your Stats</span>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1.6px solid #0098DC",
                  }}
                ></div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
                View personalized performance metrics.
              </p>

              <Link
                to={`/stats/${battleTag}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#0098DC",
                  padding: "12px",
                  borderRadius: 6,
                  textDecoration: "none",
                  color: "white",
                }}
              >
                View My Stats
              </Link>
            </div>
          </div>

          {/* QUICK ROLE RANK SUMMARY */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 250,
                background: "rgba(255,255,255,0.05)",
                padding: 24,
                borderRadius: 12,
                border: "1px solid #FA9C1E",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.7)" }}>Tank Rank</p>
              <h3>{tankRank}</h3>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 250,
                background: "rgba(255,255,255,0.05)",
                padding: 24,
                borderRadius: 12,
                border: "1px solid #0098DC",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.7)" }}>DPS Rank</p>
              <h3>{dpsRank}</h3>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 250,
                background: "rgba(255,255,255,0.05)",
                padding: 24,
                borderRadius: 12,
                border: "1px solid #768A9A",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.7)" }}>Support Rank</p>
              <h3>{supportRank}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
