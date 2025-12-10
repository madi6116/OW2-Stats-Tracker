import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useSession } from "../hooks/SessionHook";
import { Link } from "react-router-dom";

export default function Login({ onLoginSuccess, onSignUpClick }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);

  const { session } = useSession();

  useEffect(() => {
    // If user is already logged in, check if BattleTag exists
    if (session) {
      const meta = session.user.user_metadata;
      if (!meta.battleTag) {
        setShowLinkModal(true);
        return;
      }
      onLoginSuccess();
    }
  }, [session, onLoginSuccess]);

  // 🔵 Perform Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("⚠️ Please enter both email and password.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Logged in successfully!");
  };

  // 🔵 Handle Account Linking (BattleTag)
  const handleLinkAccount = async (battleTag, setError) => {
    const formatted = battleTag.replace("#", "-");

    try {
      // Verify Overwatch account exists via backend
      const res = await fetch(`http://localhost:3001/api/player/${formatted}`);
      const json = await res.json();

      if (json.error || !json.summary) {
        setError("Invalid BattleTag. Please try again.");
        return;
      }

      const summary = json.summary;

      // Store metadata inside Supabase Auth
      await supabase.auth.updateUser({
        data: {
          battleTag: formatted,
          region: summary.region,
          platform: summary.platform || "pc",
          level: summary.level,
          endorsement: summary.endorsement,
          tankRank: summary.competitive?.tank?.division || null,
          dpsRank: summary.competitive?.damage?.division || null,
          supportRank: summary.competitive?.support?.division || null,
        },
      });

      setShowLinkModal(false);
      onLoginSuccess();

    } catch {
      setError("Unexpected error verifying BattleTag.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      {/* 🔵 Link Account Modal */}
      {showLinkModal && (
        <LinkAccountModal onSubmit={handleLinkAccount} />
      )}

      {/* LOGIN CARD */}
      <div style={{ width: 436, height: 654.4, position: "relative", color: "white" }}>
        
        {/* Header */}
        <div
          style={{
            width: 436,
            height: 144,
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 167.68,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ width: 64, height: 64, position: "relative" }}>
              <div
                style={{
                  width: 42.67,
                  height: 53.34,
                  position: "absolute",
                  left: 10.67,
                  top: 5.33,
                  border: "5.33px solid #FF5C00",
                  borderRadius: "4px",
                }}
              ></div>
            </div>

            <div style={{ fontSize: 16 }}>Overwatch Stats Tracker</div>
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 16,
            }}
          >
            Track your competitive performance
          </div>
        </div>

        {/* Password Login Form */}
        <div
          style={{
            width: 436,
            height: 478.4,
            padding: "32.8px",
            position: "absolute",
            top: 176,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            outline: "0.8px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>Welcome</div>
            <div style={{ color: "rgba(255,255,255,0.6)" }}>
              Login or create an account to track your stats
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 8, height: 49.6 }}>
            <button
              style={{
                flex: 1,
                background: "#FF5C00",
                borderRadius: 6,
                border: "0.8px solid rgba(255,255,255,0.2)",
                color: "white",
                fontSize: 16,
              }}
            >
              Login
            </button>

            <button
              onClick={onSignUpClick}
              style={{
                flex: 1,
                borderRadius: 6,
                background: "transparent",
                border: "0.8px solid rgba(255,255,255,0.2)",
                color: "white",
                fontSize: 16,
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8 }}>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "0.8px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8 }}>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "0.8px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                height: 48,
                background: "#FF5C00",
                borderRadius: 6,
                border: "none",
                color: "white",
                fontSize: 16,
              }}
            >
              Login
            </button>
          </form>

          {message && (
            <p style={{ textAlign: "center", color: "white", marginTop: 12 }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   🔵 BattleTag Linking Modal (NO unused vars, NO syntax errors)
   =========================================================== */
function LinkAccountModal({ onSubmit }) {
  const [battleTag, setBattleTag] = useState("");
  const [error, setError] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 400,
          background: "#0D1117",
          borderRadius: 12,
          padding: 24,
          border: "1px solid #333",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: 12 }}>Link Your Overwatch Account</h2>

        <p style={{ marginBottom: 16, color: "rgba(255,255,255,0.7)" }}>
          Enter your BattleTag to personalize your experience.
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
          }}
        />

        {error && (
          <div style={{ marginTop: 12, color: "#FF5C00" }}>{error}</div>
        )}

        <button
          onClick={() => onSubmit(battleTag, setError)}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            background: "#FF5C00",
            borderRadius: 6,
            border: "none",
            color: "white",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Link Account
        </button>
      </div>
    </div>
  );
}
