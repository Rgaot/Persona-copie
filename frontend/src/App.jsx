import "./App.css"

import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";

import Home from "./pages/home/Home";
import MessagesPage from "./pages/message/MessagePage";
import SondagesPage from "./pages/sondages/SondagesPage";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/pofile/ProfilePage.jsx";

import { useAuthStore } from "./store/authStore.js";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div id="app-loading-container">
        <h2 id="app-loading-text">Chargement...</h2>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/sondages"
        element={authUser ? <SondagesPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/messages"
        element={authUser ? <MessagesPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/sign-up"
        element={authUser ? <Navigate to="/" /> : <SignupPage />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/profile"
        element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
