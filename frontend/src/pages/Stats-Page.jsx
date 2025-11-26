import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function StatsPage() {
  const [roleOpen, setRoleOpen] = useState(false);
  const [heroOpen, setHeroOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const [role, setRole] = useState("All Roles");
  const [hero, setHero] = useState("All Heroes");
  const [map, setMap] = useState("All Maps");
  const [gameType, setGameType] = useState("All Types");

  const roleRef = useRef(null);
  const heroRef = useRef(null);
  const mapRef = useRef(null);
  const typeRef = useRef(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Dropdown outside click handling
  useEffect(() => {
    const handler = (e) => {
      if (
        roleRef.current &&
        !roleRef.current.contains(e.target) &&
        heroRef.current &&
        !heroRef.current.contains(e.target) &&
        mapRef.current &&
        !mapRef.current.contains(e.target) &&
        typeRef.current &&
        !typeRef.current.contains(e.target)
      ) {
        setRoleOpen(false);
        setHeroOpen(false);
        setMapOpen(false);
        setTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const roleOptions = ["All Roles", "Tank", "DPS", "Support"];
  const heroOptions = [
    "All Heroes",
    "Ana",
    "Ashe",
    "Baptiste",
    "Bastion",
    "Brigitte",
    "Cassidy",
    "D.Va",
    "Doomfist",
    "Echo",
    "Freja",
    "Genji",
    "Hanzo",
    "Hazard",
    "Illari",
    "Junker Queen",
    "Junkrat",
    "Juno",
    "Kiriko",
    "Lifeweaver",
    "Lúcio",
    "Mauga",
    "Mei",
    "Mercy",
    "Moira",
    "Orisa",
    "Pharah",
    "Ramattra",
    "Reaper",
    "Reinhardt",
    "Roadhog",
    "Sigma",
    "Sojourn",
    "Soldier: 76",
    "Sombra",
    "Symmetra",
    "Torbjörn",
    "Tracer",
    "Venture",
    "Widowmaker",
    "Winston",
    "Wrecking Ball",
    "Wuyang",
    "Zarya",
    "Zenyatta",
  ];

  const mapOptions = [
    "All Maps",
    "Busan",
    "Illios",
    "Lijang Tower",
    "Nepal",
    "Oasis",
    "Circuit Royal",
    "Dorado",
    "Havana",
    "Junkertown",
    "Rialto",
    "Route 66",
    "Watchpoint: Gibraltor",
    "Blizzard World",
    "Eichenwalde",
    "Hollywood",
    "King's Row",
    "Midtown",
    "Numbani",
    "Paraiso",
    "Colosseo",
    "Esperanca",
    "New Queen Street",
    "Ayutthaya",
    "Black Forest",
    "Castillo",
    "Chateau Guillard",
    "Ecopoint: Antarctica",
    "Kanezaka",
    "Malevento",
    "Necropolis",
    "Petra",
    "Workshop",
    "Hanamura",
    "Horizon Lunar Colony",
    "Paris",
    "Temple of Anubis",
    "Volskaya Industries",
  ];

  const typeOptions = [
    "All Types",
    "Escort",
    "Control",
    "Hybrid",
    "Push",
    "Flashpoint",
    "Clash",
    "Capture the Flag",
    "Deathmatch",
    "Elimination",
    "Special",
  ];

  const Chevron = ({ open }) => (
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: open ? "none" : "6px solid white",
        borderBottom: open ? "6px solid white" : "none",
        transition: "transform 120ms ease",
      }}
    />
  );

  const FilterBox = ({
    label,
    value,
    setValue,
    open,
    setOpen,
    options,
    forwardedRef,
  }) => (
    <div style={{ width: 204.6 }}>
      <div style={{ height: 21 }}>
        <div
          style={{
            color: "rgba(255,255,255,0.70)",
            fontSize: 14,
            fontFamily: "Arial",
          }}
        >
          {label}
        </div>
      </div>

      <div
        ref={forwardedRef}
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "relative",
          height: 36,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 6,
          outline: "0.8px solid rgba(255,255,255,0.20)",
          paddingLeft: 12,
          paddingRight: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "Arial",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </div>

        <div
          style={{
            position: "absolute",
            right: 10,
            top: 6,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Chevron open={open} />
        </div>

        {open && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 36,
              width: "100%",
              maxHeight: 220,
              overflowY: "auto",
              background: "rgba(13,17,23,0.98)",
              borderRadius: 6,
              outline: "0.8px solid rgba(255,255,255,0.20)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              zIndex: 20,
            }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue(opt);
                  setOpen(false);
                }}
                style={{
                  padding: "10px 12px",
                  color: opt === value ? "#FF5C00" : "rgba(255,255,255,0.90)",
                  fontSize: 15,
                  fontFamily: "Arial",
                  cursor: "pointer",
                  borderBottom: "0.8px solid rgba(255,255,255,0.06)",
                  background:
                    opt === value ? "rgba(255,92,0,0.08)" : "transparent",
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

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
      }}
    >
      <div style={{ width: 980, margin: "0 auto", paddingBottom: 80 }}>
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
            background: "transparent",
            position: "sticky",
            top: 0,
            zIndex: 100,
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
                border: "0.8px solid rgba(255,255,255,0.2)",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
                textDecoration: "none",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
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
                fontSize: 14,
                cursor: "pointer",
                color: "white",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* CONTENT WRAPPER */}
        <div
          style={{
            width: 916,
            margin: "32px auto",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {/* Back / Player Info */}
          <div>
            <Link
              to="/home"
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

            <div style={{ fontSize: 16, marginTop: 8 }}>DemoUser-1234</div>
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 16,
              }}
            >
              Level 420 • Americas
            </div>
          </div>

          {/* FILTERS */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: 24,
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <FilterBox
              label="Role"
              value={role}
              setValue={setRole}
              open={roleOpen}
              setOpen={setRoleOpen}
              options={roleOptions}
              forwardedRef={roleRef}
            />
            <FilterBox
              label="Hero"
              value={hero}
              setValue={setHero}
              open={heroOpen}
              setOpen={setHeroOpen}
              options={heroOptions}
              forwardedRef={heroRef}
            />
            <FilterBox
              label="Map"
              value={map}
              setValue={setMap}
              open={mapOpen}
              setOpen={setMapOpen}
              options={mapOptions}
              forwardedRef={mapRef}
            />
            <FilterBox
              label="Game Type"
              value={gameType}
              setValue={setGameType}
              open={typeOpen}
              setOpen={setTypeOpen}
              options={typeOptions}
              forwardedRef={typeRef}
            />
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
              { label: "Tank", color: "#FA9C1E", rank: "Diamond 3" },
              { label: "DPS", color: "#0098DC", rank: "Platinum 1" },
              { label: "Support", color: "#768A9A", rank: "Diamond 2" },
            ].map((r) => (
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
                <div
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 4,
                  }}
                >
                  {r.label}
                </div>
                <div style={{ fontSize: 16 }}>{r.rank}</div>
              </div>
            ))}
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
              { label: "Games Played", value: "234" },
              { label: "Wins", value: "136", color: "#10B981" },
              { label: "Losses", value: "98", color: "#EF4444" },
              { label: "Win Rate", value: "58%", color: "#FA9C1E" },
              { label: "K/D Ratio", value: "2.4" },
            ].map((s) => (
              <div
                key={s.label}
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
                <div
                  style={{
                    fontSize: 24,
                    color: s.color || "white",
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* WEEKLY PERFORMANCE */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: 24,
            }}
          >
            <h3>📈 Weekly Performance</h3>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Placeholder for chart area
            </p>
          </div>

          {/* PERFORMANCE OVERVIEW */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: 24,
            }}
          >
            <h3>⚙️ Performance Overview</h3>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Placeholder for radar chart area
            </p>
          </div>

          {/* HERO STATS */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: 24,
            }}
          >
            <h3>🦸 Hero Stats</h3>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Placeholder for hero list (Reinhardt, Tracer, Ana…)
            </p>
          </div>

          {/* MAP PERFORMANCE */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: 24,
            }}
          >
            <h3>🗺️ Map Performance</h3>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Placeholder for bar chart area
            </p>
          </div>

          {/* COMBAT & SUPPORT STATS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 350,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                border: "0.8px solid rgba(255,255,255,0.1)",
                padding: 24,
              }}
            >
              <h3>⚔️ Combat Stats</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>
                Placeholder for eliminations, damage, deaths
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 350,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                border: "0.8px solid rgba(255,255,255,0.1)",
                padding: 24,
              }}
            >
              <h3>💉 Support Stats</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>
                Placeholder for healing, assists, win rate
              </p>
            </div>
          </div>

          {/* RECENT MATCHES */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "0.8px solid rgba(255,255,255,0.1)",
              padding: 24,
            }}
          >
            <h3>📅 Recent Matches (5)</h3>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Placeholder for table (Date, Result, Map, Type, Hero, K/D)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
