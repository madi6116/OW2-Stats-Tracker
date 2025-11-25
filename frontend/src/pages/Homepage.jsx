export default function Homepage({
  onLogoutClick,
  onSearchClick,
  onStatsClick,
  username,
}) {
  const handleSearchClick = () => {
    onSearchClick(); // goes to Search page
  };

  const handleSearchPlayers = () => {
    onSearchClick();
  };

  const handleViewStats = () => {
    onStatsClick(); // goes to Stats page
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%), white",
        display: "flex",
        overflowY: "auto",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: 980,
          minHeight: 1096,
          margin: "0 auto",
          background: "linear-gradient(180deg, #1A2332 0%, #0D1117 100%)",
          color: "white",
          position: "relative",
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

            {/* Navigation bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginTop: 10,
              }}
            >
              <div style={{ color: "#FF5C00", fontWeight: "700" }}>Home</div>

              {/* Search Button */}
              <div
                onClick={handleSearchClick}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "0.8px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                Search
              </div>

              <div
                onClick={onLogoutClick}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "0.8px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                Logout
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            width: 916,
            margin: "0 auto",
            paddingTop: 32,
            paddingBottom: 50,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {/* Welcome */}
          <div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>
              {`Welcome back, ${username}!`}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
              Track and analyze your Overwatch performance
            </div>
          </div>

          {/* Quick Search & Stats */}
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap", // keep items on one row
              gap: 24,
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            {/* Quick Search */}
            <div
              style={{
                flex: "0 0 446px", // fixed ideal width but allow layout control
                maxWidth: "48%",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                border: "0.8px solid rgba(255,255,255,0.1)",
                padding: "24.8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 16 }}>Quick Search</div>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: "1.67px solid #FA9C1E",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 16,
                  marginBottom: 16,
                }}
              >
                Search for any player’s stats and performance
              </div>
              <div
                onClick={handleSearchPlayers}
                style={{
                  width: "100%",
                  height: 48,
                  background: "#FF5C00",
                  borderRadius: 6,
                  textAlign: "center",
                  lineHeight: "48px",
                  cursor: "pointer",
                }}
              >
                Search Players
              </div>
            </div>

            {/* Your Stats */}
            <div
              style={{
                flex: "0 0 446px",
                maxWidth: "48%",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                border: "0.8px solid rgba(255,255,255,0.1)",
                padding: "24.8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 16 }}>Your Stats</div>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: "1.67px solid #0098DC",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 16,
                  marginBottom: 16,
                }}
              >
                View your detailed performance metrics
              </div>
              <div
                onClick={handleViewStats}
                style={{
                  width: "100%",
                  height: 48,
                  background: "#0098DC",
                  borderRadius: 6,
                  textAlign: "center",
                  lineHeight: "48px",
                  cursor: "pointer",
                }}
              >
                View Stats
              </div>
            </div>
          </div>
          {/* The Shop */}
          <div
            style={{
              width: 916,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: "24.8px",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 16 }}>The Shop</div>
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 16,
                marginBottom: 16,
              }}
            >
              The Shop updates in: <b>1d 12h 43m 22s</b>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                style={{
                  flex: 1,
                  minWidth: 200,
                  height: 48,
                  background: "#9355FF",
                  borderRadius: 6,
                  border: "none",
                  color: "white",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Currently in the Shop
              </button>
              <button
                style={{
                  flex: 1,
                  minWidth: 200,
                  height: 48,
                  background: "#FA9C1E",
                  borderRadius: 6,
                  border: "none",
                  color: "white",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Coming to the Shop Soon
              </button>
            </div>
          </div>

          {/* Recent Searches */}
          <div
            style={{
              width: 916,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: "24.8px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 16 }}>Recent Searches</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
              Your recently viewed players
            </div>

            {/* Example search cards */}
            {["Player-1234", "ProGamer-5678", "OverwatchFan-9012"].map(
              (name, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 8,
                    border: "0.8px solid rgba(255,255,255,0.1)",
                    padding: "16.8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span>{name}</span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                      }}
                    >
                      {i === 0
                        ? "2 hours ago"
                        : i === 1
                          ? "1 day ago"
                          : "3 days ago"}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 14,
                    }}
                  >
                    {i === 0
                      ? "Diamond 3"
                      : i === 1
                        ? "Master 2"
                        : "Platinum 1"}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Quick Stats */}
          <div
            style={{
              width: 916,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: "24.8px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 16 }}>Quick Stats</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
              Overview of your performance
            </div>
            <div
              style={{
                background: "rgba(250,156,30,0.1)",
                border: "0.8px solid rgba(250,156,30,0.2)",
                borderRadius: 8,
                padding: "16.8px",
              }}
            >
              <div>
                Tank Rank: <b>Diamond 3 ↑2</b>
              </div>
            </div>
            <div
              style={{
                background: "rgba(0,152,220,0.1)",
                border: "0.8px solid rgba(0,152,220,0.2)",
                borderRadius: 8,
                padding: "16.8px",
              }}
            >
              <div>
                DPS Rank: <b>Platinum 1 ↑1</b>
              </div>
            </div>
            <div
              style={{
                background: "rgba(118,138,154,0.1)",
                border: "0.8px solid rgba(118,138,154,0.2)",
                borderRadius: 8,
                padding: "16.8px",
              }}
            >
              <div>
                Support Rank: <b>Diamond 2 ↓1</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
