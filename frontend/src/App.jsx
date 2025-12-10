import { Routes, Route, Navigate } from "react-router-dom";
import { useSession } from "./hooks/SessionHook";

import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Homepage from "./pages/Homepage.jsx";
import SearchPage from "./pages/Search-Page.jsx";
import StatsPage from "./pages/Stats-Page.jsx";

export default function App() {
  const { session } = useSession();

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={!session ? <Login /> : <Navigate to="/home" replace />}
      />

      <Route
        path="/signup"
        element={!session ? <SignUp /> : <Navigate to="/home" replace />}
      />

      {/* Protected */}
      <Route
        path="/home"
        element={session ? <Homepage /> : <Navigate to="/" replace />}
      />

      <Route
        path="/search"
        element={session ? <SearchPage /> : <Navigate to="/" replace />}
      />

      <Route
        path="/stats"
        element={session ? <StatsPage /> : <Navigate to="/" replace />}
      />
      <Route path="/stats/:btag" element={<StatsPage />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
