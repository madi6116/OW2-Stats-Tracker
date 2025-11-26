import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("⚠️ Please fill out all fields.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) setMessage(error.message);
    else setMessage("Account created! Check your email to verify.");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh + 2px)",
        background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%), white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        overflowY: "auto",
        paddingBottom: 32,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 436,
          height: 760,
          position: "relative",
          color: "white",
        }}
      >
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
            justifyContent: "flex-start",
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
            <div
              style={{
                color: "white",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Overwatch Stats Tracker
            </div>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Track your competitive performance
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            width: 436,
            height: 584,
            padding: "32.8px",
            position: "absolute",
            top: 176,
            left: 0,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            outline: "0.8px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Header inside card */}
          <div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>Create Account</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
              Sign up to start tracking your stats
            </div>
          </div>

          {/* Top buttons */}
          <div
            style={{
              display: "flex",
              gap: 8,
              height: 49.6,
              marginBottom: 8,
            }}
          >
            <Link
              to="/"
              style={{
                flex: 1,
                borderRadius: 6,
                border: "0.8px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "white",
                fontSize: 16,
                textAlign: "center",
                lineHeight: "49.6px",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Login
            </Link>

            <button
              style={{
                flex: 1,
                background: "#FF5C00",
                borderRadius: 6,
                border: "0.8px solid rgba(255,255,255,0.2)",
                color: "white",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form fields */}
          <form
            onSubmit={handleSignUp}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {/* Username */}
            <div>
              <label
                style={{ display: "block", marginBottom: 8, fontSize: 16 }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "0.8px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: 16,
                  outline: "none",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{ display: "block", marginBottom: 8, fontSize: 16 }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "0.8px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: 16,
                  outline: "none",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                style={{ display: "block", marginBottom: 8, fontSize: 16 }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "0.8px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: 16,
                  outline: "none",
                }}
              />
            </div>

            {/* Submit */}
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
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </form>

          {message && (
            <p
              style={{
                textAlign: "center",
                marginTop: 12,
                color: "white",
                fontSize: 14,
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
