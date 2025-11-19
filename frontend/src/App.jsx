import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Homepage from "./pages/homepage.jsx";
import SearchPage from "./pages/Search-Page.jsx";
import StatsPage from "./pages/Stats-Page.jsx";

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/"
        element={
          <Login
            onSignUpClick={() => navigate("/signup")}
            onLoginSuccess={() => navigate("/home")}
          />
        }
      />

      {/* SIGN UP */}
      <Route
        path="/signup"
        element={
          <SignUp
            onLoginClick={() => navigate("/")}
            onSignUpSuccess={() => navigate("/home")}
          />
        }
      />

      {/* HOME */}
      <Route
        path="/home"
        element={
          <Homepage
            onLogoutClick={() => navigate("/")}
            onSearchClick={() => navigate("/search")}
            onStatsClick={() => navigate("/stats")}
          />
        }
      />

      {/* SEARCH */}
      <Route
        path="/search"
        element={
          <SearchPage
            onHomeClick={() => navigate("/home")}
            onLogoutClick={() => navigate("/")}
          />
        }
      />

      {/* STATS */}
      <Route
        path="/stats"
        element={
          <StatsPage
            onHomeClick={() => navigate("/home")}
            onLogoutClick={() => navigate("/")}
            onSearchClick={() => navigate("/search")}
          />
        }
      />
    </Routes>
  );
}
