import { useState, useEffect} from "react";
import { supabase } from "../supabaseClient"; 
export default function Login({ onSignUpClick, onLoginSuccess }) {
  // removed unused `username` state
  /* eslint-disable no-unused-vars */
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  useEffect(() => { 
    const checkUserLoggedIn = async () => { 
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if(user) { 
        onLoginSuccess();
      }
    }
    checkUserLoggedIn();
  },[onLoginSuccess])

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("⚠️ Please enter both email and password.");
      return;
    }


  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      setMessage(`${error.message}`);
    } else {
      setMessage("Logged in successfully!");
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%), white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div style={{ width: 436, height: 654.4, position: "relative", color: "white" }}>
        {/* Header Section */}
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
            <div style={{ color: "white", fontSize: 16, textAlign: "center" }}>
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
            height: 478.4,
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
          <div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>Welcome</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
              Login or create an account to track your stats
            </div>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 8,
              height: 49.6,
              marginBottom: 8,
            }}
          >
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
              Login
            </button>
            <button
              onClick={onSignUpClick}
              style={{
                flex: 1,
                borderRadius: 6,
                border: "0.8px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "white",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {/* Email */}
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 16 }}>
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
              <label style={{ display: "block", marginBottom: 8, fontSize: 16 }}>
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
              Login
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
